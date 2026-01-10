import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Building2, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { purchaseLicense } from "../api/license";
import { createOrder, verifyPayment } from "../api/payment";
import { checkCustomerExists, syncCustomer } from "../api/customerSync";
import { loadRazorpay } from "../utils/loadRazorpay"

type BillingCycle = "monthly" | "quarterly" | "yearly";

interface CheckoutPageProps {
  selectedPlan: string;
  initialBillingCycle: "monthly" | "quarterly" | "yearly";
  onBack: () => void;
  onProceedToPayment: (
    billingCycle: "monthly" | "quarterly" | "yearly",
    formData: any
  ) => void;
}

export function CheckoutPage({
  selectedPlan,
  initialBillingCycle,
  onBack,
  onProceedToPayment,
}: CheckoutPageProps) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [lmsPlan, setLmsPlan] = useState<{
    licenseId: string;
    monthlyPrice: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  /* ---------------- PRICE LOGIC ---------------- */

  const getPrice = () => {
    if (!lmsPlan) return 0;

    const base = lmsPlan.monthlyPrice;

    if (billingCycle === "monthly") return base;
    if (billingCycle === "quarterly") return base * 3 * 0.9;
    return base * 12 * 0.8;
  };

  const getTax = () => getPrice() * 0.18;
  const getTotal = () => getPrice() + getTax();

  /* ---------------- HANDLERS ---------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lmsPlan) {
      alert("Plan not loaded");
      return;
    }

    setSubmitting(true);

    try {
      // Backend allows only monthly / yearly
      const backendBillingCycle =
        billingCycle === "quarterly" ? "monthly" : billingCycle;

      console.log("🔵 Step 1: Checking customer existence...");
      // 1️⃣ Ensure customer exists in LMS
      const exists = await checkCustomerExists(formData.email);
      if (!exists) {
        console.log("🔵 Step 1a: Creating customer...");
        await syncCustomer({
          name: formData.companyName,
          email: formData.email,
          source: "Tally",
        });
      }

      /* ======================================================
        🔴 FREE PLAN FLOW (NO RAZORPAY)
      ====================================================== */
      if (lmsPlan.monthlyPrice === 0) {
        console.log("🟢 Free plan detected, activating...");
        await purchaseLicense({
          name: formData.companyName,
          email: formData.email,
          licenseId: lmsPlan.licenseId, 
          billingCycle: "monthly",
          amount: 0,
          currency: "INR",
        });

        alert("Free plan activated successfully 🎉");
        window.location.replace("https://geo-track-em3s.onrender.com");
        return;
      }

      /* ======================================================
        🟢 PAID PLAN FLOW
      ====================================================== */

      console.log("🔵 Step 2: Creating pending transaction in LMS...");
      // 2️⃣ Create PENDING transaction in LMS FIRST
      const purchaseRes = await purchaseLicense({
        name: formData.companyName,
        email: formData.email,
        licenseId: lmsPlan.licenseId,
        billingCycle: backendBillingCycle,
        amount: getTotal(),
        currency: "INR",
      });

      console.log("📦 Purchase License Full Response:", purchaseRes);
      console.log("📦 Response Keys:", Object.keys(purchaseRes || {}));

      // Handle different response structures
      const responseData = purchaseRes?.data || purchaseRes;
      console.log("📦 Response Data:", responseData);
      console.log("📦 Response Data Keys:", Object.keys(responseData || {}));
      
      // Try multiple possible paths for transactionId and userId
      const transactionId = 
        responseData?.transactionId || 
        responseData?.transaction?._id || 
        responseData?.transaction?.id ||
        responseData?._id;
        
      const userId = 
        responseData?.userId || 
        responseData?.user?._id || 
        responseData?.user?.id ||
        responseData?.customerId ||
        responseData?.customer?._id;

      console.log("🔍 Extracted transactionId:", transactionId);
      console.log("🔍 Extracted userId:", userId);

      if (!transactionId || !userId) {
        console.error("❌ Full response structure:", JSON.stringify(purchaseRes, null, 2));
        throw new Error(
          `Transaction data missing from LMS.\n` +
          `transactionId: ${transactionId}\n` +
          `userId: ${userId}\n` +
          `Full response keys: ${Object.keys(responseData || {}).join(', ')}`
        );
      }

      console.log("🔵 Step 3: Creating Razorpay order...");
      // 3️⃣ Create Razorpay order using LMS userId
      const order = await createOrder({
        userId,
        licenseId: lmsPlan.licenseId,
        billingCycle,
        amount: getTotal() * 100,
      });

      console.log("📦 Razorpay Order:", order);

      if (!order?.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      console.log("🔵 Step 4: Loading Razorpay SDK...");
      // 4️⃣ Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }

      console.log("🔵 Step 5: Opening Razorpay popup...");
      // 5️⃣ Open Razorpay popup
      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Tally",
        prefill: {
          name: formData.companyName,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response: any) => {
          console.log("✅ Payment successful, verifying...");
          await verifyPayment({
            transactionId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          window.location.href = `/payment-success?txn=${transactionId}&plan=${encodeURIComponent(
            selectedPlan
          )}&cycle=${billingCycle}`;
        },
        theme: { color: "#2563eb" },
      });

      rzp.open();
    } catch (err: any) {
      console.error("❌ Payment error:", err);
      console.error("❌ Error stack:", err.stack);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getBillingText = () => {
    switch (billingCycle) {
      case "monthly":
        return "Monthly";
      case "quarterly":
        return "Quarterly";
      case "yearly":
        return "Yearly";
    }
  };

  const getSavingsPercent = () => {
    switch (billingCycle) {
      case "monthly":
        return 0;
      case "quarterly":
        return 10;
      case "yearly":
        return 20;
    }
  };

  /* ---------------- LMS LOAD ---------------- */

  useEffect(() => {
    const loadPlanFromLMS = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/licenses-by-product/695902cfc240b17f16c3d716",
          {
            headers: {
              "x-api-key": "my-secret-key-123",
            },
          }
        );

        const data = await res.json();
        console.log("CHECKOUT RAW LMS RESPONSE:", data);

        const licenses = data.licenses || data.data || data || [];

        const matched = licenses.find((lic: any) => {
          const lt = lic.licenseTypeId || lic.licenseType;
          return lt?._id === selectedPlan;
        });

        if (!matched) {
          throw new Error("Selected plan not found in LMS");
        }

        const lt = matched.licenseTypeId || matched.licenseType;

        setLmsPlan({
          licenseId: matched._id,
          monthlyPrice: lt.price?.amount ?? 0,
        });

      } catch (err) {
        console.error("Failed to load checkout plan", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlanFromLMS();
  }, [selectedPlan]);

  if (loading || !lmsPlan) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>

        <div className="text-center mb-8">
          <h1 className="mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            Just one step away from transforming your field sales
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Enter your company and billing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="company@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="Street address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                      <Input
                        id="gstNumber"
                        placeholder="22AAAAA0000A1Z5"
                        value={formData.gstNumber}
                        onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                      />
                    </div>
                  </div>
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="gap-2"
                    disabled={submitting}
                  >
                    <CreditCard className="h-4 w-4" />
                    {submitting ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Selected Plan</p>
                  <div className="flex items-center justify-between">
                    <span>{selectedPlan}</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {getBillingText()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Billing Cycle</p>
                  <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as BillingCycle)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                      <TabsTrigger value="quarterly" className="text-xs">
                        Quarterly
                        <span className="ml-1 text-[10px] text-green-600 dark:text-green-400">-10%</span>
                      </TabsTrigger>
                      <TabsTrigger value="yearly" className="text-xs">
                        Yearly
                        <span className="ml-1 text-[10px] text-green-600 dark:text-green-400">-20%</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan Price</span>
                    <span>₹{getPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{getTax().toLocaleString()}</span>
                  </div>
                  {getSavingsPercent() > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Discount ({getSavingsPercent()}%)</span>
                      <span>You Save!</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between items-baseline">
                  <span>Total Amount</span>
                  <span className="text-2xl">₹{getTotal().toLocaleString()}</span>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-2">
                  <p className="text-sm">14-Day Free Trial</p>
                  <p className="text-xs text-muted-foreground">
                    You won't be charged until your trial ends. Cancel anytime during the trial period.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>✓ Secure payment processing</p>
                  <p>✓ Money-back guarantee</p>
                  <p>✓ Cancel anytime</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
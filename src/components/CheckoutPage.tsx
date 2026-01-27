import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ArrowLeft, Building2, Mail, Phone, MapPin, CreditCard, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { purchaseLicense } from "../api/license";
import { createOrder, verifyPayment } from "../api/payment";
import { checkCustomerExists, syncCustomer } from "../api/customerSync";
import { loadRazorpay } from "../utils/loadRazorpay"
import { getStoredUser } from "../api/auth";

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface CheckoutPageProps {
  selectedPlan: string;
  initialBillingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly";
  onBack: () => void;
  onProceedToPayment: (
    billingCycle: "monthly" | "quarterly" | "half-yearly" | "yearly",
    formData: any
  ) => void;
}

export function CheckoutPage({
  selectedPlan,
  initialBillingCycle,
  onBack,
  onProceedToPayment,
}: CheckoutPageProps) {
  const navigate = useNavigate();

  const loggedInUser = getStoredUser();
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

  const [lmsPlan, setLmsPlan] = useState<{
    licenseId: string;
    planName: string;   
    pricePerUser: number; // Price per user per month
    includedUsers: number; // Number of users included in the plan
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // Calculate base monthly cost (price per user × number of users)
  const getMonthlyBaseCost = () => {
    if (!lmsPlan) return 0;
    return lmsPlan.pricePerUser * lmsPlan.includedUsers;
  };

  // Calculate subtotal based on billing cycle BEFORE discount
  const getSubtotal = () => {
    const monthlyBase = getMonthlyBaseCost();
    
    if (billingCycle === "monthly") return monthlyBase;
    if (billingCycle === "quarterly") return monthlyBase * 3;
    if (billingCycle === "half-yearly") return monthlyBase * 6;
    return monthlyBase * 12;
  };

  // Calculate discount amount
  const getDiscount = () => {
    const subtotal = getSubtotal();
    
    if (billingCycle === "quarterly") return subtotal * 0.05; // 5% discount
    if (billingCycle === "half-yearly") return subtotal * 0.10; // 10% discount
    if (billingCycle === "yearly") return subtotal * 0.20; // 20% discount
    return 0;
  };

  // Calculate price after discount
  const getPriceAfterDiscount = () => {
    return getSubtotal() - getDiscount();
  };

  // Calculate GST on discounted price
  const getTax = () => {
    return Math.round(getPriceAfterDiscount() * 0.18);
  };

  // Calculate final total
  const getTotal = () => {
    return Math.round(getPriceAfterDiscount() + getTax());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lmsPlan) {
      alert("Plan not loaded");
      return;
    }

    try {
      // Map UI billing cycles to backend billing cycles
      const backendBillingCycle = 
        billingCycle === "quarterly" || billingCycle === "half-yearly" 
          ? "monthly" 
          : billingCycle;

      const exists = await checkCustomerExists(loggedInUser.email);
      if (!exists) {
        await syncCustomer({
          name: formData.companyName,
          email: loggedInUser.email,
          source: "TallyConnect",
        });
      }

      // Handle free plan
      if (lmsPlan.pricePerUser === 0) {
        await purchaseLicense({
          name: formData.companyName,
          email: loggedInUser.email,
          licenseId: lmsPlan.licenseId, 
          billingCycle: "monthly",
          amount: 0,
          currency: "INR",
        });

        alert("Free plan activated successfully 🎉");
        window.location.href = "/payment-success?free=true";
        return;
      }

      const purchaseRes = await purchaseLicense({
        name: formData.companyName,
        email: loggedInUser.email,
        licenseId: lmsPlan.licenseId,
        billingCycle: backendBillingCycle,
        amount: getTotal(),
        currency: "INR",
      });

      const { data } = purchaseRes;

      if (!data?.transactionId || !data?.userId) {
        throw new Error("Transaction data missing from LMS");
      }

      const { transactionId, userId } = data;

      const order = await createOrder({
        userId,
        licenseId: lmsPlan.licenseId,
        billingCycle,
        amount: getTotal() * 100, // Convert to paise
      });

      if (!order?.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }

      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "TallyConnect",
        prefill: {
          name: formData.companyName,
          email: loggedInUser.email,
          contact: formData.phone,
        },
        handler: async (response: any) => {
          try {
            await verifyPayment({
              transactionId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            navigate(`/payment-success?txn=${transactionId}&plan=${encodeURIComponent(
              selectedPlan
            )}&cycle=${billingCycle}`);
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            alert("Payment verification failed. Please contact support with transaction ID: " + transactionId);
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment cancelled by user");
          }
        },
        theme: { color: "#2563eb" },
      });

      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      const message = err?.response?.data?.message || "Something went wrong. Please try again.";
      alert(message);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getBillingText = () => {
    switch (billingCycle) {
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "half-yearly": return "Half-Yearly";
      case "yearly": return "Yearly";
    }
  };

  const getSavingsPercent = () => {
    switch (billingCycle) {
      case "monthly": return 0;
      case "quarterly": return 5;
      case "half-yearly": return 10;
      case "yearly": return 20;
    }
  };

  const getBillingPeriod = () => {
    switch (billingCycle) {
      case "monthly": return "1 month";
      case "quarterly": return "3 months";
      case "half-yearly": return "6 months";
      case "yearly": return "12 months";
    }
  };

  useEffect(() => {
    if (!loggedInUser?.email) return;

    setFormData(prev => ({
      ...prev,
      email: loggedInUser.email,
    }));
  }, [loggedInUser?.email]);

  useEffect(() => {
    const loadPlanFromLMS = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/license/public/licenses-by-product/695902cfc240b17f16c3d716",
          {
            headers: {
              "x-api-key": "my-secret-key-123",
            },
          }
        );

        const data = await res.json();

        const matched = data.licenses.find(
          (lic: any) => lic?.licenseType?._id === selectedPlan
        );

        if (!matched) {
          throw new Error("Selected plan not found in LMS");
        }

        console.log("📦 Matched License:", matched);
        console.log("🎯 License Type:", matched.licenseType);
        // console.log("✨ Raw Features:", matched.licenseType.features);
        
        // Extract user count from features
        let userCount = 1; // Default fallback
        const rawFeatures = matched.licenseType.features || [];
        
        // Method 1: Check if features is an array (v1 format with feature registry)
        if (Array.isArray(rawFeatures)) {
          // Collect all potential user count features
          const userFeatures = [];
          
          for (const feature of rawFeatures) {
            if (typeof feature === "object") {
              // Feature registry format - check all possible field names
              const label = (feature.uiLabel || feature.displayName || "").toLowerCase();
              const key = (feature.featureKey || "").toLowerCase();
              const slug = (feature.featureSlug || "").toLowerCase();
              const value = feature.limitValue ?? feature.value;
              
              // console.log("🔍 Checking feature:", { 
              //   label, 
              //   key, 
              //   slug, 
              //   type: feature.featureType, 
              //   value: value,
              //   displayName: feature.displayName 
              // });
              
              // Look for user-specific features with specific keywords
              if (feature.featureType === "limit" && typeof value === "number") {
                // Priority keywords for user count
                const isUserFeature = 
                  slug === "user-limit" || 
                  key === "user-limit" ||
                  slug.includes("user") || 
                  key.includes("user") || 
                  key.includes("seat") ||
                  slug.includes("seat") ||
                  label.includes("user") || 
                  label.includes("seat") ||
                  (label.includes("includes") && label.includes("user"));
                
                if (isUserFeature) {
                  userFeatures.push({
                    key: slug || key || label,
                    value: value,
                    priority: (slug === "user-limit" || key === "user-limit" || slug === "users" || key === "users") ? 1 : 2
                  });
                }
              }
            } else if (typeof feature === "string") {
              // Legacy string format: "Includes 10 users"
              const match = feature.match(/(\d+)\s*users?/i);
              if (match) {
                userFeatures.push({
                  key: "string-match",
                  value: parseInt(match[1]),
                  priority: 1
                });
                // console.log("✅ Found users in string feature:", match[1]);
              }
            }
          }
          
          // Sort by priority and pick the highest value with highest priority
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.value - a.value; // Higher value first
            });
            userCount = userFeatures[0].value;
            console.log("✅ Selected user count:", userCount, "from:", userFeatures[0].key);
          }
        } 
        // Method 2: Check if features is an object/map (v2 format - validatedFeatureMap)
        else if (typeof rawFeatures === "object" && rawFeatures !== null) {
          console.log("🔍 Processing features as object/map");
          
          // Collect all potential user count features
          const userFeatures = [];
          
          // Loop through the feature map keys
          for (const [slug, value] of Object.entries(rawFeatures)) {
            const slugLower = slug.toLowerCase();
            
            console.log("🔍 Checking feature key:", slug, "value:", value, "type:", typeof value);
            
            // Check if this is a user-related feature with specific keywords
            const isUserFeature = 
              slugLower === "user-limit" || 
              slugLower === "users" || 
              slugLower === "user" ||
              slugLower === "seats" ||
              slugLower.includes("user-limit") ||
              slugLower.includes("user-count") ||
              (slugLower.includes("user") && !slugLower.includes("admin") && !slugLower.includes("panel"));
            
            if (isUserFeature && typeof value === "number" && value > 0) {
              userFeatures.push({
                key: slug,
                value: value,
                priority: (slugLower === "user-limit" || slugLower === "users") ? 1 : 2
              });
              console.log("✅ Found potential user feature:", slug, "=", value);
            }
          }
          
          // Sort and pick the best match
          if (userFeatures.length > 0) {
            userFeatures.sort((a, b) => {
              if (a.priority !== b.priority) return a.priority - b.priority;
              return b.value - a.value; // Higher value first
            });
            userCount = userFeatures[0].value;
            console.log("✅ Selected user count:", userCount, "from key:", userFeatures[0].key);
          }
        }

        console.log("🎯 Final user count:", userCount);

        setLmsPlan({
          licenseId: matched._id,
          planName: matched.licenseType.name, 
          pricePerUser: matched.licenseType.price.amount, // Price per user per month
          includedUsers: userCount, // Number of users in the plan
        });
      } catch (err) {
        console.error("Failed to load checkout plan", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlanFromLMS();
  }, [selectedPlan]);

  if (loading || !lmsPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Plans
        </Button>

        <div className="text-center mb-8">
          <h1 className="mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            Seamlessly connect your Tally with modern business tools
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
                          readOnly
                          className="pl-10 bg-muted cursor-not-allowed"
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
                    <Button type="submit" size="lg" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Proceed to Payment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Selected Plan</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 
                 text-blue-700 dark:text-blue-300 
                 rounded-full text-sm font-medium">{lmsPlan.planName}</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {getBillingText()}
                    </span>
                  </div>
                  
                  {/* Show included users */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Includes {lmsPlan.includedUsers} users</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Billing Cycle</p>
                  <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as BillingCycle)}>
                    <TabsList className="w-full grid-cols-4">
                      <TabsTrigger value="monthly" className="text-xs">
                        Monthly
                      </TabsTrigger>
                      <TabsTrigger value="quarterly" className="text-xs">
                        Quarterly
                        <span className="ml-1 text-[10px] text-green-600 dark:text-green-400">-5%</span>
                      </TabsTrigger>
                      <TabsTrigger value="half-yearly" className="text-xs">
                        Half-Yearly
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
                    <span className="text-muted-foreground">Price per user/month</span>
                    <span>₹{lmsPlan.pricePerUser.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Number of users</span>
                    <span>×{lmsPlan.includedUsers}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Billing period</span>
                    <span>{getBillingPeriod()}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{getSubtotal().toLocaleString('en-IN')}</span>
                  </div>
                  
                  {getSavingsPercent() > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-medium">
                      <span>Discount ({getSavingsPercent()}%)</span>
                      <span>-₹{getDiscount().toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{getTax().toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-baseline">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold">₹{getTotal().toLocaleString('en-IN')}</span>
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
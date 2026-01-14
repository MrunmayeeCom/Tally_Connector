import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Download, Mail, ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransactionDetails } from "../api/payment";
import { downloadInvoice } from "../api/payment";
import { useNavigate } from "react-router-dom";
export function PaymentSuccess() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const transactionId = params.get("txn");

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (!transactionId) return;

    const fetchTransaction = async () => {
      try {
        const data = await getTransactionDetails(transactionId);
        setTransaction(data);
      } catch (err) {
        console.error("Failed to load transaction", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const handleDownloadInvoice = () => {
    if (!transactionId) {
      alert("Transaction ID not found");
      return;
    }
    
    // ✅ Use the downloadInvoice function from api/payment.ts
    downloadInvoice(transactionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading payment details…
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Transaction not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="border-green-200">
          <CardContent className="pt-12 pb-8 text-center space-y-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-6">
                <CheckCircle2 className="h-20 w-20 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Your subscription is now active
              </p>
            </div>

            {/* ✅ REAL TRANSACTION DATA */}
            <div className="bg-blue-50 p-6 rounded-lg text-left space-y-3">
              <h3 className="text-lg">Order Details</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plan</span>
                <span>{transaction.plan}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span>
                  ₹{(transaction.amount).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600">{transaction.status}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* ✅ ACTIONS */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadInvoice}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>

              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate("/tutorials")}

              >
                Go to tutorial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="pt-6 border-t text-xs text-muted-foreground">
              Transaction ID: {transaction.transactionId}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Questions? Email{" "}
          <a
            href="mailto:support@trackon.com"
            className="text-blue-600 hover:underline"
          >
            support@tallyconnector.com
          </a>
        </div>
      </div>
    </div>
  );
}

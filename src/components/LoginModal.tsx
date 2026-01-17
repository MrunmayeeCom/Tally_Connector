import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { syncCustomer, checkCustomerExists } from "../api/customerSync";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminLogin: (type: "admin" | "customer", name: string) => void;
  onLoginSuccess?: () => void;
}

export function LoginModal({ open, onOpenChange, onAdminLogin, onLoginSuccess }: LoginModalProps) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ FUNCTION NAME UNCHANGED
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminEmail) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      // ----------------------------
      // SIGN IN FLOW
      // ----------------------------
      if (!isSignUp) {
        const exists = await checkCustomerExists(adminEmail);

        if (!exists) {
          toast.error("Account not found. Please create an account.");
          setIsSignUp(true); // 🔁 switch to signup
          return;
        }

        toast.success("Login successful");
      }

      // ----------------------------
      // SIGN UP FLOW
      // ----------------------------
      if (isSignUp) {
        if (!name) {
          toast.error("Name is required to create account");
          return;
        }

        await syncCustomer({
          name,
          email: adminEmail,
          source: "Tally",
        });

        toast.success("Account created successfully");
      }

      // ✅ TEMP SESSION (required for checkout)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name || adminEmail.split("@")[0],
          email: adminEmail,
        })
      );

      onOpenChange(false);

      // 🔥 DO NOT CHANGE THIS CALL
      onAdminLogin("admin", name || adminEmail.split("@")[0]);

      // Optional extra callback
      onLoginSuccess?.();

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to Tally Connector</DialogTitle>
          <DialogDescription>
            Sign in to continue
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            {/* <CardTitle>Admin Portal</CardTitle> */}
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">

              {/* Name field only when signing up */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@tally.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="admin-remember" className="rounded" />
                  <Label htmlFor="admin-remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
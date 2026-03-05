import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";
import { Mail, Lock, Shield } from "lucide-react";
import { toast } from "sonner";
import { syncCustomer, checkCustomerExists } from "../api/customerSync";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminLogin: (type: "admin" | "customer", name: string) => void;
  onLoginSuccess?: () => void;
}

export function LoginModal({
  open,
  onOpenChange,
  onAdminLogin,
  onLoginSuccess,
}: LoginModalProps) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setAdminEmail("");
      setAdminPassword("");
      setName("");
      setIsSignUp(false);
      setLoading(false);
      setRememberMe(false);
    }
    onOpenChange(val);
  };

  // ⚠️ FUNCTION NAME UNCHANGED
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminEmail) {
      toast.error("Email is required");
      return;
    }

    if (adminPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      if (!isSignUp) {
        const exists = await checkCustomerExists(adminEmail);
        if (!exists) {
          toast.error("Account not found. Please create an account.");
          setIsSignUp(true);
          return;
        }
        toast.success("Login successful");
      }

      if (isSignUp) {
        if (!name) {
          toast.error("Name is required to create account");
          return;
        }
        await syncCustomer({
          name,
          email: adminEmail,
          source: "Tally",
          password: adminPassword,
        });
        toast.success("Account created successfully");
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name || adminEmail.split("@")[0],
          email: adminEmail,
        }),
      );

      window.dispatchEvent(new Event("userLoginStatusChanged"));
      handleOpenChange(false);

      // 🔥 DO NOT CHANGE THIS CALL
      onAdminLogin("admin", name || adminEmail.split("@")[0]);
      onLoginSuccess?.();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Reduced max-w and added max-h + overflow-y-auto to shrink overall height */}
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none bg-gradient-to-br from-blue-50 to-cyan-50">
        <VisuallyHidden>
          <DialogTitle>Login to Tally Connector</DialogTitle>
          <DialogDescription>
            Sign in or create an account to continue
          </DialogDescription>
        </VisuallyHidden>

        <div className="relative">
          {/* Reduced padding: p-5 → p-4 */}
          <div className="p-4">
            {/* text-2xl → text-lg */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-bold text-gray-900 mb-1"
            >
              {isSignUp ? "Create an Account" : "Login to Tally Connector"}
            </motion.h2>
            {/* text-sm → text-xs, mb-4 → mb-3 */}
            <p className="text-gray-600 mb-3 text-xs">
              {isSignUp
                ? "Fill in your details to get started"
                : "Sign in to continue"}
            </p>

            {/* Reduced inner padding: p-5 → p-4 */}
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              {/* text default → text-xs, mb-6 → mb-3 */}
              <p className="text-gray-700 mb-3 text-xs font-medium">
                Enter your credentials to continue
              </p>

              {/* space-y-4 → space-y-3 */}
              <form onSubmit={handleAdminLogin} className="space-y-3">
                {isSignUp && (
                  <div>
                    {/* text-sm → text-xs, mb-2 → mb-1 */}
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="admin@tally.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full pl-10 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-xs text-gray-700">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Shield className="w-4 h-4" />
                  {loading
                    ? "Please wait..."
                    : isSignUp
                      ? "Sign Up"
                      : "Sign In"}
                </motion.button>

                <p className="text-center text-xs mt-2">
                  {isSignUp ? (
                    <>
                      <span className="text-gray-600">
                        Already have an account?{" "}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsSignUp(false)}
                        className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-600">
                        Don't have an account?{" "}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsSignUp(true)}
                        className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

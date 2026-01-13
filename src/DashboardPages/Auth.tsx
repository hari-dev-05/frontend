import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";

// Removed backend API reference
// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  /* =========================
     CHECK EXISTING LOGIN
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/affiliate");
    }
  }, [navigate]);

  /* =========================
     GOOGLE LOGIN
  ========================= */
  const handleGoogleLogin = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        // 🔐 MOCK LOGIN
        localStorage.setItem("token", "demo-token");

        toast({
          title: "Login successful",
          description: "UI-only demo login",
        });

        navigate("/affiliate");
      } else {
        // 🆕 MOCK REGISTER
        toast({
          title: "Account created",
          description: "Please login to continue (UI-only)",
        });

        setIsLogin(true);
      }
      setLoading(false);
    }, 800);
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="transition-smooth hover-gradient-primary"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-card border rounded-2xl p-8 mt-4">
          <div className="text-center mb-6">
            <div className="inline-flex gap-2 px-4 py-2 rounded-full gradient-primary mb-4">
              <Sparkles className="w-4 h-4" />
              Affiliate Program
            </div>

            <h1 className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
          </div>

          {/* =========================
              GOOGLE LOGIN (ALWAYS VISIBLE)
          ========================= */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4 flex items-center justify-center gap-2 transition-smooth hover:bg-transparent hover-gradient-primary"
            onClick={handleGoogleLogin}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Label>Full Name</Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Label>Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </Button>
          </form>

          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-primary underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

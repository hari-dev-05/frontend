import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Calendar, Clock, Users, CheckCircle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Validate referral code format: AIGENXT-XXXXXXXX
const referralCodeSchema = z.string().regex(/^AIGENXT-[A-Z0-9]{8}$/).optional();

const WebinarRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [webinarDetails, setWebinarDetails] = useState({
    date: "April 10, 2026",
    time: "7:00 PM IST",
    topic: "AI Masterclass",
    description: "Learn how AI is transforming careers and discover why AIGENXT is the perfect launchpad for your AI journey."
  });

  useEffect(() => {
    // Check Login (UI-only)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setName("Demo User");
      setEmail("demo@example.com");
    }

    // Fetch active webinar details (Disabled - using defaults)
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check Login
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Success -> Green Toast (UI-only)
      setName("");
      setEmail("");
      setPhone("");
      setRedeemCode("");

      toast({
        title: "Registration Successful!",
        description: `You've been registered for the ${webinarDetails.date} webinar (UI-only demo).`,
        variant: "default",
        className: "bg-green-600 text-white border-none"
      });
      setIsLoading(false);
    }, 1000);
  };


  return (
    <section id="webinar" className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Video className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Free MyWebinar</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Free{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {webinarDetails.topic || "AI Masterclass MyWebinar"}
                </span>
              </h2>
              <p className="text-muted-foreground mb-6">
                {webinarDetails.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{webinarDetails.date} (MyWebinar)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>{webinarDetails.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span>Limited to 500 seats</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Register Now - It's Free!</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoggedIn && email.length > 0}
                  className={isLoggedIn && email.length > 0 ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}
                />
                <Input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  placeholder="Redeem Code (Optional)"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Reserve My Spot"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Login Required Modal */}
      <AlertDialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>
              You must be logged in to reserve your spot for the webinar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/auth")}>
              Login / Sign Up
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default WebinarRegistration;
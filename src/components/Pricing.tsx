import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Crown, Rocket, Zap, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const plans = [
  {
    name: "Basic",
    originalPrice: "₹7,999",
    icon: Rocket,
    description: "Perfect for getting started with AI",
    features: [
      "Recorded Sessions Only",
      "Core 12-Month Curriculum",
      "Python to Deep Learning",
      "Machine Learning Fundamentals",
      "Basic NLP & Data Analytics",
      "Community Access",
      "Lifetime Content Access",
    ],
  },
  {
    name: "Pro",
    originalPrice: "₹9,999",
    icon: Sparkles,
    description: "For creators who want to build",
    features: [
      "Everything in Basic",
      "Live Session Access",
      "Generative AI Mastery",
      "No-Code AI Creator Kit",
      "AI Video & Image Tools",
      "Priority Support",
      "Monthly Live Q&A Sessions",
      "Project Templates",
    ],
  },
  {
    name: "Elite",
    originalPrice: "₹14,999",
    icon: Crown,
    description: "Complete AI mastery with VIP access",
    features: [
      "Everything in Pro",
      "VIP Access to All 25+ MyCourse",
      "Kids Coding Platform (1 Year)",
      "Portfolio Website Setup Support",
      "1-on-1 Mentorship Sessions",
      "Career Guidance & Resume Review",
      "Industry Certification",
      "Job Placement Assistance",
      "Access to AI Hackathons",
      "Advanced RAG & AI Agents",
    ],
  },
];

const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tonight = new Date();
      tonight.setHours(23, 59, 59, 999);

      const difference = tonight.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              World's Most Affordable
            </span> AI Program
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. All plans include lifetime access to AIGenXT + 1 year access to 25+ courses at fsts.fourstepsolutions.com
          </p>
        </div>

        {/* One Day Offer Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-1 rounded-2xl">
            <div className="bg-background rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-primary">🔥 ONE DAY OFFER - TONIGHT ONLY! 🔥</span>
                <Zap className="w-6 h-6 text-primary" />
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-4 my-4">
                <Clock className="w-5 h-5 text-accent" />
                <div className="flex gap-2">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-black text-primary">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <p className="text-xs text-muted-foreground">Hours</p>
                  </div>
                  <span className="text-2xl font-bold text-primary self-center">:</span>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-black text-primary">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <p className="text-xs text-muted-foreground">Minutes</p>
                  </div>
                  <span className="text-2xl font-bold text-primary self-center">:</span>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 min-w-[70px]">
                    <span className="text-2xl md:text-3xl font-black text-secondary">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <p className="text-xs text-muted-foreground">Seconds</p>
                  </div>
                </div>
              </div>

              <p className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ₹7,999
                </span>
                <span className="text-lg text-muted-foreground ml-2">for ANY plan!</span>
              </p>
              <p className="text-muted-foreground">Limited time offer - Don't miss out!</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-card relative overflow-hidden border-border hover:border-primary/50 transition-smooth flex flex-col h-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-muted">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="text-2xl font-black mb-2">
                    <span className="line-through text-muted-foreground">
                      {plan.originalPrice}
                    </span>
                  </div>
                  <div className="text-4xl font-black mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ₹7,999
                    </span>
                  </div>
                  <p className="text-sm text-primary font-semibold">Today Only!</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-auto"
                  asChild
                >
                  <a href="https://rzp.io/rzp/Aigenxt2026" target="_blank" rel="noopener noreferrer">
                    Enroll Now - ₹7,999
                  </a>
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            🔒 Secure payment • 🎓 Lifetime access to AIGenXT • 📚 25+ MyCourse for 1 Year
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
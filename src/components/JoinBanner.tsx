import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const JoinBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-04-14T19:00:00+05:30').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/50 p-12">
            <div className="absolute inset-0 gradient-hero opacity-10"></div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary bg-card/80 mb-6">
                <Clock className="w-4 h-4 text-primary animate-glow-pulse" />
                <span className="text-sm font-semibold">Limited Time Offer</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Join the 12-Month Global AI Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Program Starts April 14, 2026 — Don't Miss Out!
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-card rounded-lg p-4 min-w-[80px] border border-primary/50 glow-primary">
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{item.label}</div>
                  </div>
                ))}
              </div>

              <Button variant="hero" size="xl" className="group" asChild>
                <a href="https://rzp.io/rzp/Aigenxt2026" target="_blank" rel="noopener noreferrer">
                  Enroll Now - ₹7,999
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <p className="text-sm text-muted-foreground mt-4">
                Join 5000+ students already enrolled • Limited seats available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinBanner;

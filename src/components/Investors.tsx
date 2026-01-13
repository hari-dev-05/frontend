import React, { useState, useEffect } from 'react';
import { Mail, TrendingUp, Shield, Zap } from "lucide-react";
import axios from "axios";

const Investors = () => {
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      try {
        const res = await axios.get(`${API}/api/admin/system-config/contact_investment`);
        setContactEmail(res.data.value || "hariharan040511@gmail.com");
      } catch (err) {
        console.error(err);
        setContactEmail("hariharan040511@gmail.com");
      }
    };
    fetchContact();
  }, []);

  const getFinalUrl = () => {
    const subject = encodeURIComponent("Investment Inquiry - AIGENXT");
    const body = encodeURIComponent("Hello Team,\n\nI am interested in exploring investment opportunities with AIGENXT.\n\nBest regards,");
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${subject}&body=${body}`;
  };

  const investmentHighlights = [
    {
      icon: TrendingUp,
      title: "Rapid Growth",
      description: "3x year-over-year growth in student registrations and engagement."
    },
    {
      icon: Shield,
      title: "Proven Model",
      description: "Scalable AI education infrastructure with verified success metrics."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Proprietary AI-driven learning tools and curriculum deployment."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Invest in the Next Era of <span className="text-primary italic">Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are scaling the world's most advanced AI training ecosystem. Join a select group of forward-thinking investors shaping the technology of tomorrow.
            </p>

            <div className="space-y-6 mb-10">
              {investmentHighlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={getFinalUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-5 rounded-xl border-accent text-accent hover:bg-accent/10 border text-lg font-bold transition-all"
            >
              <Mail className="mr-2 w-5 h-5" />
              Contact for Investment
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="relative bg-card border border-border/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-muted/20 border border-white/5">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-2">Total Students</p>
                  <p className="text-4xl font-black text-primary">10k+</p>
                </div>
                <div className="p-6 rounded-2xl bg-muted/20 border border-white/5">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-2">Success Rate</p>
                  <p className="text-4xl font-black text-primary">95%</p>
                </div>
                <div className="p-6 rounded-2xl bg-muted/20 border border-white/5 col-span-2">
                  <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-2">Annual Growth</p>
                  <p className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">300%+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investors;

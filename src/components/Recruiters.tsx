import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Briefcase, Users, Search } from "lucide-react";
import axios from "axios";

const Recruiters = () => {
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      try {
        const res = await axios.get(`${API}/api/admin/system-config/contact_hiring`);
        setContactEmail(res.data.value || "hariharan040511@gmail.com");
      } catch (err) {
        console.error(err);
        setContactEmail("hariharan040511@gmail.com");
      }
    };
    fetchContact();
  }, []);

  const getFinalUrl = () => {
    const subject = encodeURIComponent("Hiring Inquiry - AI-Ready Talent");
    const body = encodeURIComponent("Hello Team,\n\nWe are looking to hire AI-trained professionals from your pool. Please provide more information on how we can start the hiring process.\n\nBest regards,");
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${subject}&body=${body}`;
  };

  const benefits = [
    "Access to 10,000+ AI-trained professionals",
    "Verified skill sets and certifications",
    "Tailored talent matching service",
    "Early access to top graduates",
    "Custom hiring events and webinars"
  ];

  return (
    <section className="py-24 bg-card/50 border-y border-border/50 relative overflow-hidden text-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Search className="w-4 h-4" />
                Talent Solutions
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Find Your Next <br />
                <span className="text-primary italic">AI Powerhouse</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Skip the traditional recruitment pain. Access our exclusive pool of AI-trained professionals who are ready to build the future of your company.
              </p>

              <div className="space-y-4 mb-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual/Action */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-10 animate-pulse" />
              <div className="relative bg-background border border-border/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Partner with AIGENXT</h3>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  Join hundreds of forward-thinking companies already hiring from our ecosystem. Get a head start on talent acquisition.
                </p>
                <a
                  href={getFinalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 py-6 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 transition-all text-white"
                >
                  <Mail className="mr-3 w-6 h-6" />
                  Contact Hiring Team
                </a>
                <p className="text-xs text-center text-muted-foreground mt-6 italic">
                  Average response time: &lt; 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof Placeholder Line */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2"><Users className="w-5 h-5" /> <span className="font-black text-xl">10,000+ TALENTS</span></div>
            <div className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> <span className="font-black text-xl">500+ PARTNERS</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruiters;

import React, { useState, useEffect } from 'react';
import { Handshake, Users, Globe, Award, Mail } from "lucide-react";
import axios from "axios";

const Sponsors = () => {
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      try {
        const res = await axios.get(`${API}/api/admin/system-config/contact_partnership`);
        setContactEmail(res.data.value || "hariharan040511@gmail.com");
      } catch (err) {
        console.error(err);
        setContactEmail("hariharan040511@gmail.com");
      }
    };
    fetchContact();
  }, []);

  const getFinalUrl = () => {
    const subject = encodeURIComponent("Partnership & Sponsorship Enquiry - AIGENXT");
    const body = encodeURIComponent("Hello Team,\n\nI am interested in exploring partnership or sponsorship opportunities with AIGENXT. I would like to discuss how we can work together.\n\nBest regards,");
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${subject}&body=${body}`;
  };

  const benefits = [
    {
      icon: Users,
      title: "Targeted Audience",
      description: "Direct access to over 10,000+ AI-focused professionals and students."
    },
    {
      icon: Globe,
      title: "Global Visibility",
      description: "Showcase your brand to a worldwide audience across 15+ countries."
    },
    {
      icon: Award,
      title: "Community Impact",
      description: "Support the next generation of AI talent and build industry goodwill."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-left" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Partner with the <span className="text-primary">AI Revolution</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Accelerate your brand by sponsoring the world's fastest-growing AI education platform. Connect with the innovators of tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-10 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Start Your Journey with Us</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Let's discuss how we can collaborate to shape the future of AI education.
            </p>
            <a
              href={getFinalUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-12 py-6 rounded-xl bg-primary text-white hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 transition-all"
            >
              <Handshake className="mr-3 w-6 h-6" />
              Contact for Partnership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;

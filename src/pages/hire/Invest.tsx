import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Globe, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Invest = () => {
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
        const subject = encodeURIComponent("Investment Opportunity Enquiry - AIGENXT");
        const body = encodeURIComponent("Hello Team,\n\nI am interested in exploring investment opportunities with AIGENXT. Please share more details or schedule a call with me.\n\nBest regards,");
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${subject}&body=${body}`;
    };

    const stats = [
        {
            icon: Users,
            label: "Total Registrations",
            value: "10,000+",
            color: "text-blue-500",
            description: "Growing global student community"
        },
        {
            icon: Globe,
            label: "Countries Reached",
            value: "15+",
            color: "text-purple-500",
            description: "Students from all around the world"
        },
        {
            icon: Award,
            label: "Success Rate",
            value: "95%",
            color: "text-green-500",
            description: "Industry-leading completion rate"
        }
    ];

    return (
        <div className="min-h-screen pt-20 bg-background">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -skew-y-6 origin-right" />
                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                            <TrendingUp className="w-4 h-4" />
                            Invest in the Future
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                            Shape the Next Generation of <span className="text-primary italic">AI Leaders</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join us in our mission to democratize elite AI education. We're building the most innovative platform for aspiring engineers and professionals worldwide.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href={getFinalUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center"
                            >
                                Contact for Investment
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-lg group">
                                <div className={`w-14 h-14 rounded-2xl bg-muted/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                                <p className="font-semibold text-lg mb-2">{stat.label}</p>
                                <p className="text-sm text-muted-foreground">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Invest;

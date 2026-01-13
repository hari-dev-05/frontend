import { Button } from "@/components/ui/button";
import { Briefcase, Users, Award, Target, CheckCircle, Mail } from "lucide-react";

const Recruiters = () => {
    const benefits = [
        "Access to 10,000+ AI-trained professionals",
        "Pre-vetted candidates with verified skills",
        "Portfolio projects to assess capabilities",
        "Direct hiring without agency fees",
        "Diverse talent from 50+ countries",
        "Customized hiring events & hackathons",
    ];

    const hiringOptions = [
        {
            icon: Users,
            title: "Bulk Hiring",
            description: "Hire 10+ candidates at discounted rates",
        },
        {
            icon: Target,
            title: "Campus Connect",
            description: "Exclusive access to top performers",
        },
        {
            icon: Award,
            title: "Skill Assessment",
            description: "Custom tests to evaluate candidates",
        },
    ];

    return (
        <div className="min-h-screen pt-20">
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                            <Briefcase className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium text-secondary">For Recruiters</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Hire AI-Ready{" "}
                            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                Talent
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Access our pool of trained AI professionals for your organization's needs
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Benefits List */}
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Why Hire From AIGENXT?</h3>
                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Hiring Options */}
                        <div className="space-y-4">
                            {hiringOptions.map((option, index) => {
                                const Icon = option.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-xl p-6 hover:border-secondary/50 transition-smooth"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                                                <Icon className="w-6 h-6 text-secondary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">{option.title}</h4>
                                                <p className="text-muted-foreground text-sm">{option.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <Button variant="secondary" size="lg">
                            <Mail className="mr-2" />
                            Contact Hiring Team
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Recruiters;

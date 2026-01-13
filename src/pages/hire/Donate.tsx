import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, Users, BookOpen, Sparkles } from "lucide-react";

const Donate = () => {
    const impactItems = [
        {
            icon: GraduationCap,
            number: "500+",
            label: "Students Sponsored",
        },
        {
            icon: BookOpen,
            number: "100+",
            label: "Free MyCourse",
        },
        {
            icon: Users,
            number: "50+",
            label: "Community Events",
        },
    ];

    return (
        <div className="min-h-screen pt-20">
            <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                                <Heart className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Support Education</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Empower Students Through{" "}
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    le2.org.in
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                le2.org.in is a registered trust dedicated to empowering underprivileged students with technical education and career opportunities.
                            </p>
                        </div>

                        {/* Impact Stats */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {impactItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-smooth"
                                    >
                                        <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                        <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                                            {item.number}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{item.label}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Donation CTA */}
                        <div className="bg-card border border-primary/30 rounded-2xl p-8 text-center">
                            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Make a Difference Today</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Your donation helps provide free AI education to students who cannot afford it. Every contribution counts!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="hero" size="lg" asChild>
                                    <a href="https://pages.razorpay.com/le2aigenxt" target="_blank" rel="noopener noreferrer">
                                        <Heart className="mr-2" />
                                        Donate Now
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" className="border-primary/50" asChild>
                                    <a href="https://le2.org.in" target="_blank" rel="noopener noreferrer">
                                        Learn About le2.org.in
                                    </a>
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                le2.org.in is a registered charitable trust. Donations may be tax-deductible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Donate;

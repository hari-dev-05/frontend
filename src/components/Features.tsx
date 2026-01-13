import { Video, Brain, MessageSquare, Globe, Award, Infinity as InfinityIcon } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live + Recorded Sessions",
    description: "Attend live classes or learn at your own pace with lifetime access to all recordings",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Brain,
    title: "No-Code AI Creation",
    description: "Build AI solutions without writing code using cutting-edge no-code platforms",
    gradient: "from-secondary to-secondary/70",
  },
  {
    icon: MessageSquare,
    title: "Build AI Agents & RAG",
    description: "Create intelligent chatbots and retrieval-augmented generation systems",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: Globe,
    title: "Website & App AI Builder",
    description: "Design and deploy complete web applications using AI-powered tools",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Award,
    title: "Global Mentors",
    description: "Learn from industry experts and AI practitioners from around the world",
    gradient: "from-secondary to-accent",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime Access",
    description: "One-time payment for unlimited access to all content, updates, and future additions",
    gradient: "from-accent to-primary",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AIGENXT?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master AI and build real-world applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:glow-primary transition-smooth`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

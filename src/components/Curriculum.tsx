import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Sparkles, Cpu, MessageSquare, Palette, Code, Video, Image, Wand2, Bot, Database, Zap, Layers, Globe, Rocket } from "lucide-react";

const Curriculum = () => {
  const modules = [
    // Year 1
    {
      icon: BookOpen,
      title: "Python Basics + AI Video Creation",
      description: "Learn Python fundamentals alongside creating stunning AI videos",
      duration: "Month 1",
      year: 1,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Video,
      title: "Python Advanced + AI Image Generation",
      description: "Advanced Python concepts with hands-on AI image tools",
      duration: "Month 2",
      year: 1,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Brain,
      title: "Machine Learning + AI Music & Audio",
      description: "ML algorithms while creating AI-powered audio content",
      duration: "Month 3",
      year: 1,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Wand2,
      title: "ML Projects + No-Code AI Automations",
      description: "Build ML projects and automate workflows without coding",
      duration: "Month 4",
      year: 1,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Cpu,
      title: "Deep Learning + AI Avatar Creation",
      description: "Neural networks theory with creating AI avatars and characters",
      duration: "Month 5",
      year: 1,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Image,
      title: "CNNs & RNNs + AI Website Builder",
      description: "Advanced neural architectures with building websites using AI",
      duration: "Month 6",
      year: 1,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: MessageSquare,
      title: "NLP Fundamentals + AI Chatbot Tools",
      description: "Natural language processing with no-code chatbot builders",
      duration: "Month 7",
      year: 1,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Palette,
      title: "Data Analytics + AI Presentation Tools",
      description: "Data visualization with AI-powered presentation creators",
      duration: "Month 8",
      year: 1,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Sparkles,
      title: "Generative AI + AI Content Writing",
      description: "GANs and diffusion models with AI writing assistants",
      duration: "Month 9",
      year: 1,
      color: "accent",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Brain,
      title: "LLMs & Fine-tuning + AI Marketing Tools",
      description: "Large language models with AI-powered marketing automation",
      duration: "Month 10",
      year: 1,
      color: "accent",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Code,
      title: "AI Agents + No-Code App Builders",
      description: "Build intelligent agents while creating apps without coding",
      duration: "Month 11",
      year: 1,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Wand2,
      title: "RAG Systems + Portfolio & Capstone",
      description: "Advanced retrieval systems and build your complete portfolio",
      duration: "Month 12",
      year: 1,
      color: "accent",
      tags: ["Coding", "No-Code"],
    },
    // Year 2
    {
      icon: Bot,
      title: "Advanced AI Agents + Autonomous Systems",
      description: "Build sophisticated multi-agent systems and autonomous AI workflows",
      duration: "Month 13",
      year: 2,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Database,
      title: "Vector Databases + Knowledge Systems",
      description: "Master vector embeddings and build intelligent knowledge bases",
      duration: "Month 14",
      year: 2,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Zap,
      title: "AI APIs & Integrations + Enterprise Tools",
      description: "Connect AI services and build enterprise-grade solutions",
      duration: "Month 15",
      year: 2,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Layers,
      title: "MLOps & Model Deployment",
      description: "Deploy, monitor, and scale AI models in production",
      duration: "Month 16",
      year: 2,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Globe,
      title: "Computer Vision + Real-world Applications",
      description: "Advanced CV projects with real-world industry applications",
      duration: "Month 17",
      year: 2,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: MessageSquare,
      title: "Conversational AI + Voice Assistants",
      description: "Build voice-enabled AI assistants and conversational interfaces",
      duration: "Month 18",
      year: 2,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Sparkles,
      title: "Advanced GenAI + Multimodal Models",
      description: "Work with cutting-edge multimodal AI and generation techniques",
      duration: "Month 19",
      year: 2,
      color: "accent",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Code,
      title: "AI Product Development + Monetization",
      description: "Build and monetize AI products, SaaS, and services",
      duration: "Month 20",
      year: 2,
      color: "accent",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Brain,
      title: "AI Research & Innovation",
      description: "Explore cutting-edge AI research and emerging technologies",
      duration: "Month 21",
      year: 2,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Palette,
      title: "AI Ethics & Responsible AI",
      description: "Master ethical AI development and responsible deployment",
      duration: "Month 22",
      year: 2,
      color: "secondary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Cpu,
      title: "Industry Specialization Projects",
      description: "Deep-dive into AI for healthcare, finance, or your chosen industry",
      duration: "Month 23",
      year: 2,
      color: "primary",
      tags: ["Coding", "No-Code"],
    },
    {
      icon: Rocket,
      title: "Final Capstone + Career Launch",
      description: "Complete your flagship project and launch your AI career",
      duration: "Month 24",
      year: 2,
      color: "accent",
      tags: ["Coding", "No-Code"],
    },
  ];

  const year1Modules = modules.filter(m => m.year === 1);
  const year2Modules = modules.filter(m => m.year === 2);

  const renderModuleCard = (module: typeof modules[0], index: number) => {
    const Icon = module.icon;
    const colorClasses = {
      primary: "border-primary/50 hover:border-primary hover:glow-primary",
      secondary: "border-secondary/50 hover:border-secondary hover:glow-secondary",
      accent: "border-accent/50 hover:border-accent hover:glow-accent",
    };
    const iconBg = {
      primary: "gradient-primary",
      secondary: "bg-secondary",
      accent: "gradient-accent",
    };

    return (
      <div
        key={index}
        className={`bg-card border rounded-xl p-6 transition-smooth group ${colorClasses[module.color as keyof typeof colorClasses]}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg[module.color as keyof typeof iconBg]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground">
            {module.duration}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{module.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
        <div className="flex gap-2">
          {module.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`text-xs px-2 py-1 rounded-full ${tag === "Coding"
                ? "bg-primary/20 text-primary"
                : "bg-accent/20 text-accent"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coding + No-Code Mixed Every Month</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2-Year AI Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each month blends coding sessions with hands-on no-code AI tools — so everyone stays engaged from day one!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Year 1 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary"></div>
              <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
                <h3 className="text-xl font-bold text-primary">Year 1: Foundation & Core Skills</h3>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {year1Modules.map((module, index) => renderModuleCard(module, index))}
            </div>
          </div>

          {/* Year 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-accent"></div>
              <div className="px-6 py-3 rounded-full bg-accent/10 border border-accent/30">
                <h3 className="text-xl font-bold text-accent">Year 2: Advanced & Specialization</h3>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/50 to-accent"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {year2Modules.map((module, index) => renderModuleCard(module, index + 12))}
            </div>
          </div>

          {/* Batch Info */}
          <div className="text-center">
            <div className="inline-block bg-card border border-border rounded-2xl p-8">
              <p className="text-lg text-muted-foreground mb-2">Next Batch Starts</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                April 14, 2026
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="https://rzp.io/rzp/Aigenxt2026" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2" />
                  Reserve Your Spot
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;

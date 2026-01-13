import { Bot, Image, Video, Globe, Smartphone, Sparkles } from "lucide-react";

const creations = [
  { icon: Bot, title: "AI Chatbots", color: "text-primary" },
  { icon: Bot, title: "AI Agents", color: "text-secondary" },
  { icon: Video, title: "Video Generators", color: "text-accent" },
  { icon: Image, title: "Image Creators", color: "text-primary" },
  { icon: Globe, title: "Websites", color: "text-secondary" },
  { icon: Smartphone, title: "Apps", color: "text-accent" },
];

const CreateWithAI = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/50 bg-card/50 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">Unleash Your Creativity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What You'll <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Create</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build powerful AI applications that solve real-world problems
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {creations.map((creation, index) => {
              const Icon = creation.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-105 hover:glow-primary group"
                >
                  <div className={`mb-4 ${creation.color} group-hover:animate-float`}>
                    <Icon className="w-12 h-12" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-center">{creation.title}</h3>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 text-center">
            <p className="text-lg font-semibold mb-2">And Much More!</p>
            <p className="text-muted-foreground">
              Master over 100+ AI tools and platforms to bring your ideas to life
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateWithAI;

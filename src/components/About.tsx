import { Brain, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What is <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AIGENXT?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            AIGENXT is a comprehensive 2-year structured AI learning event by <span className="text-foreground font-semibold">Four Steps Training Solutions Pvt Ltd</span>.
            We take you from zero to hero in Artificial Intelligence — from Python fundamentals to cutting-edge Generative AI, AI Agents, and beyond.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-smooth hover:glow-primary">
              <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Structured Learning</h3>
              <p className="text-muted-foreground">
                Step-by-step curriculum designed for both coders and non-coders to master AI concepts progressively.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-secondary/50 transition-smooth hover:glow-secondary">
              <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live + Recorded</h3>
              <p className="text-muted-foreground">
                Attend live sessions with global mentors or learn at your pace with lifetime access to recordings.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-smooth hover:glow-accent">
              <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mb-4 mx-auto">
                <Users className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Everyone</h3>
              <p className="text-muted-foreground">
                Perfect for coders wanting to specialize and non-coders looking to create AI-powered solutions without code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

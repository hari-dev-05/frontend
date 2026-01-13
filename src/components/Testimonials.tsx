import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Non-Coder turned AI Creator",
    content: "I had zero coding experience, but AIGENXT made AI accessible to me. Now I'm building my own AI-powered apps!",
    rating: 5,
  },
  {
    name: "Raj Patel",
    role: "Software Developer",
    content: "The curriculum is incredibly comprehensive. I went from basic Python to building advanced AI agents in just one year.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Data Analyst",
    content: "Best investment I've made in my career. The live sessions with global mentors are worth every penny.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who transformed their careers with AIGENXT
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-smooth hover:glow-primary">
              <Quote className="w-8 h-8 text-primary/50 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">5000+</div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">100+</div>
            <div className="text-sm text-muted-foreground">AI Tools Covered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Global Mentors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

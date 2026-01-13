import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram, Globe, Award, GraduationCap, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Trainer {
  _id: string;
  name: string;
  role: string;
  expertise: string[];
  experience: string;
  image: string;
  avatar?: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

const Trainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get(`${API}/api/trainers`);
        setTrainers(res.data);
      } catch (err) {
        // console.error("Error fetching trainers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary bg-primary/10 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Industry Experts</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn From{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              World-Class Trainers
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our expert trainers bring years of real-world AI experience from top tech companies
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-hidden w-full relative [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex w-max gap-8 animate-marquee">
              {/* Duplicate list for seamless infinite scroll */}
              {[...trainers, ...trainers].map((trainer, index) => (
                <Card key={`${trainer._id}-${index}`} className="min-w-[300px] flex-shrink-0 p-6 bg-card border-border hover:border-primary/50 transition-smooth text-center group">
                  <div className="relative mb-12">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary transition-colors flex items-center justify-center bg-muted">
                      {trainer.image ? (
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary">{trainer.avatar || trainer.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-max">
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs px-3 py-1 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {trainer.experience}
                      </Badge>
                    </div>
                  </div>


                  <h3 className="text-[14px] font-bold mb-1">{trainer.name}</h3>
                  <p className="text-sm text-primary mb-4">{trainer.role}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {trainer.expertise.map((skill, sIndex) => (
                      <Badge key={sIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4">
                    {trainer.socials?.instagram && (
                      <a href={trainer.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {trainer.socials?.linkedin && (
                      <a href={trainer.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {trainer.socials?.website && (
                      <a href={trainer.socials.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            + More industry experts joining our team every month
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trainers;

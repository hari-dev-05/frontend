import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight, Loader2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Hero = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/admin/intro-video`)
      .then(res => res.data.url && setVideoUrl(res.data.url))
      .catch(() => { })
      .finally(() => setLoadingVideo(false));
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 gradient-hero animate-glow-pulse"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-card/50 px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">Starts April 14, 2026 — Enroll Now!</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AIGENXT
            </span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">
              The 12-Month Global AI Journey
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The World's Most Affordable AI Program for Coders and Non-Coders
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
              <span>Live + Recorded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse"></div>
              <span>100+ AI Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse"></div>
              <span>Global Mentors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
              <span>Lifetime Access</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="https://rzp.io/rzp/Aigenxt2026" target="_blank" rel="noopener noreferrer">
                Enroll Now - ₹7,999
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            {videoUrl && (
              <Button
                variant="outline"
                size="xl"
                className="border-primary/50 hover:bg-primary/10"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2" />
                Watch Intro Video
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-primary/20 blur-3xl animate-float"></div>
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-40 w-24 h-24 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Video Modal */}
      {showVideo && videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowVideo(false)}>
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-all z-10"
            >
              ✕
            </button>
            <video
              src={videoUrl.startsWith('http') ? videoUrl : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${videoUrl}`}
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

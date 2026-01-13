import { Mail, MapPin, Phone, Youtube, Instagram, Heart, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              AIGENXT
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              The world's most affordable 2-year AI journey. Master AI, ML, DL, and GenAI with global mentors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-smooth">About AIGENXT</a></li>
              <li><a href="#curriculum" className="hover:text-primary transition-smooth">Curriculum</a></li>
              <li><a href="#features" className="hover:text-primary transition-smooth">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-smooth">Pricing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:info@aigenxt.com" className="hover:text-primary transition-smooth">
                  info@aigenxt.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="tel:+917299515354" className="hover:text-primary transition-smooth">
                  +91 72995 15354
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold mb-4">Join Our Community</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.youtube.com/@Foursteps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary transition-smooth flex items-center justify-center group"
              >
                <Youtube className="w-5 h-5 group-hover:text-foreground" />
              </a>
              <a
                href="https://www.instagram.com/aigenxt/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-secondary transition-smooth flex items-center justify-center group"
              >
                <Instagram className="w-5 h-5 group-hover:text-foreground" />
              </a>
              <a
                href="https://www.facebook.com/Aigenxt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-accent transition-smooth flex items-center justify-center group"
              >
                <Facebook className="w-5 h-5 group-hover:text-accent-foreground" />
              </a>
            </div>
            <a
              href="https://wa.me/917299515354"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-secondary transition-smooth"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Community
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by{" "}
            <span className="font-semibold text-foreground">Four Steps Training Solutions Pvt Ltd</span>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} AIGENXT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Heart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Check auth on load + route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Set a small delay to allow the page to load
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const goToCourses = () => {
    navigate("/courses");
    setIsOpen(false);
  };

  const hireLinks = [
    { label: "Grand Prizes", path: "/prizes" },
    { label: "Prize Winners", path: "/winners" },
    { label: "Investment", path: "/invest" },
    { label: "Sponsorship", path: "/sponsorship" },
    { label: "Donation", path: "/donation" },
    { label: "For Recruiters", path: "/hiring" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            AIGENXT
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("webinar")} className="hover:text-primary transition-colors">
              Jo<span className="relative inline-block">ı<Heart className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-2 h-2 text-red-500 fill-red-500 animate-pulse" /></span>n MyWebinar
            </button>
            <button onClick={goToCourses}>Course</button>
            <Link to="/community" className="hover:text-primary transition-colors">Community</Link>

            {/* Dropdown for Hire Folder Pages */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-primary transition-colors h-16"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                More <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute top-full left-0 w-48 bg-background border border-border rounded-b-lg shadow-lg py-2 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {hireLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="hero" asChild>
              <Link to={isLoggedIn ? "/affiliate" : "/auth"}>
                {isLoggedIn ? "Dashboard" : "Login"}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-4">
              <button className="text-left px-2" onClick={() => scrollToSection("about")}>About</button>
              <button className="text-left px-2" onClick={() => scrollToSection("webinar")}>
                Jo<span className="relative inline-block">ı<Heart className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-2 h-2 text-red-500 fill-red-500 animate-pulse" /></span>n MyWebinar
              </button>
              <button className="text-left px-2" onClick={goToCourses}>Course</button>
              <Link to="/community" className="text-left px-2 hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Community</Link>

              {/* Mobile Hire Links */}
              <div className="border-t border-border/50 pt-4 px-2 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</p>
                {hireLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Button variant="hero" className="w-full" asChild>
                  <Link
                    to={isLoggedIn ? "/affiliate" : "/auth"}
                    onClick={() => setIsOpen(false)}
                  >
                    {isLoggedIn ? "Dashboard" : "Login"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

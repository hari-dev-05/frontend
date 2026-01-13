import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, Menu } from "lucide-react";
import ProfileCompletionModal from "@/components/ProfileCompletionModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import heroBg from "@/assets/hero-bg.jpg";

import Redeem from "@/DashboardPages/redeem/Redeem";
import MyCourse from "@/DashboardPages/students/MyCourse";
import News from "@/DashboardPages/News";
import Profile from "@/DashboardPages/students/Profile";

interface User {
  _id: string;
  email: string;
  fullName: string;
  isAdmin?: boolean;
  adminRole?: string;
  phone?: string;
  profileImage?: string;
}

type Section = "profile" | "redeem" | "courses" | "news";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AffiliateDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("profile");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /* =========================
     HANDLE GOOGLE TOKEN
  ========================= */
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const sectionFromUrl = searchParams.get("section");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      navigate("/affiliate", { replace: true });
    }

    if (sectionFromUrl) {
      if (["profile", "redeem", "courses", "news"].includes(sectionFromUrl)) {
        setActiveSection(sectionFromUrl as Section);
      }
    }
  }, [navigate, searchParams]);

  /* =========================
     AUTH CHECK
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

    axios
      .get(`${API}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.user) {
          const u = res.data.user;
          setUser(u);
          if (!searchParams.get("section")) {
            setActiveSection("profile");
            setSearchParams({ section: "profile" }, { replace: true });
          }
        } else {
          localStorage.removeItem("token");
          navigate("/auth");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/auth");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // SUPER ADMIN LANDING PAGE (Auto-Redirect)
  useEffect(() => {
    if (user?.isAdmin) {
      window.location.href = `http://localhost:5175?token=${localStorage.getItem("token")}`;
    }
  }, [user]);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isProfileIncomplete = user && (!user.fullName || !user.phone || user.fullName === "Google User");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Define sidebar items
  const sidebarItems = [
    ...(user?.adminRole === "superadmin" ? [] : [
      { key: "profile", label: "Profile" },
      { key: "redeem", label: "Redeem" },
      { key: "courses", label: "MyCourse" },
      { key: "news", label: "News" },
    ])
  ];

  const SidebarContent = () => (
    <div className="space-y-6 h-full flex flex-col">
      <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-2 px-2">
        Dashboard Menu
      </h2>
      <div className="space-y-1 flex-1">
        {sidebarItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setActiveSection(key as Section);
              setSearchParams({ section: key });
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === key
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
          >
            {label}
          </button>
        ))}

        {/* Link to Admin Panel if user is admin */}
        {user?.isAdmin && <a
          href={`http://localhost:5175?token=${localStorage.getItem("token")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-blue-500 hover:bg-blue-500/10 transition-colors mt-4 border border-blue-500/20"
        >
          Go to Admin Panel ↗
        </a>
        }
      </div>
    </div>
  );



  if (user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Redirecting to Admin Panel...</p>
        </div>
      </div>
    );
  }



  // STANDARD DASHBOARD (Students & Affiliates)
  return (
    <div className="h-screen flex flex-col overflow-hidden relative">

      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        </div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 gradient-hero animate-glow-pulse"></div>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="flex-none flex justify-between items-center p-4 border-b border-white/10 bg-background/40 backdrop-blur-md z-50 relative">
        <div className="flex items-center gap-4">

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6 bg-background/90 backdrop-blur-xl border-r-white/10">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hidden md:flex">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <Button variant="hero" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* ===== BODY ===== */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <aside className="hidden lg:block w-72 border-r border-white/10 p-6 overflow-y-auto bg-background/20 backdrop-blur-md">
          <SidebarContent />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto hide-scrollbar">
          <>
            {activeSection === "profile" && (
              <Profile
                onProfileUpdate={(updatedUser: any) => {
                  setUser((prev: any) => ({ ...prev, ...updatedUser }));
                }}
              />
            )}
            {activeSection === "redeem" && <Redeem />}
            {activeSection === "courses" && <MyCourse />}
            {activeSection === "news" && <News />}
          </>
        </main>
      </div>

      {isProfileIncomplete && user && (
        <ProfileCompletionModal
          user={user}
          onComplete={(updatedUser) => setUser({ ...user, ...updatedUser })}
        />
      )}
    </div>
  );
};

export default AffiliateDashboard;

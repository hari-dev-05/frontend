import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Play, Star, Users, Clock, BookOpen, GraduationCap } from "lucide-react";

interface UserData {
  enrolledCourses: string[];
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyCourse = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = user?.enrolledCourses?.includes("aigenxt");

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">Access and continue your learning journey.</p>
      </div>

      {isEnrolled ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AIGENXT Professional AI Program Card */}
          <div className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Course Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src="https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg"
                alt="AIGENXT AI Program"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-lg">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  AIGENXT – Professional AI Program
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Master AI with real-world projects, Python, ML & industry tools.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">By Hariharan</span>
                <span>•</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-bold">4.9</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>1,340 students</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary/60" />
                  <span>134 Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary/60" />
                  <span>17 Hours</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/learning/aigenxt`)}
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 mt-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Learning
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-muted/30 border-2 border-dashed rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap className="w-12 h-12" />
          </div>
          <div className="max-w-md space-y-2">
            <h2 className="text-2xl font-bold">No courses yet</h2>
            <p className="text-muted-foreground text-sm">
              You haven't enrolled in any courses. Explore our programs and start your AI journey today!
            </p>
          </div>
          <button className="h-12 px-8 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourse;

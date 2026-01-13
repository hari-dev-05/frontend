import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, CalendarPlus, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

interface Session {
  _id: string;
  topic: string;
  date: string;
  time: string;
  image?: string;
  avatar?: string;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NextSession = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/sessions`);
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      }
    };
    fetchSessions();
  }, []);

  const displayedSessions = showAll ? sessions : sessions.slice(0, 3);

  if (sessions.length === 0) {
    return null; // Don't show section if no sessions
  }

  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-primary/30 rounded-2xl p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Video className="w-4 h-4" />
                Upcoming Live Sessions
              </div>
              <Button variant="hero" size="lg" asChild>
                <a href="https://rzp.io/rzp/Aigenxt2026" target="_blank" rel="noopener noreferrer">
                  <CalendarPlus className="mr-2" />
                  Enroll Now - ₹7,999
                </a>
              </Button>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              {displayedSessions.map((session, index) => (
                <div
                  key={session._id}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl transition-smooth ${index === 0
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-muted/50 hover:bg-muted"
                    }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm overflow-hidden flex-shrink-0 ${index === 0 ? "bg-primary shadow-primary/20" : "bg-muted-foreground/30"}`}>
                      {session.image ? (
                        <img src={session.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        session.avatar || "S"
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {index === 0 && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                            NEXT
                          </span>
                        )}
                        <h4 className={`font-semibold ${index === 0 ? "text-lg" : "text-base"}`}>
                          {session.topic}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-secondary" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {sessions.length > 3 && (
              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAll(!showAll)}
                  className="gap-2"
                >
                  {showAll ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View More Sessions ({sessions.length - 3} more) <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Footer Note */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              Free for enrolled students • New sessions added weekly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextSession;

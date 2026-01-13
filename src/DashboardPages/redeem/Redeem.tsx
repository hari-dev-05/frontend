import { useEffect, useState } from "react";
import axios from "axios";
import { Copy, Check, GraduationCap, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface RedeemItem {
  _id: string;
  user: string; // The "Other" person involved
  email: string;
  title: string;
  points: number;
  date: string;
}

interface RedeemStats {
  totalPoints: number;
  courseRedeems: RedeemItem[];
  webinarRedeems: RedeemItem[];
  refereeCourseRedeems: RedeemItem[];
  refereeWebinarRedeems: RedeemItem[];
}

const Redeem = () => {
  const [stats, setStats] = useState<RedeemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [redeemCode, setRedeemCode] = useState("");

  useEffect(() => {
    const fetchUsage = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      // 1. Fetch User (Code)
      try {
        const userRes = await axios.get(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRedeemCode(userRes.data.user.redeemCode);
      } catch (err) { }

      // 2. Fetch Usage
      try {
        const res = await axios.get(`${API}/api/auth/redeem-usage`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Fetch usage error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  const copyToClipboard = () => {
    if (!redeemCode) return;
    navigator.clipboard.writeText(redeemCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Code copied to clipboard!");
  };

  const handleClaim = () => {
    toast.info("Claim request sent! Admin will review.");
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading redeem data...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* TOP SECTION: CODE & TOTALS */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* 1. CODE CARD */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex-1 flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-4">Your Redeem Code</h2>
          <div className="flex items-center gap-3">
            <div className="bg-muted/30 border border-border px-4 py-2 rounded-lg font-mono text-xl tracking-widest font-bold select-all">
              {redeemCode || "LOADING..."}
            </div>
            <Button
              onClick={copyToClipboard}
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* 2. TOTAL CREDITS */}
        <div className="bg-gradient-to-br from-card to-muted/10 border border-border p-6 rounded-2xl shadow-sm flex-1 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-1">Total Earned</p>
            <p className="text-4xl font-black text-emerald-400">{stats?.totalPoints || 0} <span className="text-sm font-bold text-emerald-500/50">Pts</span></p>
          </div>
          <Button
            onClick={handleClaim}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            Claim Rewards
          </Button>
        </div>
      </div>

      <h3 className="text-lg font-bold uppercase text-muted-foreground tracking-wider mt-8">My Code Shared (Others Used)</h3>

      {/* ROW 1: MY CODE REDEEMS (30 / 10) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* 1. Referrer Course (30 Pts) */}
        <RedeemBox
          title="Course Redeems"
          icon={<GraduationCap className="w-5 h-5" />}
          pts={30}
          data={stats?.courseRedeems || []}
          colorClass="text-blue-400"
          headerColor="text-primary"
          bgHeader="bg-primary/5"
          colName="Student"
        />

        {/* 2. Referrer Webinar (10 Pts) */}
        <RedeemBox
          title="Webinar Redeems"
          icon={<MonitorPlay className="w-5 h-5" />}
          pts={10}
          data={stats?.webinarRedeems || []}
          colorClass="text-pink-400"
          headerColor="text-pink-500"
          bgHeader="bg-pink-500/5"
          colName="Attendee"
        />
      </div>

      <h3 className="text-lg font-bold uppercase text-muted-foreground tracking-wider mt-8">Codes I Used (I Used Others)</h3>

      {/* ROW 2: CODES I USED (15 / 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* 3. Referee Course (15 Pts) */}
        <RedeemBox
          title="Used Codes (Courses)"
          icon={<GraduationCap className="w-5 h-5" />}
          pts={15}
          data={stats?.refereeCourseRedeems || []}
          colorClass="text-blue-400"
          headerColor="text-blue-500"
          bgHeader="bg-blue-500/5"
          colName="Code Owner"
        />

        {/* 4. Referee Webinar (5 Pts) */}
        <RedeemBox
          title="Used Codes (Webinars)"
          icon={<MonitorPlay className="w-5 h-5" />}
          pts={5}
          data={stats?.refereeWebinarRedeems || []}
          colorClass="text-pink-400"
          headerColor="text-purple-500"
          bgHeader="bg-purple-500/5"
          colName="Code Owner"
        />
      </div>

    </div>
  );
};

// Reusable Component to avoid repetition
const RedeemBox = ({ title, icon, pts, data, colorClass, headerColor, bgHeader, colName }: any) => {
  return (
    <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-sm h-[400px]">
      <div className={`p-4 ${bgHeader} border-b border-border flex items-center justify-between`}>
        <div className={`flex items-center gap-2 font-bold ${headerColor}`}>
          {icon}
          {title}
        </div>
        <span className="text-xs font-mono bg-background px-2 py-1 rounded border opacity-75">{pts} Pts / Use</span>
      </div>

      <div className="overflow-y-auto flex-1 p-0 scrollbar-thin scrollbar-thumb-border">
        <table className="w-full text-left bg-transparent">
          <thead className="bg-muted/10 text-[10px] uppercase text-muted-foreground font-bold sticky top-0 backdrop-blur-md z-10">
            <tr>
              <th className="px-4 py-3">{colName}</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {data && data.length > 0 ? data.map((item: any) => (
              <tr key={item._id} className="hover:bg-muted/5 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{item.email}</p>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-[150px] truncate" title={item.title}>
                  {item.title}
                </td>
                <td className={`px-4 py-3 text-right font-bold ${colorClass}`}>+{item.points}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-muted-foreground opacity-50 text-sm">No activity yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Redeem;

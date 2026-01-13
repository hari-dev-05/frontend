import { useState, useEffect } from "react";
import { Trophy, Medal, Star, Crown } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MonthlyWinners = () => {
    const [recentWinners, setRecentWinners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fallbackWinners = [
        { name: "Priya Sharma", prize: "Gold Coin", month: "December 2024", avatar: "PS" },
        { name: "Rahul Kumar", prize: "Smartphone", month: "December 2024", avatar: "RK" },
        { name: "Anjali Patel", prize: "Headset", month: "December 2024", avatar: "AP" },
        { name: "Vikram Singh", prize: "Power Bank", month: "November 2024", avatar: "VS" },
    ];

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const res = await axios.get(`${API}/api/winners`);
                if (res.data && res.data.length > 0) {
                    setRecentWinners(res.data);
                } else {
                    setRecentWinners(fallbackWinners);
                }
            } catch (err) {
                setRecentWinners(fallbackWinners);
            } finally {
                setLoading(false);
            }
        };
        fetchWinners();
    }, []);

    if (loading) return null; // Or a subtle skeleton

    return (
        <section className="pt-16 pb-32 bg-gradient-to-r from-accent/5 to-primary/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                        <Trophy className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-accent">Recent Winners</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Monthly <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Prize Winners</span>
                    </h2>
                    <p className="text-muted-foreground">Congratulations to our recent winners!</p>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {recentWinners.map((winner, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border rounded-xl p-4 text-center hover:border-accent/50 transition-smooth group"
                        >
                            <div className="relative inline-block mb-3">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xl font-bold text-white overflow-hidden shadow-lg border-2 border-accent/20">
                                    {winner.image ? (
                                        <img
                                            src={winner.image}
                                            alt={winner.name}
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        winner.avatar
                                    )}
                                </div>
                                {index === 0 && (
                                    <Crown className="absolute -top-2 -right-2 w-6 h-6 text-accent" />
                                )}
                                {index === 1 && (
                                    <Medal className="absolute -top-2 -right-2 w-5 h-5 text-secondary" />
                                )}
                                {index === 2 && (
                                    <Star className="absolute -top-2 -right-2 w-5 h-5 text-primary" />
                                )}
                            </div>
                            <h4 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{winner.name}</h4>
                            <p className="text-xs text-primary font-medium mb-1">{winner.prize}</p>
                            <p className="text-xs text-muted-foreground">{winner.month}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MonthlyWinners;

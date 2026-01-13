import { Car, Trophy, Coins, Smartphone, Headphones, Battery, Award, Star, Sparkles } from "lucide-react";

const GrandPrize = () => {
    const monthlyPrizes = [
        {
            icon: Coins,
            title: "24K Gold Coins",
            description: "A mark of true excellence for top achievers.",
            color: "from-yellow-400 to-amber-600",
            glow: "shadow-yellow-500/20"
        },
        {
            icon: Smartphone,
            title: "Flagship Phones",
            description: "Stay ahead with the latest mobile technology.",
            color: "from-blue-500 to-indigo-600",
            glow: "shadow-blue-500/20"
        },
        {
            icon: Headphones,
            title: "Studio Headsets",
            description: "Immersive audio for focused learning.",
            color: "from-purple-500 to-fuchsia-600",
            glow: "shadow-purple-500/20"
        },
        {
            icon: Battery,
            title: "Power Stations",
            description: "Uninterrupted energy for your ambitions.",
            color: "from-emerald-400 to-teal-600",
            glow: "shadow-teal-500/20"
        },
        {
            icon: Award,
            title: "Pure Silver Coins",
            description: "Rewarding consistency and dedication.",
            color: "from-slate-300 to-slate-500",
            glow: "shadow-slate-400/20"
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden min-h-screen bg-[#020617] text-white">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b82f615,#00000000)] pointer-events-none"></div>
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-700"></div>

            <div className="container mx-auto px-4 relative z-10 font-inter">
                {/* Header Section */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-10 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:bg-white/10 transition-colors cursor-default">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">Exclusive Learning Rewards</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                        The Pinnacle of <br />
                        <span className="bg-gradient-to-r from-yellow-200 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                            Achievement
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Our most dedicated learners deserve more than just knowledge.
                        Join the elite and unlock prizes worth over <span className="text-white font-medium">₹25 Lakhs</span>.
                    </p>
                </div>

                {/* FEATURED: Grand Prize Card */}
                <div className="max-w-4xl mx-auto mb-32 relative group">
                    {/* Radial Glow Effect */}
                    <div className="absolute -inset-10 bg-gradient-to-r from-orange-600/20 via-yellow-500/20 to-amber-600/20 rounded-[3rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                    {/* The Card */}
                    <div className="relative bg-[#0a0f1e]/80 border border-white/10 rounded-[2.5rem] p-8 md:p-16 overflow-hidden backdrop-blur-xl transition-all duration-700 hover:border-orange-500/30 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-1000">
                        {/* Decorative Patterns */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

                        <div className="flex flex-col items-center text-center relative z-10">
                            {/* Icon Container */}
                            <div className="relative mb-8 group-hover:scale-110 transition-transform duration-700">
                                <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 animate-pulse"></div>
                                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-orange-500 to-yellow-400 flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-700 shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                                    <Car className="w-14 h-14 text-white drop-shadow-lg" />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-white text-black p-2 rounded-full shadow-xl animate-bounce">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="space-y-4 max-w-lg">
                                <h3 className="text-xs font-black tracking-[0.4em] uppercase text-orange-400">The Grand Prize</h3>
                                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                                    WIN A <br className="md:hidden" /> CAR
                                </h2>
                                <p className="text-xl text-slate-400 font-light italic">
                                    "The ultimate trophy for the student who redefines what's possible."
                                </p>
                            </div>

                            <div className="mt-12 w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 group/inner hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-bold tracking-tight">Final Event Quiz Winner</span>
                                </div>
                                <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <p className="text-sm text-slate-500 font-medium">Drive home elegance. Drive home victory.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Prizes Section */}
                <div className="relative py-20 border-t border-white/5">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Monthly Rewards</h2>
                        <p className="text-slate-500 font-light">Consistency is rewarded every step of the way.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                        {monthlyPrizes.map((prize, index) => {
                            const Icon = prize.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative h-full animate-in fade-in slide-in-from-bottom-10 duration-700"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="absolute inset-x-4 -bottom-2 h-10 bg-black/40 blur-xl"></div>
                                    <div className="relative h-full bg-[#0a0f1e] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:border-white/20 hover:bg-[#111827]">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prize.color} flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-orange-400 transition-colors">{prize.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed font-light">{prize.description}</p>

                                        {/* Corner Decoration */}
                                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
                                            <Trophy className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Stats Banner */}
                <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 text-center transition-all hover:border-white/10">
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
                        {[
                            { label: "Grand Prize", val: "Luxury Car" },
                            { label: "Monthly", val: "Gold Coins" },
                            { label: "Tech Gear", val: "Smartphones" },
                            { label: "Elite Rewards", val: "Plus More" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">{stat.label}</span>
                                <span className="text-2xl font-black tracking-tight">{stat.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrandPrize;


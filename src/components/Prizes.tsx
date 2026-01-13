import { Coins, Smartphone, Headphones, Battery, Award, Trophy } from "lucide-react";

const Prizes = () => {
  const prizes = [
    {
      icon: Coins,
      title: "Monthly Gold",
      prize: "Gold Coins",
      description: "One gold coin winner every month",
      color: "from-yellow-300 to-yellow-600",
      featured: false,
    },
    {
      icon: Smartphone,
      title: "Smartphones",
      prize: "Phones",
      description: "Win a smartphone every month",
      color: "from-blue-400 to-purple-500",
      featured: false,
    },
    {
      icon: Headphones,
      title: "Headsets",
      prize: "Headsets",
      description: "Premium headsets for monthly winners",
      color: "from-green-400 to-teal-500",
      featured: false,
    },
    {
      icon: Battery,
      title: "Power Banks",
      prize: "Power Banks",
      description: "Stay charged with monthly prizes",
      color: "from-pink-400 to-red-500",
      featured: false,
    },
    {
      icon: Award,
      title: "Silver Coins",
      prize: "Silver Coins",
      description: "Silver coin rewards every month",
      color: "from-gray-300 to-gray-500",
      featured: false,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-500">Monthly Prizes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Monthly Prize Winners
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Win exciting prizes every month throughout your learning journey!
          </p>
        </div>

        {/* Monthly Prizes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-smooth group hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${prize.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">{prize.prize}</h3>
                <p className="text-sm text-muted-foreground">{prize.description}</p>
              </div>
            );
          })}
        </div>

        {/* Total Prizes Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">🚗 1 Car</span>
            <span>•</span>
            <span className="flex items-center gap-1">🥇 Gold Coins</span>
            <span>•</span>
            <span className="flex items-center gap-1">📱 Smartphones</span>
            <span>•</span>
            <span className="flex items-center gap-1">🎧 Headsets</span>
            <span>•</span>
            <span className="flex items-center gap-1">🔋 Power Banks</span>
            <span>•</span>
            <span className="flex items-center gap-1">🥈 Silver Coins</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;

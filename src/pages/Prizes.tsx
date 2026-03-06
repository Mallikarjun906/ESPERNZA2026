import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";

const prizes = [
  {
    place: "1st",
    title: "Grand Champion",
    amount: "$25,000",
    icon: Trophy,
    perks: ["Cash Prize", "Internship Offers", "Mentorship Program", "Trophy & Certificate"],
    glowClass: "glow-accent",
    gradientClass: "gradient-text",
    scale: true,
  },
  {
    place: "2nd",
    title: "First Runner-Up",
    amount: "$15,000",
    icon: Medal,
    perks: ["Cash Prize", "Mentorship Access", "Certificate", "Swag Kit"],
    glowClass: "glow-purple",
    gradientClass: "gradient-text-secondary",
    scale: false,
  },
  {
    place: "3rd",
    title: "Second Runner-Up",
    amount: "$10,000",
    icon: Award,
    perks: ["Cash Prize", "Certificate", "Swag Kit", "Community Access"],
    glowClass: "glow-cyan",
    gradientClass: "gradient-text-secondary",
    scale: false,
  },
];

const PrizesPage = () => (
  <div className="section-padding animated-bg">
    <div className="container mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Prize <span className="gradient-text">Pool</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Over <span className="text-primary font-semibold">$500K+</span> in prizes across all events this season.
        </p>
      </motion.div>

      {/* Podium */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 mb-16">
        {/* 2nd place */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 text-center w-full md:w-72 order-2 md:order-1"
        >
          <Medal className="w-12 h-12 text-secondary mx-auto mb-4" />
          <div className="text-sm text-muted-foreground mb-1">2nd Place</div>
          <div className="text-3xl font-display font-bold gradient-text-secondary mb-2">$15,000</div>
          <h3 className="font-semibold mb-4">First Runner-Up</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {prizes[1].perks.map(p => <li key={p} className="flex items-center gap-2"><Star size={10} className="text-secondary" /> {p}</li>)}
          </ul>
        </motion.div>

        {/* 1st place */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 text-center w-full md:w-80 glow-accent order-1 md:order-2 md:-mb-6"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-accent text-accent-foreground">
            GRAND PRIZE
          </div>
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4 mt-4" />
          <div className="text-sm text-muted-foreground mb-1">1st Place</div>
          <div className="text-4xl font-display font-bold gradient-text mb-2">$25,000</div>
          <h3 className="font-semibold mb-4">Grand Champion</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {prizes[0].perks.map(p => <li key={p} className="flex items-center gap-2"><Star size={10} className="text-accent" /> {p}</li>)}
          </ul>
        </motion.div>

        {/* 3rd place */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 text-center w-full md:w-72 order-3"
        >
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <div className="text-sm text-muted-foreground mb-1">3rd Place</div>
          <div className="text-3xl font-display font-bold gradient-text-secondary mb-2">$10,000</div>
          <h3 className="font-semibold mb-4">Second Runner-Up</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {prizes[2].perks.map(p => <li key={p} className="flex items-center gap-2"><Star size={10} className="text-primary" /> {p}</li>)}
          </ul>
        </motion.div>
      </div>

      {/* Additional prizes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { title: "Best Innovation", prize: "$5,000" },
          { title: "Best Design", prize: "$3,000" },
          { title: "People's Choice", prize: "$2,000" },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6 text-center">
            <div className="text-sm text-muted-foreground mb-1">{item.title}</div>
            <div className="text-xl font-display font-bold gradient-text">{item.prize}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default PrizesPage;

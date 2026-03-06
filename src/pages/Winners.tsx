import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useAppContext, EVENT_LABELS, EventCategory } from "@/context/AppContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const WinnersPage = () => {
  const { winners, winnersAnnounced } = useAppContext();
  const eventCategories = Object.keys(EVENT_LABELS) as EventCategory[];

  return (
    <div className="section-padding animated-bg py-24">
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Hall of <span className="gradient-text">Fame</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Celebrating the champions who pushed boundaries and emerged victorious.
          </p>
        </motion.div>

        {!winnersAnnounced ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2 text-muted-foreground">Winners Not Yet Announced</h2>
            <p className="text-sm text-muted-foreground">Stay tuned! Winners will be announced soon by the HOD.</p>
          </motion.div>
        ) : (
          eventCategories.map((event) => {
            const eventWinners = winners.filter((w) => w.event === event);
            if (eventWinners.length === 0) return null;
            return (
              <div key={event} className="mb-12">
                <h2 className="text-2xl font-display font-bold mb-6 text-center gradient-text">{EVENT_LABELS[event]}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {eventWinners.map((w, i) => (
                    <motion.div
                      key={w.participant.id}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className={`glass-card p-6 text-center ${w.place === "1st" ? "border-yellow-500/30 sm:order-2 sm:-mt-4" : w.place === "2nd" ? "border-gray-400/30 sm:order-1" : "border-orange-600/30 sm:order-3"}`}
                    >
                      <div className="text-4xl mb-3">
                        {w.place === "1st" ? "🥇" : w.place === "2nd" ? "🥈" : "🥉"}
                      </div>
                      <h3 className="font-display font-semibold text-lg">{w.participant.teamName}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{w.participant.member1Name} & {w.participant.member2Name}</p>
                      <p className="text-sm text-primary mt-2 font-bold">{w.totalMarks} points</p>
                      <p className="text-xs text-muted-foreground mt-1">{w.participant.collegeName}</p>
                      <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
                        🏆 {w.place} Place
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WinnersPage;

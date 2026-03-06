import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, LogOut, Users, Trophy } from "lucide-react";
import { useAppContext, EVENT_LABELS, EventCategory } from "@/context/AppContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const HODPanel = () => {
  const { currentUser, participants, marks, submittedToHOD, winners, announceWinners, winnersAnnounced, logout } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"participants" | "winners">("participants");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "hod") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== "hod") return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAnnounce = () => {
    announceWinners();
    toast.success("Winners announced! Check the Winners page.");
  };

  const eventCategories = Object.keys(EVENT_LABELS) as EventCategory[];

  return (
    <div className="min-h-screen section-padding animated-bg py-24">
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">HOD Panel</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome, {currentUser.name}</p>
          </div>
          <button onClick={handleLogout} className="btn-outline-glow text-sm !px-4 !py-2 inline-flex items-center gap-2">
            <LogOut size={14} /> Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab("participants")} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "participants" ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`}>
            <Users size={14} className="inline mr-2" /> All Participants
          </button>
          <button onClick={() => setActiveTab("winners")} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "winners" ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`}>
            <Trophy size={14} className="inline mr-2" /> Winners
          </button>
        </div>

        {activeTab === "participants" && (
          <>
            {eventCategories.map((event) => {
              const eventParticipants = participants.filter((p) => p.event === event);
              if (eventParticipants.length === 0) return null;
              const isSubmitted = submittedToHOD[event];

              return (
                <motion.div key={event} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card mb-6 overflow-hidden">
                  <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <h2 className="font-display font-semibold text-lg">
                      {EVENT_LABELS[event]}
                      {isSubmitted && <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Marks Received</span>}
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left p-3 text-muted-foreground font-medium">#</th>
                          <th className="text-left p-3 text-muted-foreground font-medium">Team</th>
                          <th className="text-left p-3 text-muted-foreground font-medium">Members</th>
                          <th className="text-left p-3 text-muted-foreground font-medium">College</th>
                          <th className="text-center p-3 text-muted-foreground font-medium">R1</th>
                          <th className="text-center p-3 text-muted-foreground font-medium">R2</th>
                          <th className="text-center p-3 text-muted-foreground font-medium">R3</th>
                          <th className="text-center p-3 text-muted-foreground font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventParticipants.map((p, i) => {
                          const m = marks[p.id];
                          return (
                            <tr key={p.id} className="border-b border-border/20 hover:bg-muted/20">
                              <td className="p-3 text-muted-foreground">{i + 1}</td>
                              <td className="p-3 font-medium">{p.teamName}</td>
                              <td className="p-3 text-muted-foreground text-xs">{p.member1Name}, {p.member2Name}</td>
                              <td className="p-3 text-muted-foreground">{p.collegeName}</td>
                              <td className="p-3 text-center">{m?.round1 ?? "-"}</td>
                              <td className="p-3 text-center">{m?.round2 ?? "-"}</td>
                              <td className="p-3 text-center">{m?.round3 ?? "-"}</td>
                              <td className="p-3 text-center font-bold text-primary">{m?.total ?? "-"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              );
            })}

            {!winnersAnnounced && (
              <div className="text-center mt-8">
                <button onClick={handleAnnounce} className="btn-gradient inline-flex items-center gap-2 text-sm !px-8 !py-3">
                  <Award size={16} /> Announce Winners
                </button>
              </div>
            )}
            {winnersAnnounced && (
              <div className="text-center mt-8">
                <p className="text-green-400 font-semibold">✓ Winners have been announced!</p>
                <button onClick={() => navigate("/winners")} className="mt-3 btn-outline-glow text-sm !px-6 !py-2">View Winners Page</button>
              </div>
            )}
          </>
        )}

        {activeTab === "winners" && (
          <div className="glass-card p-6">
            {!winnersAnnounced ? (
              <p className="text-center text-muted-foreground py-8">Winners have not been announced yet.</p>
            ) : (
              <div className="space-y-6">
                {eventCategories.map((event) => {
                  const eventWinners = winners.filter((w) => w.event === event);
                  if (eventWinners.length === 0) return null;
                  return (
                    <div key={event}>
                      <h3 className="font-display font-semibold text-primary mb-3">{EVENT_LABELS[event]}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {eventWinners.map((w) => (
                          <div key={w.participant.id} className="bg-muted/30 rounded-lg p-4 border border-border/30 text-center">
                            <span className="text-2xl">{w.place === "1st" ? "🥇" : w.place === "2nd" ? "🥈" : "🥉"}</span>
                            <p className="font-semibold mt-2">{w.participant.teamName}</p>
                            <p className="text-xs text-muted-foreground">{w.participant.collegeName}</p>
                            <p className="text-sm text-primary font-bold mt-1">{w.totalMarks} pts</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HODPanel;

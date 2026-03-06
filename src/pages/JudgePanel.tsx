import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, LogOut, Send } from "lucide-react";
import { useAppContext, EVENT_LABELS, EventCategory } from "@/context/AppContext";
import { toast } from "sonner";
import { useEffect } from "react";

const JudgePanel = () => {
  const { currentUser, participants, marks, setMarksForParticipant, submitMarks, submitToHOD, submittedToHOD, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role === "hod") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role === "hod") return null;

  const event = currentUser.role as EventCategory;
  const eventParticipants = participants.filter((p) => p.event === event);
  const allSubmitted = eventParticipants.every((p) => marks[p.id]?.submitted);
  const hodSubmitted = submittedToHOD[event];

  const handleSubmitToHOD = () => {
    submitToHOD(event);
    toast.success("Marks submitted to HOD!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen section-padding animated-bg py-24">
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">
              <span className="gradient-text">{EVENT_LABELS[event]}</span> Judge Panel
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome, {currentUser.name}</p>
          </div>
          <button onClick={handleLogout} className="btn-outline-glow text-sm !px-4 !py-2 inline-flex items-center gap-2">
            <LogOut size={14} /> Logout
          </button>
        </motion.div>

        {hodSubmitted ? (
          <div className="glass-card p-8 text-center">
            <ClipboardCheck className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2">Marks Submitted to HOD</h2>
            <p className="text-muted-foreground">Your marks have been submitted. Waiting for HOD to announce winners.</p>
          </div>
        ) : (
          <>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-semibold text-muted-foreground">#</th>
                      <th className="text-left p-4 font-semibold text-muted-foreground">Team</th>
                      <th className="text-left p-4 font-semibold text-muted-foreground">Members</th>
                      <th className="text-left p-4 font-semibold text-muted-foreground">College</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Round 1</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Round 2</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Round 3</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Total</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventParticipants.map((p, i) => {
                      const m = marks[p.id] || { round1: null, round2: null, round3: null, total: 0, submitted: false };
                      return (
                        <tr key={p.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                          <td className="p-4 text-muted-foreground">{i + 1}</td>
                          <td className="p-4 font-medium">{p.teamName}</td>
                          <td className="p-4 text-muted-foreground text-xs">
                            {p.member1Name}<br />{p.member2Name}
                          </td>
                          <td className="p-4 text-muted-foreground">{p.collegeName}</td>
                          {(["round1", "round2", "round3"] as const).map((round) => (
                            <td key={round} className="p-4 text-center">
                              {m.submitted ? (
                                <span className="text-primary font-semibold">{m[round] ?? "-"}</span>
                              ) : (
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={m[round] ?? ""}
                                  onChange={(e) => setMarksForParticipant(p.id, round, Number(e.target.value))}
                                  className="w-16 bg-muted/50 border border-border rounded px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                  placeholder="0"
                                />
                              )}
                            </td>
                          ))}
                          <td className="p-4 text-center font-bold text-primary">{m.total}</td>
                          <td className="p-4 text-center">
                            {m.submitted ? (
                              <span className="text-xs text-green-400 font-medium">✓ Saved</span>
                            ) : (
                              <button
                                onClick={() => {
                                  if (m.round1 != null && m.round2 != null && m.round3 != null) {
                                    submitMarks(p.id);
                                    toast.success(`Marks saved for ${p.teamName}`);
                                  } else {
                                    toast.error("Please fill all 3 rounds");
                                  }
                                }}
                                className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors font-medium"
                              >
                                Submit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {allSubmitted && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
                <button onClick={handleSubmitToHOD} className="btn-gradient inline-flex items-center gap-2 text-sm !px-8 !py-3">
                  <Send size={16} /> Submit All Marks to HOD
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JudgePanel;

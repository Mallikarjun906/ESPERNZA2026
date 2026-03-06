import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useAppContext, EventCategory, EVENT_LABELS } from "@/context/AppContext";
import { toast } from "sonner";

const RegisterPage = () => {
  const { addParticipant } = useAppContext();
  const [form, setForm] = useState({
    teamName: "",
    member1Name: "",
    member1Phone: "",
    member1Email: "",
    member2Name: "",
    member2Phone: "",
    member2Email: "",
    collegeName: "",
    event: "quiz" as EventCategory,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "p_" + Date.now();
    addParticipant({ id, ...form });
    toast.success("Team registered successfully!");
    setForm({ teamName: "", member1Name: "", member1Phone: "", member1Email: "", member2Name: "", member2Phone: "", member2Email: "", collegeName: "", event: "quiz" });
  };

  const inputClass = "w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center section-padding animated-bg py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold gradient-text mb-2">Participant Registration</h1>
          <p className="text-sm text-muted-foreground">Register your team for Esperenza events</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Team Name</label>
              <input type="text" required value={form.teamName} onChange={e => setForm({ ...form, teamName: e.target.value })} className={inputClass} placeholder="Enter team name" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Event Category</label>
              <select required value={form.event} onChange={e => setForm({ ...form, event: e.target.value as EventCategory })} className={inputClass}>
                {(Object.keys(EVENT_LABELS) as EventCategory[]).map(key => (
                  <option key={key} value={key}>{EVENT_LABELS[key]}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-primary mb-3">— Participant 1 —</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <input type="text" required value={form.member1Name} onChange={e => setForm({ ...form, member1Name: e.target.value })} className={inputClass} placeholder="Full name" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <input type="tel" required value={form.member1Phone} onChange={e => setForm({ ...form, member1Phone: e.target.value })} className={inputClass} placeholder="Phone number" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input type="email" required value={form.member1Email} onChange={e => setForm({ ...form, member1Email: e.target.value })} className={inputClass} placeholder="Email address" />
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-primary mb-3">— Participant 2 —</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <input type="text" required value={form.member2Name} onChange={e => setForm({ ...form, member2Name: e.target.value })} className={inputClass} placeholder="Full name" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <input type="tel" required value={form.member2Phone} onChange={e => setForm({ ...form, member2Phone: e.target.value })} className={inputClass} placeholder="Phone number" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input type="email" required value={form.member2Email} onChange={e => setForm({ ...form, member2Email: e.target.value })} className={inputClass} placeholder="Email address" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">College Name</label>
              <input type="text" required value={form.collegeName} onChange={e => setForm({ ...form, collegeName: e.target.value })} className={inputClass} placeholder="College / University name" />
            </div>
          </div>

          <button type="submit" className="btn-gradient w-full inline-flex items-center justify-center gap-2">
            Register Team <UserPlus size={16} />
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Are you a judge?{" "}
          <Link to="/login" className="text-primary hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";

const LoginPage = () => {
  const [form, setForm] = useState({ id: "", password: "" });
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(form.id, form.password);
    if (user) {
      toast.success(`Welcome, ${user.name}!`);
      if (user.role === "hod") {
        navigate("/hod-panel");
      } else {
        navigate("/judge-panel");
      }
    } else {
      toast.error("Invalid credentials!");
    }
  };

  const inputClass = "w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center section-padding animated-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold gradient-text mb-2">Judge Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to access your judge panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Judge ID</label>
            <input type="text" required value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} className={inputClass} placeholder="e.g. quiz_judge" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className={inputClass} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-gradient w-full inline-flex items-center justify-center gap-2">
            Sign In <LogIn size={16} />
          </button>
        </form>

        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-xs font-semibold text-primary mb-2">Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
            <span>quiz_judge / quiz123</span>
            <span>web_judge / web123</span>
            <span>code_judge / code123</span>
            <span>debate_judge / debate123</span>
            <span>photo_judge / photo123</span>
            <span>game_judge / game123</span>
            <span>robo_judge / robo123</span>
            <span>hod / hod123</span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Want to register a team?{" "}
          <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Calendar, Users, Trophy, Zap, ArrowRight, MapPin,
  Medal, Award, Star, Mail, Phone, Send, Target, Eye
} from "lucide-react";
import { useAppContext, EVENT_LABELS, EventCategory } from "@/context/AppContext";

/* ── Stats Counter ── */
const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = target / (2000 / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="text-3xl md:text-4xl font-display font-bold gradient-text">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

/* ── 3D Section Wrapper ── */
const Section3D = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, rotateX: 8, scale: 0.92, y: 80 }}
      animate={isInView
        ? { opacity: 1, rotateX: 0, scale: 1, y: 0 }
        : { opacity: 0, rotateX: 8, scale: 0.92, y: 80 }
      }
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className="section-padding"
    >
      {children}
    </motion.section>
  );
};

/* ── Data ── */
const stats = [
  { icon: Calendar, label: "Events", target: 150, suffix: "+" },
  { icon: Users, label: "Participants", target: 12000, suffix: "+" },
  { icon: Trophy, label: "Winners", target: 800, suffix: "+" },
  { icon: Zap, label: "Prize Pool", target: 500, suffix: "K+" },
];

const events = [
  { title: "HackVerse 2026", date: "Apr 15-17, 2026", location: "Virtual", tag: "Hackathon", desc: "Build innovative solutions in 48 hours with 500+ developers worldwide." },
  { title: "AI Summit", date: "May 8, 2026", location: "San Francisco", tag: "Conference", desc: "Explore cutting-edge AI research and network with industry leaders." },
  { title: "Code Arena Championship", date: "Jun 1, 2026", location: "Online", tag: "Competition", desc: "Test your algorithmic skills against the best competitive programmers." },
  { title: "Design Sprint Challenge", date: "Jun 20, 2026", location: "New York", tag: "Design", desc: "72-hour product design challenge with real-world problems." },
  { title: "Blockchain Buildathon", date: "Jul 5-7, 2026", location: "Virtual", tag: "Hackathon", desc: "Create decentralized applications on leading blockchain platforms." },
  { title: "Robotics Showdown", date: "Aug 12, 2026", location: "Tokyo", tag: "Competition", desc: "Showcase your robotics engineering in head-to-head challenges." },
  { title: "Cyber Security CTF", date: "Sep 3, 2026", location: "Online", tag: "CTF", desc: "Capture the flag competition for security enthusiasts." },
  { title: "Data Science Bowl", date: "Oct 10, 2026", location: "London", tag: "Competition", desc: "Solve real-world data challenges with machine learning." },
];

const tagColors: Record<string, string> = {
  Hackathon: "text-secondary bg-secondary/10",
  Conference: "text-primary bg-primary/10",
  Competition: "text-accent bg-accent/10",
  Design: "text-foreground bg-muted",
  CTF: "text-secondary bg-secondary/10",
};

const prizes = [
  { place: "1st", title: "Grand Champion", amount: "$25,000", perks: ["Cash Prize", "Internship Offers", "Mentorship Program", "Trophy & Certificate"] },
  { place: "2nd", title: "First Runner-Up", amount: "$15,000", perks: ["Cash Prize", "Mentorship Access", "Certificate", "Swag Kit"] },
  { place: "3rd", title: "Second Runner-Up", amount: "$10,000", perks: ["Cash Prize", "Certificate", "Swag Kit", "Community Access"] },
];

const team = [
  { name: "Anika Sharma", role: "Founder & CEO" },
  { name: "Marcus Lee", role: "CTO" },
  { name: "Priya Desai", role: "Head of Events" },
  { name: "Jordan Blake", role: "Design Lead" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ── Main Page ── */
const Index = () => {
  const { winners, winnersAnnounced } = useAppContext();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo only)");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ perspective: "1200px" }}>
      {/* ═══ HERO ═══ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center animated-bg overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-accent/5 blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary bg-primary/5 mb-6">
              🚀 Season 2026 Now Open
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              <span className="gradient-text">ESPERENZA EVENT</span>
              <br />
              <span className="text-foreground/80 text-2xl sm:text-3xl md:text-4xl font-light">
                Innovate, Compete, Win
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed">
              Join the most exciting hackathons, tech competitions, and innovation challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#events" className="btn-gradient inline-flex items-center gap-2 justify-center">
                Explore Events <ArrowRight size={18} />
              </a>
              <Link to="/register" className="btn-outline-glow inline-flex items-center gap-2 justify-center">
                Register Now
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══ STATS ═══ */}
      <Section3D id="stats">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-card p-4 sm:p-5 md:p-6 text-center">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <Counter target={stat.target} suffix={stat.suffix} />
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section3D>

      {/* ═══ EVENTS ═══ */}
      <Section3D id="events">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse our curated selection of hackathons, competitions, and tech events.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event, i) => (
              <motion.div key={event.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-card p-6 flex flex-col">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full self-start mb-4 ${tagColors[event.tag] || "text-muted-foreground bg-muted"}`}>
                  {event.tag}
                </span>
                <h3 className="text-lg font-display font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Calendar size={12} /> {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <MapPin size={12} /> {event.location}
                </div>
                <p className="text-sm text-muted-foreground flex-1 mb-4">{event.desc}</p>
                <Link to="/register" className="btn-gradient text-sm text-center !py-2 !px-4 inline-flex items-center justify-center gap-1">
                  Register <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section3D>

      {/* ═══ PRIZES ═══ */}
      <Section3D id="prizes">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Prize <span className="gradient-text">Pool</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Over <span className="text-primary font-semibold">$500K+</span> in prizes across all events this season.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 mb-16">
            {/* 2nd */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-8 text-center w-full md:w-72 order-2 md:order-1">
              <Medal className="w-12 h-12 text-secondary mx-auto mb-4" />
              <div className="text-sm text-muted-foreground mb-1">2nd Place</div>
              <div className="text-3xl font-display font-bold gradient-text-secondary mb-2">$15,000</div>
              <h3 className="font-semibold mb-4">First Runner-Up</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {prizes[1].perks.map(p => <li key={p} className="flex items-center gap-2"><Star size={10} className="text-secondary" /> {p}</li>)}
              </ul>
            </motion.div>
            {/* 1st */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8 text-center w-full md:w-80 glow-accent order-1 md:order-2 md:-mb-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-accent text-accent-foreground">GRAND PRIZE</div>
              <Trophy className="w-16 h-16 text-accent mx-auto mb-4 mt-4" />
              <div className="text-sm text-muted-foreground mb-1">1st Place</div>
              <div className="text-4xl font-display font-bold gradient-text mb-2">$25,000</div>
              <h3 className="font-semibold mb-4">Grand Champion</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {prizes[0].perks.map(p => <li key={p} className="flex items-center gap-2"><Star size={10} className="text-accent" /> {p}</li>)}
              </ul>
            </motion.div>
            {/* 3rd */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-card p-8 text-center w-full md:w-72 order-3">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-sm text-muted-foreground mb-1">3rd Place</div>
              <div className="text-3xl font-display font-bold gradient-text-secondary mb-2">$10,000</div>
              <h3 className="font-semibold mb-4">Second Runner-Up</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {prizes[2].perks.map(p => <li key={p} className="flex items-center gap-2"><Star size={10} className="text-primary" /> {p}</li>)}
              </ul>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{ title: "Best Innovation", prize: "$5,000" }, { title: "Best Design", prize: "$3,000" }, { title: "People's Choice", prize: "$2,000" }].map((item) => (
              <div key={item.title} className="glass-card p-6 text-center">
                <div className="text-sm text-muted-foreground mb-1">{item.title}</div>
                <div className="text-xl font-display font-bold gradient-text">{item.prize}</div>
              </div>
            ))}
          </div>
        </div>
      </Section3D>

      {/* ═══ WINNERS ═══ */}
      <Section3D id="winners">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Hall of <span className="gradient-text">Fame</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Celebrating the champions who pushed boundaries and emerged victorious.
            </p>
          </div>
          {!winnersAnnounced ? (
            <div className="glass-card p-12 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold mb-2 text-muted-foreground">Winners Not Yet Announced</h3>
              <p className="text-sm text-muted-foreground">Stay tuned! Winners will be announced soon by the HOD.</p>
            </div>
          ) : (
            (Object.keys(EVENT_LABELS) as EventCategory[]).map((event) => {
              const eventWinners = winners.filter((w) => w.event === event);
              if (eventWinners.length === 0) return null;
              return (
                <div key={event} className="mb-12">
                  <h3 className="text-2xl font-display font-bold mb-6 text-center gradient-text">{EVENT_LABELS[event]}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    {eventWinners.map((w, i) => (
                      <motion.div key={w.participant.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className={`glass-card p-6 text-center ${w.place === "1st" ? "border-yellow-500/30 sm:order-2 sm:-mt-4" : w.place === "2nd" ? "border-gray-400/30 sm:order-1" : "border-orange-600/30 sm:order-3"}`}
                      >
                        <div className="text-4xl mb-3">{w.place === "1st" ? "🥇" : w.place === "2nd" ? "🥈" : "🥉"}</div>
                        <h4 className="font-display font-semibold text-lg">{w.participant.teamName}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{w.participant.member1Name} & {w.participant.member2Name}</p>
                        <p className="text-sm text-primary mt-2 font-bold">{w.totalMarks} points</p>
                        <p className="text-xs text-muted-foreground mt-1">{w.participant.collegeName}</p>
                        <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">🏆 {w.place} Place</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Section3D>

      {/* ═══ ABOUT ═══ */}
      <Section3D id="about">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              About <span className="gradient-text">Esperenza</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Esperenza Event is the premier platform for hackathons, tech competitions, and innovation challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-display font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">To democratize access to tech competitions and create a global community where innovation thrives.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <Eye className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-xl font-display font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">To become the world's most trusted event platform, hosting 1000+ events annually.</p>
            </motion.div>
          </div>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-display font-bold mb-2">Meet the <span className="gradient-text">Team</span></h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-display font-semibold">{t.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section3D>

      {/* ═══ CONTACT ═══ */}
      <Section3D id="contact">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Contact <span className="gradient-text">Us</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Have questions? We'd love to hear from you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.form onSubmit={handleContactSubmit} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <input type="text" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea required rows={4} value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-gradient w-full inline-flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </button>
            </motion.form>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@esperenza.io" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Address", value: "123 Innovation Drive, San Francisco, CA" },
              ].map((item) => (
                <div key={item.label} className="glass-card p-6 flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
              <div className="glass-card p-6">
                <div className="text-sm font-medium mb-3">Follow Us</div>
                <div className="flex flex-wrap gap-2">
                  {["Twitter", "Discord", "GitHub", "LinkedIn"].map((s) => (
                    <span key={s} className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section3D>

      {/* ═══ SPONSORS ═══ */}
      <section className="section-padding border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-8">Trusted by Leading Partners</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
            {["TechCorp", "InnovateLab", "CloudBase", "DevForge", "QuantumAI"].map((name) => (
              <span key={name} className="text-xl md:text-2xl font-display font-bold text-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

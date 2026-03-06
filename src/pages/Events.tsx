import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.02,
      duration: 0.18,
      ease: "easeOut",
    },
  }),
};

const EventsPage = () => (
  <div className="section-padding animated-bg">
    <div className="container mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Upcoming <span className="gradient-text">Events</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Browse our curated selection of hackathons, competitions, and tech events.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, i) => (
          <motion.div
            key={event.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-6 flex flex-col"
          >
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
  </div>
);

export default EventsPage;

import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";

const team = [
  { name: "Anika Sharma", role: "Founder & CEO" },
  { name: "Marcus Lee", role: "CTO" },
  { name: "Priya Desai", role: "Head of Events" },
  { name: "Jordan Blake", role: "Design Lead" },
];

const AboutPage = () => (
  <div className="section-padding animated-bg">
    <div className="container mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          About <span className="gradient-text">Esperenza</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Esperenza Event is the premier platform for hackathons, tech competitions, and innovation challenges.
          We connect talented individuals with opportunities to learn, build, and grow through hands-on experience.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
          <Target className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-display font-bold mb-3">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To democratize access to tech competitions and create a global community where innovation thrives.
            We believe every developer, designer, and creator deserves a stage to showcase their talent.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
          <Eye className="w-10 h-10 text-secondary mb-4" />
          <h3 className="text-xl font-display font-bold mb-3">Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            To become the world's most trusted event platform, hosting 1000+ events annually and empowering
            millions of participants to turn ideas into reality.
          </p>
        </motion.div>
      </div>

      {/* Team */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold mb-2">
          Meet the <span className="gradient-text">Team</span>
        </h2>
        <p className="text-muted-foreground">The passionate people behind Esperenza.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold">{t.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;

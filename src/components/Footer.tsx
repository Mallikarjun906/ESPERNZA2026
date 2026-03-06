import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dev1 from "@/assets/dev1.jpg";
import dev2 from "@/assets/dev2.jpg";
import dev3 from "@/assets/dev3.jpg";
import dev4 from "@/assets/dev4.jpg";

const developers = [
  { name: "Mallikarjun Badiger", img: dev1 },
  { name: "Prajwal Umarani", img: dev2 },
  { name: "Akash Galgali", img: dev3 },
  { name: "Vikas Galgali", img: dev4 },
];

const Footer = () => (
  <>
    {/* Developers Section */}
    <section className="border-t border-border/50 bg-muted/10 py-10">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-8">Developers</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {developers.map((dev, i) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <img
                src={dev.img}
                alt={dev.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-primary/30 shadow-lg"
              />
              <span className="text-sm font-medium text-foreground">{dev.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <footer className="border-t border-border/50 bg-muted/20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-display font-bold gradient-text mb-4">ESPERENZA</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The premier platform for hackathons, tech competitions, and innovation events.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
            <Link to="/prizes" className="hover:text-primary transition-colors">Prizes</Link>
            <Link to="/winners" className="hover:text-primary transition-colors">Winners</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Support</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <span>FAQ</span>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Connect</h4>
          <div className="flex gap-3">
            {["Twitter", "Discord", "GitHub", "LinkedIn"].map((s) => (
              <span key={s} className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © 2026 Esperenza Event. All rights reserved.
      </div>
    </div>
  </footer>
  </>
);

export default Footer;

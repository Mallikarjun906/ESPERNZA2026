import React, { createContext, useContext, useState, ReactNode } from "react";

export type EventCategory = "quiz" | "web_design" | "coding" | "debate" | "photography" | "gaming" | "robotics" | "paper_presentation";

export const EVENT_LABELS: Record<EventCategory, string> = {
  quiz: "Quiz",
  web_design: "Web Design",
  coding: "Coding",
  debate: "Debate",
  photography: "Photography",
  gaming: "Gaming",
  robotics: "Robotics",
  paper_presentation: "Paper Presentation",
};

export interface Participant {
  id: string;
  teamName: string;
  member1Name: string;
  member1Phone: string;
  member1Email: string;
  member2Name: string;
  member2Phone: string;
  member2Email: string;
  collegeName: string;
  event: EventCategory;
}

export interface Marks {
  participantId: string;
  round1: number | null;
  round2: number | null;
  round3: number | null;
  total: number;
  submitted: boolean;
}

export interface JudgeUser {
  id: string;
  password: string;
  role: EventCategory | "hod";
  name: string;
}

export interface Winner {
  participant: Participant;
  totalMarks: number;
  place: "1st" | "2nd" | "3rd";
  event: EventCategory;
}

const JUDGES: JudgeUser[] = [
  { id: "quiz_judge", password: "quiz123", role: "quiz", name: "Dr. Sharma" },
  { id: "web_judge", password: "web123", role: "web_design", name: "Prof. Kumar" },
  { id: "code_judge", password: "code123", role: "coding", name: "Dr. Reddy" },
  { id: "debate_judge", password: "debate123", role: "debate", name: "Prof. Iyer" },
  { id: "photo_judge", password: "photo123", role: "photography", name: "Dr. Nair" },
  { id: "game_judge", password: "game123", role: "gaming", name: "Prof. Das" },
  { id: "robo_judge", password: "robo123", role: "robotics", name: "Dr. Gupta" },
  { id: "hod", password: "hod123", role: "hod", name: "Dr. Principal" },
];

const DUMMY_PARTICIPANTS: Participant[] = [
  { id: "p1", teamName: "Code Warriors", member1Name: "Aarav Mehta", member1Phone: "9876543210", member1Email: "aarav@mail.com", member2Name: "Priya Singh", member2Phone: "9876543211", member2Email: "priya@mail.com", collegeName: "IIT Delhi", event: "quiz" },
  { id: "p2", teamName: "Binary Brains", member1Name: "Rohan Joshi", member1Phone: "9876543212", member1Email: "rohan@mail.com", member2Name: "Sneha Rao", member2Phone: "9876543213", member2Email: "sneha@mail.com", collegeName: "NIT Trichy", event: "quiz" },
  { id: "p3", teamName: "Pixel Perfect", member1Name: "Kiran Desai", member1Phone: "9876543214", member1Email: "kiran@mail.com", member2Name: "Ananya Patel", member2Phone: "9876543215", member2Email: "ananya@mail.com", collegeName: "BITS Pilani", event: "web_design" },
  { id: "p4", teamName: "Design Dynamos", member1Name: "Vikram Choudhary", member1Phone: "9876543216", member1Email: "vikram@mail.com", member2Name: "Meera Kapoor", member2Phone: "9876543217", member2Email: "meera@mail.com", collegeName: "VIT Vellore", event: "web_design" },
  { id: "p5", teamName: "Algo Aces", member1Name: "Siddharth Nair", member1Phone: "9876543218", member1Email: "sid@mail.com", member2Name: "Divya Sharma", member2Phone: "9876543219", member2Email: "divya@mail.com", collegeName: "IIIT Hyderabad", event: "coding" },
  { id: "p6", teamName: "Stack Overflow", member1Name: "Arjun Verma", member1Phone: "9876543220", member1Email: "arjun@mail.com", member2Name: "Neha Gupta", member2Phone: "9876543221", member2Email: "neha@mail.com", collegeName: "DTU Delhi", event: "coding" },
  { id: "p7", teamName: "Voice of Truth", member1Name: "Rahul Iyer", member1Phone: "9876543222", member1Email: "rahul@mail.com", member2Name: "Pooja Menon", member2Phone: "9876543223", member2Email: "pooja@mail.com", collegeName: "SRM Chennai", event: "debate" },
  { id: "p8", teamName: "Debate Kings", member1Name: "Aditya Rao", member1Phone: "9876543224", member1Email: "aditya@mail.com", member2Name: "Lakshmi Das", member2Phone: "9876543225", member2Email: "lakshmi@mail.com", collegeName: "Anna University", event: "debate" },
  { id: "p9", teamName: "Shutter Stars", member1Name: "Manish Pillai", member1Phone: "9876543226", member1Email: "manish@mail.com", member2Name: "Kavya Reddy", member2Phone: "9876543227", member2Email: "kavya@mail.com", collegeName: "Manipal University", event: "photography" },
  { id: "p10", teamName: "Lens Masters", member1Name: "Suresh Kumar", member1Phone: "9876543228", member1Email: "suresh@mail.com", member2Name: "Ritu Sharma", member2Phone: "9876543229", member2Email: "ritu@mail.com", collegeName: "Amity University", event: "photography" },
  { id: "p11", teamName: "Game Changers", member1Name: "Deepak Mishra", member1Phone: "9876543230", member1Email: "deepak@mail.com", member2Name: "Swati Jain", member2Phone: "9876543231", member2Email: "swati@mail.com", collegeName: "LPU Punjab", event: "gaming" },
  { id: "p12", teamName: "Pro Gamers", member1Name: "Nikhil Pandey", member1Phone: "9876543232", member1Email: "nikhil@mail.com", member2Name: "Tanvi Agarwal", member2Phone: "9876543233", member2Email: "tanvi@mail.com", collegeName: "Christ University", event: "gaming" },
  { id: "p13", teamName: "Robo Wizards", member1Name: "Harish Bhat", member1Phone: "9876543234", member1Email: "harish@mail.com", member2Name: "Shreya Mohan", member2Phone: "9876543235", member2Email: "shreya@mail.com", collegeName: "PSG Coimbatore", event: "robotics" },
  { id: "p14", teamName: "Mech Marvels", member1Name: "Gaurav Sinha", member1Phone: "9876543236", member1Email: "gaurav@mail.com", member2Name: "Pallavi Kulkarni", member2Phone: "9876543237", member2Email: "pallavi@mail.com", collegeName: "COEP Pune", event: "robotics" },
  { id: "p15", teamName: "Paper Pioneers", member1Name: "Varun Menon", member1Phone: "9876543238", member1Email: "varun@mail.com", member2Name: "Aisha Khan", member2Phone: "9876543239", member2Email: "aisha@mail.com", collegeName: "Jadavpur University", event: "paper_presentation" },
  { id: "p16", teamName: "Research Rockets", member1Name: "Pranav Sethi", member1Phone: "9876543240", member1Email: "pranav@mail.com", member2Name: "Nisha Patil", member2Phone: "9876543241", member2Email: "nisha@mail.com", collegeName: "KIIT Bhubaneswar", event: "paper_presentation" },
];

interface AppContextType {
  participants: Participant[];
  addParticipant: (p: Participant) => void;
  currentUser: JudgeUser | null;
  login: (id: string, password: string) => JudgeUser | null;
  logout: () => void;
  marks: Record<string, Marks>;
  setMarksForParticipant: (participantId: string, round: "round1" | "round2" | "round3", value: number) => void;
  submitMarks: (participantId: string) => void;
  submittedToHOD: Record<EventCategory, boolean>;
  submitToHOD: (event: EventCategory) => void;
  winners: Winner[];
  announceWinners: () => void;
  winnersAnnounced: boolean;
  judges: JudgeUser[];
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [participants, setParticipants] = useState<Participant[]>(DUMMY_PARTICIPANTS);
  const [currentUser, setCurrentUser] = useState<JudgeUser | null>(null);
  const [marks, setMarks] = useState<Record<string, Marks>>({});
  const [submittedToHOD, setSubmittedToHOD] = useState<Record<EventCategory, boolean>>({} as Record<EventCategory, boolean>);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [winnersAnnounced, setWinnersAnnounced] = useState(false);

  const addParticipant = (p: Participant) => {
    setParticipants((prev) => [...prev, p]);
  };

  const login = (id: string, password: string): JudgeUser | null => {
    const user = JUDGES.find((j) => j.id === id && j.password === password);
    if (user) setCurrentUser(user);
    return user || null;
  };

  const logout = () => setCurrentUser(null);

  const setMarksForParticipant = (participantId: string, round: "round1" | "round2" | "round3", value: number) => {
    setMarks((prev) => {
      const existing = prev[participantId] || { participantId, round1: null, round2: null, round3: null, total: 0, submitted: false };
      const updated = { ...existing, [round]: value };
      updated.total = (updated.round1 || 0) + (updated.round2 || 0) + (updated.round3 || 0);
      return { ...prev, [participantId]: updated };
    });
  };

  const submitMarks = (participantId: string) => {
    setMarks((prev) => ({
      ...prev,
      [participantId]: { ...prev[participantId], submitted: true },
    }));
  };

  const submitToHOD = (event: EventCategory) => {
    setSubmittedToHOD((prev) => ({ ...prev, [event]: true }));
  };

  const announceWinners = () => {
    const eventCategories = Object.keys(EVENT_LABELS) as EventCategory[];
    const allWinners: Winner[] = [];

    eventCategories.forEach((event) => {
      const eventParticipants = participants.filter((p) => p.event === event);
      const scored = eventParticipants
        .map((p) => ({ participant: p, totalMarks: marks[p.id]?.total || 0 }))
        .sort((a, b) => b.totalMarks - a.totalMarks);

      const places: Array<"1st" | "2nd" | "3rd"> = ["1st", "2nd", "3rd"];
      scored.slice(0, 3).forEach((s, i) => {
        if (s.totalMarks > 0) {
          allWinners.push({ ...s, place: places[i], event });
        }
      });
    });

    setWinners(allWinners);
    setWinnersAnnounced(true);
  };

  return (
    <AppContext.Provider
      value={{
        participants,
        addParticipant,
        currentUser,
        login,
        logout,
        marks,
        setMarksForParticipant,
        submitMarks,
        submittedToHOD,
        submitToHOD,
        winners,
        announceWinners,
        winnersAnnounced,
        judges: JUDGES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

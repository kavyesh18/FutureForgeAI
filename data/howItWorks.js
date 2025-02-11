import { UserCheck, FileSignature, UserSearch, BarChart3 } from "lucide-react";

export const howItWorks = [
  {
    title: "Seamless Onboarding",
    description: "Define your industry and expertise for customized career insights.",
    icon: <UserCheck className="w-8 h-8 text-primary" />,
  },
  {
    title: "Polish Your Documents",
    description: "Craft ATS-optimized resumes and persuasive cover letters effortlessly.",
    icon: <FileSignature className="w-8 h-8 text-primary" />,
  },
  {
    title: "Ace Your Interviews",
    description: "Enhance your confidence with AI-driven, role-specific mock interviews.",
    icon: <UserSearch className="w-8 h-8 text-primary" />,
  },
  {
    title: "Analyze & Improve",
    description: "Track your career growth with in-depth performance analytics.",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
  },
];

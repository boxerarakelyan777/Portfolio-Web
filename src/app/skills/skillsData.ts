import { person } from "@/app/resources/content";
import type { IconName } from "@/once-ui/icons";
import type { ColorScheme } from "@/once-ui/types";

export interface SkillCategory {
  title: string;
  icon?: IconName;
  description?: string;
  variant: ColorScheme;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "documentText",
    description: "Fluent in multiple programming languages from low-level to scripting.",
    variant: "brand",
    skills: [
      "Python",
      "Java",
      "TypeScript",
      "JavaScript",
      "SQL",
      "PHP",
      "C",
      "C++",
      "C#",
      "R",
      "Assembly",
      "Machine Language",
      "Bash",
      "Ruby",
      "Go",
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "grid",
    description: "Frameworks and libraries leveraged for building interfaces and services.",
    variant: "accent",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Express",
      "Node.js",
      "Tailwind CSS",
      "FastAPI",
      "Flask",
      "Django",
      "Symfony",
      "Spring",
      "jQuery",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "refresh",
    description: "Platforms and services for deploying scalable applications.",
    variant: "info",
    skills: ["AWS", "GCP", "Azure (Graph API, Entra)", "Docker", "Kubernetes"],
  },
  {
    title: "Tools & Platforms",
    icon: "clipboard",
    description: "Utilities and platforms that enhance the development workflow.",
    variant: "warning",
    skills: ["Git", "GitHub", "Postman", "Webpack", "Composer", "Flywheel"],
  },
  {
    title: "Additional Tools",
    icon: "openLink",
    description: "Supporting technologies and services used across projects.",
    variant: "success",
    skills: [
      "OAuth2/PKCE",
      "Cron jobs",
      "SFTP",
      "Local by Flywheel",
      "Post SMTP",
      "Chrome DevTools",
      "Ubuntu",
      "Nginx",
      "Redis",
      "WordPress",
    ],
  },
  {
    title: "Databases",
    icon: "book",
    description: "Data stores relied upon for persistence and querying.",
    variant: "danger",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "Spoken Languages",
    icon: "globe",
    description: "Languages I can comfortably communicate in.",
    variant: "neutral",
    skills: person.languages,
  },
];
import {
  Card,
  Column,
  Flex,
  Grid,
  Heading,
  Icon,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import type { ColorScheme } from "@/once-ui/types";
import type { IconName } from "@/once-ui/icons";

interface SkillCategory {
  title: string;
  icon?: IconName;
  description?: string;
  variant: ColorScheme;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "documentText",
    description:
      "Fluent in multiple programming languages from low-level to scripting.",
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
    description:
      "Frameworks and libraries leveraged for building interfaces and services.",
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
    description:
      "Platforms and services for deploying scalable applications.",
    variant: "info",
    skills: ["AWS", "GCP", "Azure (Graph API, Entra)", "Docker", "Kubernetes"],
  },
  {
    title: "Tools & Platforms",
    icon: "clipboard",
    description:
      "Utilities and platforms that enhance the development workflow.",
    variant: "warning",
    skills: ["Git", "GitHub", "Postman", "Webpack", "Composer", "Flywheel"],
  },
  {
    title: "Additional Tools",
    icon: "openLink",
    description:
      "Supporting technologies and services used across projects.",
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

export async function generateMetadata() {
  const title = "Skills";
  const description = `Technologies, tools, and languages ${person.name} works with.`;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/skills`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function SkillsPage() {
  return (
    <Column maxWidth="xl" gap="xl">
      <Column gap="s">
        <Heading variant="display-strong-xl">Skills</Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m">
          A snapshot of the technologies, tools, and languages that shape my work.
        </Text>
      </Column>
      <Grid columns="3" tabletColumns="2" mobileColumns="1" gap="l" fillWidth>
        {skillCategories.map((category) => (
          <Card
            key={category.title}
            direction="column"
            gap="m"
            padding="l"
            radius="xl"
            background={`${category.variant}-alpha-weak`}
            border={`${category.variant}-alpha-medium`}
            shadow="l"
            fillWidth
          >
            <Flex vertical="center" gap="s">
              {category.icon && (
                <Flex
                  background={`${category.variant}-alpha-medium`}
                  radius="l"
                  padding="8"
                  vertical="center"
                  horizontal="center"
                >
                  <Icon
                    name={category.icon}
                    size="m"
                    onBackground={`${category.variant}-strong`}
                  />
                </Flex>
              )}
              <Heading as="h3" variant="display-strong-s">
                {category.title}
              </Heading>
            </Flex>
            {category.description && (
              <Text onBackground="neutral-weak" variant="body-default-m">
                {category.description}
              </Text>
            )}
            <Flex wrap gap="8" marginTop="s">
              {category.skills.map((skill) => (
                <Tag key={skill} size="m" variant={category.variant}>
                  {skill}
                </Tag>
              ))}
            </Flex>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}
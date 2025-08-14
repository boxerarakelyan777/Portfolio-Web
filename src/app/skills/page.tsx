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
import { skillCategories } from "./skillsData";

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
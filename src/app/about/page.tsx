import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "../../once-ui/components";
import { baseURL } from "../resources";
import TableOfContents from "../../components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "../resources/content";
import { Projects as ProjectsList } from "@/components/projects/Projects";
import { skillCategories } from "@/app/skills/skillsData";
import React, { JSX } from "react";
import type { IconName } from "@/once-ui/icons";
const resumeHref = "/RudikArakelyanSWEResume.pdf";

type Img = { width: number; height: number; src: string; alt?: string };

export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
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
export default function About() {
  const latestProjectTitle = "Latest project";
  const previewCategories = skillCategories.slice(0, 3);
  const sectionSpacing = "64";
  const Section = ({
    id,
    title,
    children,
  }: {
    id?: string;
    title?: string;
    children: React.ReactNode;
  }) => (
    <Column
      id={id}
      fillWidth
      paddingTop={sectionSpacing}
      paddingBottom={sectionSpacing}
      gap="l"
      borderTop="neutral-alpha-medium"
    >
      {title && (
        <Heading as="h2" variant="display-strong-s">
          {title}
        </Heading>
      )}
      {children}
    </Column>
  );
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: latestProjectTitle,
      display: true,
      items: [],
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: previewCategories.map((category) => category.title),
    },
  ];

  return (
    <Column maxWidth="m">
      {about.tableOfContents.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              <>Washington State</>
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth="l">
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom={sectionSpacing}
          >
            <Flex
              fitWidth
              border="brand-alpha-medium"
              className={styles.blockAlign}
              style={{
                backdropFilter: "blur(var(--static-space-1))",
              }}
              background="brand-alpha-weak"
              radius="full"
              padding="4"
              gap="8"
              marginBottom="m"
              vertical="center"
            >
              <Icon paddingLeft="12" name="clipboard" onBackground="brand-weak" />
              <Flex paddingX="8">Check out my resume</Flex>
              <IconButton
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                data-border="rounded"
                variant="secondary"
                icon="chevronRight"
              />
            </Flex>
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          href={item.link}
                          prefixIcon={item.icon as IconName}
                          label={item.name}
                          size="s"
                          variant="secondary"
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          href={item.link}
                          icon={item.icon as IconName}
                          variant="secondary"
                        />
                      </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Section>
              <Column textVariant="body-default-l" fillWidth gap="l">
                {about.intro.description}
              </Column>
            </Section>
          )}

          {about.work.display && (
            <Section id={about.work.title} title={about.work.title}>
              {about.work.experiences.map((experience, index) => (
                <Column
                  key={`${experience.company}-${experience.role}-${index}`}
                  fillWidth
                  gap="m"
                  paddingBottom="l"
                  borderBottom={
                    index < about.work.experiences.length - 1
                      ? "neutral-alpha-medium"
                      : undefined
                  }
                >
                  <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                    <Text id={experience.company} variant="heading-strong-l">
                      {experience.company}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {experience.timeframe}
                    </Text>
                  </Flex>
                  <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                    {experience.role}
                  </Text>
                  <Column as="ul" gap="m">
                    {experience.achievements.map((achievement: JSX.Element, index: number) => (
                      <Text
                        as="li"
                        variant="body-default-m"
                        key={`${experience.company}-${index}`}
                      >
                        {achievement}
                      </Text>
                    ))}
                  </Column>
                  {Array.isArray(experience.images) && experience.images.length > 0 && (
                    <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                      {(experience.images as Img[]).map((image, index) => (
                        <Flex
                          key={index}
                          border="neutral-medium"
                          radius="m"
                          minWidth={image.width}
                          height={image.height}
                        >
                          <SmartImage
                            enlarge
                            radius="m"
                            sizes={String(image.width)}
                            alt={image.alt ?? ""}
                            src={image.src}
                          />
                        </Flex>
                      ))}
                    </Flex>
                  )}
                </Column>
              ))}
            </Section>
          )}

          {about.studies.display && (
            <Section id={about.studies.title} title={about.studies.title}>
              {about.studies.institutions.map((institution, index) => (
                <Column
                  key={`${institution.name}-${index}`}
                  fillWidth
                  gap="4"
                  paddingBottom="l"
                  borderBottom={
                    index < about.studies.institutions.length - 1
                      ? "neutral-alpha-medium"
                      : undefined
                  }
                >
                  <Text id={institution.name} variant="heading-strong-l">
                    {institution.name}
                  </Text>
                  <Text variant="heading-default-xs" onBackground="neutral-weak">
                    {institution.description}
                  </Text>
                </Column>
              ))}
            </Section>
          )}

          <Section id={latestProjectTitle} title={latestProjectTitle}>
            <Column fillWidth gap="m">
              <ProjectsList range={[1, 1]} marginBottom="0" />
              <Button
                href="/projects"
                label="See more"
                suffixIcon="arrowRight"
                variant="secondary"
                style={{ alignSelf: "flex-start" }}
              />
            </Column>
          </Section>

          {about.technical.display && (
            <Section id={about.technical.title} title={about.technical.title}>
              {previewCategories.map((category, index) => (
                <Column
                  key={category.title}
                  fillWidth
                  gap="4"
                  paddingBottom="l"
                  borderBottom={
                    index < previewCategories.length - 1
                      ? "neutral-alpha-medium"
                      : undefined
                  }
                >
                  <Text id={category.title} variant="heading-strong-l">
                    {category.title}
                  </Text>
                  <Flex wrap gap="8">
                    {category.skills.slice(0, 4).map((skill) => (
                      <Tag key={skill} size="m" variant={category.variant}>
                        {skill}
                      </Tag>
                    ))}
                    {category.skills.length > 4 && (
                      <Tag key="more" size="m" variant={category.variant}>
                        ...
                      </Tag>
                    )}
                  </Flex>
                </Column>
              ))}
              <Button
                href="/skills"
                label="See all skills"
                suffixIcon="arrowRight"
                variant="secondary"
                style={{ alignSelf: "flex-start" }}
              />
            </Section>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
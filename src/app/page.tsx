import React from "react";

import { Flex, Text, Button, Avatar, RevealFx, Column, IconButton } from "../once-ui/components";
import { DynamicHeadline } from "../components/DynamicHeadline";
import { HomeSnapshot } from "../components/HomeSnapshot";
import AnimatedBackground from "../components/AnimatedBackground";
import { ScrollIndicator } from "../components/ScrollIndicator";

import { baseURL } from "../app/resources";
import { home, about, person, social } from "../app/resources/content";
import { IconName } from "@/once-ui/icons";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
     <AnimatedBackground>
        <Column fillWidth paddingY="l" gap="m">
          <Column maxWidth="s">
            <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
              <DynamicHeadline words={home.headlines} />
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx translateY="12" delay={0.4} horizontal="start">
              <Flex gap="16" wrap>
                <Button
                  id="about"
                  data-border="rounded"
                  href="/about"
                  variant="secondary"
                  size="m"
                  arrowIcon
                >
                  <Flex gap="8" vertical="center">
                    {about.avatar.display && (
                      <Avatar
                        style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                        src={person.avatar}
                        size="m"
                      />
                    )}
                    {about.title}
                  </Flex>
                </Button>
                <Button
                  data-border="rounded"
                  href={home.resumeLink}
                  variant="primary"
                  size="m"
                  arrowIcon
                >
                  Resume
                </Button>
              </Flex>
            </RevealFx>
          </Column>
        </Column>
      </AnimatedBackground>
      <RevealFx translateY="12" delay={0.4}>
        <HomeSnapshot snapshot={home.snapshot} />
      </RevealFx>
      <RevealFx translateY="16" delay={0.6}>
        <ScrollIndicator />
      </RevealFx>
      <Flex gap="16" paddingBottom="l" wrap horizontal="center">
        {social.map(
          (item) =>
            item.link && (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon as IconName}
                tooltip={item.name}
                size="m"
                variant="ghost"
              />
            ),
        )}
      </Flex>
    </Column>
  );
}
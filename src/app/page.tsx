import React from "react";

import { Flex, Text, Button, RevealFx, Column, IconButton } from "../once-ui/components";
import { DynamicHeadline } from "../components/DynamicHeadline";
import AnimatedBackground from "../components/AnimatedBackground";
import { ValueTicker } from "../components/ValueTicker";
import { NavigationTiles } from "../components/NavigationTiles";
import { CodePlayground } from "../components/CodePlayground";

import { baseURL } from "../app/resources";
import { home, person, social } from "../app/resources/content";
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
              <Text wrap="balance" variant="display-strong-l">
                {home.mainHeadline}
              </Text>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
              <DynamicHeadline words={home.roles} />
            </RevealFx>
            <RevealFx translateY="12" delay={0.4} fillWidth horizontal="start" paddingBottom="m">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subheadline}
              </Text>
            </RevealFx>
            <RevealFx translateY="16" delay={0.6} horizontal="start">
              <Flex gap="16" wrap>
                <Button data-border="rounded" href="/about" variant="secondary" size="m" arrowIcon>
                  Learn More About Me
                </Button>
                <Button data-border="rounded" href="/projects" variant="primary" size="m" arrowIcon>
                  See My Work
                </Button>
              </Flex>
            </RevealFx>
          </Column>
        </Column>
      </AnimatedBackground>

      <ValueTicker items={home.valueProps} />

      <NavigationTiles tiles={home.tiles} />

      {/* <CodePlayground /> */}

      <RevealFx translateY="4">
        <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
          {home.personalStatement}
        </Text>
      </RevealFx>

      <RevealFx translateY="8">
        <Flex gap="16" paddingY="l" wrap horizontal="center">
          <Text variant="heading-default-l">{home.cta.message}</Text>
          <Button data-border="rounded" href={home.cta.button.href} variant="primary" size="m" arrowIcon>
            {home.cta.button.label}
          </Button>
        </Flex>
      </RevealFx>

      {/* <Flex gap="16" paddingBottom="l" wrap horizontal="center">
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
      </Flex> */}
    </Column>
  );
}
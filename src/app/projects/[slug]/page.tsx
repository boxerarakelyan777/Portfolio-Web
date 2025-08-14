import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "../../utils/utils";
import {
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  SmartImage,
  Text,
} from "../../../once-ui/components";
import { baseURL } from "../../resources";
import { person } from "../../resources/content";
import { formatDate } from "../../utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

// Generate static params for SSG
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "projects", "projects"]);
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata per page
export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const posts = getPosts(["src", "app", "projects", "projects"]);
  const post = posts.find((p) => p.slug === slug);

  if (!post) return;

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;

  const ogImage = image
    ? `https://${baseURL}${image}`
    : `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/projects/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// Main page component
export default async function Project(props: Props) {
  const { slug } = await props.params;
  const posts = getPosts(["src", "app", "projects", "projects"]);
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const avatars = post.metadata.team?.map((member) => ({ src: member.avatar })) ?? [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProjectPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `https://${baseURL}/projects/${post.slug}`,
            author: { "@type": "Person", name: person.name },
          }),
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button
          href="/projects"
          variant="tertiary"
          weight="default"
          size="s"
          prefixIcon="chevronLeft"
        >
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {avatars.length > 0 && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
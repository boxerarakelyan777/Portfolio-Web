import { getPosts } from "@/app/utils/utils";
import { Column, Heading, Text } from "@/once-ui/components";
import { Projects } from "@/components/projects/Projects";
import { baseURL } from "@/app/resources";
import { person, projects } from "@/app/resources/content";

export async function generateMetadata() {
  const title = projects.title;
  const description = projects.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/projects/`,
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

export default function Project() {
  let allProjects = getPosts(["src", "app", "projects", "projects"]);

   return (
    <Column maxWidth="m" gap="xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: projects.title,
            description: projects.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Column paddingX="l" gap="s" marginBottom="40">
        <Heading as="h1" variant="display-strong-m">
          {projects.title}
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-xl">
          {projects.description}
        </Text>
      </Column>
      <Projects />
    </Column>
  );
}
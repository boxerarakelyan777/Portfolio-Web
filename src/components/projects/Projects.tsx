import React from "react";
import { getPosts } from "../../app/utils/utils";
import { Column } from "../../once-ui/components";
import { Grid } from "../../once-ui/components";
import type { SpacingToken } from "../../once-ui/types";
import { ProjectCard } from "../ProjectCard";

interface ProjectsProps {
  range?: [number, number?];
  marginBottom?: SpacingToken;
}

export function Projects({ range, marginBottom = "40" }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "projects", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  const columns = displayedProjects.length === 1 ? 1 : 2;

  return (
    <Grid
      columns={columns}
      tabletColumns={1}
      fillWidth
      gap="xl"
      marginBottom={marginBottom}
      paddingX="l"
    >
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/projects/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Grid>
  );
}
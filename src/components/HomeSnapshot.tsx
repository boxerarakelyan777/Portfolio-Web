import React from "react";
import { Column, Flex, Text } from "@/once-ui/components";

interface HomeSnapshotProps {
  snapshot: string[];
}

export const HomeSnapshot: React.FC<HomeSnapshotProps> = ({ snapshot }) => (
  <Column as="ul" gap="8" paddingY="l">
    {snapshot.map((item, index) => (
      <Flex as="li" key={index} gap="8" vertical="center">
        <Text variant="body-default-m" wrap="balance">
          {item}
        </Text>
      </Flex>
    ))}
  </Column>
);
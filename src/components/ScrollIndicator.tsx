"use client";

import React, { useEffect, useState } from "react";
import { Flex, Text } from "@/once-ui/components";
import styles from "./ScrollIndicator.module.scss";

export const ScrollIndicator: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex
      className={`${styles.indicator} ${hidden ? styles.hidden : ""}`}
      horizontal="center"
      vertical="center"
    >
      <Text variant="body-default-s">Scroll</Text>
      <Text className={styles.arrow} variant="body-default-s">
        ↓
      </Text>
    </Flex>
  );
};
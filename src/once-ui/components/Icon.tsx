"use client";

import React, { forwardRef, useEffect, useState, ReactNode } from "react";
import classNames from "classnames";
import type { IconType } from "react-icons";
import { iconLibrary } from "../icons"; // IconName is exported there too
import { ColorScheme, ColorWeight } from "../types";
import { Flex, Tooltip } from ".";
import styles from "./Icon.module.scss";
import iconStyles from "./IconButton.module.scss";

export type IconName = keyof typeof iconLibrary;

interface IconProps extends React.ComponentProps<typeof Flex> {
  name: IconName;
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  size?: "xs" | "s" | "m" | "l" | "xl";
  decorative?: boolean;
  tooltip?: ReactNode;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  {
    name,
    onBackground,
    onSolid,
    size = "m",
    decorative = true,
    tooltip,
    tooltipPosition = "top",
    ...rest
  },
  ref
) {
  // ✅ Hooks: always called, never behind a condition
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isHover) {
      timer = setTimeout(() => setTooltipVisible(true), 400);
    } else {
      setTooltipVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHover]);

  const IconComponent: IconType | undefined = iconLibrary[name];

  // Warn but do not branch hooks
  if (onBackground && onSolid) {
    // eslint-disable-next-line no-console
    console.warn(
      "Icon: both 'onBackground' and 'onSolid' provided; 'onBackground' takes precedence."
    );
  }

  let colorClass = "color-inherit";
  if (onBackground) {
    const [scheme, weight] = onBackground.split("-") as [ColorScheme, ColorWeight];
    colorClass = `${scheme}-on-background-${weight}`;
  } else if (onSolid) {
    const [scheme, weight] = onSolid.split("-") as [ColorScheme, ColorWeight];
    colorClass = `${scheme}-on-solid-${weight}`;
  }

  // Rendering decision happens AFTER hooks are declared
  if (!IconComponent) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${name}" is not registered in iconLibrary.`);
    return null;
  }

  return (
    <Flex
      inline
      fit
      as="span"
      ref={ref}
      className={classNames(colorClass, styles.icon, styles[size])}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : name}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...rest}
    >
      <IconComponent />
      {tooltip && isTooltipVisible && (
        <Flex position="absolute" zIndex={1} className={iconStyles[tooltipPosition]}>
          <Tooltip label={tooltip} />
        </Flex>
      )}
    </Flex>
  );
});

Icon.displayName = "Icon";
export { Icon };

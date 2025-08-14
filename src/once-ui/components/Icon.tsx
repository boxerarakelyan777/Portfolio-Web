// Icon.tsx
"use client";

import React, { forwardRef, useEffect, useState, ReactNode } from "react";
import classNames from "classnames";
import type { IconType } from "react-icons";
import { iconLibrary } from "../icons"; // your icons.ts file
import { ColorScheme, ColorWeight } from "../types";
import { Flex, Tooltip } from ".";
import styles from "./Icon.module.scss";
import iconStyles from "./IconButton.module.scss";

// Use a single source of truth for IconName.
// If icons.ts already exports IconName, import it instead of redeclaring.
// import type { IconName } from "../icons";
type IconName = keyof typeof iconLibrary;

// ✅ helper: runtime type guard so we can accept string and still render safely
function isIconName(value: string): value is IconName {
  return value in iconLibrary;
}

interface IconProps extends React.ComponentProps<typeof Flex> {
  // 👇 accept loose strings so all existing callers compile
  name: IconName | string;
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  size?: "xs" | "s" | "m" | "l" | "xl";
  decorative?: boolean;
  tooltip?: ReactNode;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  { name, onBackground, onSolid, size = "m", decorative = true, tooltip, tooltipPosition = "top", ...rest },
  ref
) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isHover) timer = setTimeout(() => setTooltipVisible(true), 400);
    else setTooltipVisible(false);
    return () => timer && clearTimeout(timer);
  }, [isHover]);

  // 👇 narrow the string to a valid key at runtime
  const key: IconName | undefined = typeof name === "string" && isIconName(name) ? name : undefined;

  if (onBackground && onSolid) {
    console.warn("Icon: both 'onBackground' and 'onSolid' provided; 'onBackground' takes precedence.");
  }

  let colorClass = "color-inherit";
  if (onBackground) {
    const [scheme, weight] = onBackground.split("-") as [ColorScheme, ColorWeight];
    colorClass = `${scheme}-on-background-${weight}`;
  } else if (onSolid) {
    const [scheme, weight] = onSolid.split("-") as [ColorScheme, ColorWeight];
    colorClass = `${scheme}-on-solid-${weight}`;
  }

  if (!key) {
    console.warn(`Icon: "${name}" is not registered in iconLibrary.`);
    return null;
  }

  const IconComponent: IconType = iconLibrary[key];

  return (
    <Flex
      inline
      fit
      as="span"
      ref={ref}
      className={classNames(colorClass, styles.icon, styles[size])}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : key}
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
export type { IconName };

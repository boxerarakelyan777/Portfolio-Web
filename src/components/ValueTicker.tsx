import React from "react";
import styles from "./ValueTicker.module.scss";

interface ValueTickerProps {
  items: string[];
}

export function ValueTicker({ items }: ValueTickerProps) {
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {items.concat(items).map((item, index) => (
          <span key={index} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

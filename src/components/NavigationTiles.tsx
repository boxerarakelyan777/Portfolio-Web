import React from "react";
import Link from "next/link";
import styles from "./NavigationTiles.module.scss";

interface Tile {
  title: string;
  href: string;
  icon?: string;
}

interface NavigationTilesProps {
  tiles: Tile[];
}

export function NavigationTiles({ tiles }: NavigationTilesProps) {
  return (
    <div className={styles.grid}>
      {tiles.map((tile) => (
        <Link key={tile.title} href={tile.href} className={styles.tile}>
          <span className={styles.icon}>{tile.icon}</span>
          <span className={styles.title}>{tile.title}</span>
        </Link>
      ))}
    </div>
  );
}

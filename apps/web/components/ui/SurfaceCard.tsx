import type { ReactNode } from "react";
import styles from "./SurfaceCard.module.scss";

interface SurfaceCardProps {
  children: ReactNode;
}

export function SurfaceCard({ children }: SurfaceCardProps) {
  return <section className={styles["surface-card"]}>{children}</section>;
}

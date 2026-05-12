import type { ReactNode } from "react";
import styles from "./AppShell.module.scss";

interface AppShellProps {
  collapsed?: boolean;
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}

export function AppShell({
  collapsed = false,
  sidebar,
  topbar,
  children,
}: AppShellProps) {
  return (
    <div
      className={`${styles["app-shell"]} ${
        collapsed ? styles["app-shell--collapsed"] : ""
      }`}
    >
      <aside className={styles["app-shell__sidebar"]}>{sidebar}</aside>
      <div className={styles["app-shell__main"]}>
        <header className={styles["app-shell__topbar"]}>{topbar}</header>
        <div className={styles["app-shell__content"]}>{children}</div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { NavigationItem } from "@/modules/master-profile/types/master-profile.types";
import styles from "./SidebarNav.module.scss";

interface SidebarNavProps {
  collapsed?: boolean;
  items: NavigationItem[];
  onToggleCollapse: () => void;
}

export function SidebarNav({
  collapsed = false,
  items,
  onToggleCollapse,
}: SidebarNavProps) {
  return (
    <div
      className={`${styles["sidebar-nav"]} ${
        collapsed ? styles["sidebar-nav--collapsed"] : ""
      }`}
    >
      <button
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className={styles["sidebar-nav__toggle"]}
        onClick={onToggleCollapse}
        type="button"
      >
        <Icon name={collapsed ? "chevron_right" : "chevron_left"} />
      </button>

      <div className={styles["sidebar-nav__brand"]}>
        <div className={styles["sidebar-nav__brand-inner"]}>
          <div
            aria-hidden={!collapsed}
            className={styles["sidebar-nav__logo"]}
            title="CV Automator"
          >
            <span className={styles["sidebar-nav__logo-letter"]}>C</span>
          </div>
          <h1 className={styles["sidebar-nav__title"]}>CV Automator</h1>
        </div>
      </div>

      <nav className={styles["sidebar-nav__links"]}>
        {items.map((item) => (
          <a
            key={item.label}
            className={`${styles["sidebar-nav__link"]} ${
              item.active ? styles["sidebar-nav__link--active"] : ""
            }`}
            href="#"
            title={collapsed ? item.label : undefined}
          >
            <Icon name={item.icon} />
            <span className={styles["sidebar-nav__label"]}>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className={styles["sidebar-nav__cta"]}>
        <div className={styles["sidebar-nav__cta-full"]}>
          <Button fullWidth icon={<Icon name="add" />}>
            New CV
          </Button>
        </div>
        <button
          className={styles["sidebar-nav__icon-cta"]}
          title="New CV"
          type="button"
        >
          <Icon name="add" />
        </button>
      </div>
    </div>
  );
}

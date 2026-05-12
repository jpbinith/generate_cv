import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import styles from "./TopBar.module.scss";

export function TopBar() {
  return (
    <div className={styles["top-bar"]}>
      <div className={styles["top-bar__heading"]}>
        <p className={styles["top-bar__eyebrow"]}>AI CV Generator</p>
        <h2 className={styles["top-bar__title"]}>Generator Dashboard</h2>
      </div>

      <div className={styles["top-bar__actions"]}>
        <label className={styles["top-bar__search"]}>
          <Icon className={styles["top-bar__search-icon"]} name="search" />
          <input placeholder="Search CVs..." type="text" />
        </label>

        <button className={styles["top-bar__icon-button"]} type="button">
          <Icon name="notifications" />
        </button>

        <button className={styles["top-bar__icon-button"]} type="button">
          <Icon name="settings" />
        </button>

        <Image
          alt="User profile"
          className={styles["top-bar__avatar"]}
          height={40}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7sGv-j1FzqgxOSBty-8ZAJ2qIywEb7GzpOcAQvWrnMMAkPxrcgtYV85A-7nyVd_gfxgHHvYUfGEcysVyhkJ178mXl2d1LLrN6AcwxzXm09oMGKwGXxgWv09VNBPTaKKlVHJrYbQp_t7p4oroWjghtauIPANXrxrgH-enCuT3WrLP2FWceesRpIB3tLZDQ4CPm6m2kvYrHBa-_AOHuZgMJEkfXc1cFopCmZp1w5AOtyo8EfK4IZvtMJfSLkad0aXL1OsvWlLoKKx9a"
          width={40}
        />
      </div>
    </div>
  );
}

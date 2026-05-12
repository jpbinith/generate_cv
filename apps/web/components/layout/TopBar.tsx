"use client";

import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignOut } from "@/modules/auth/hooks/useSignOut";
import { clearUser } from "@/store/auth-slice";
import { useAppDispatch } from "@/store";
import styles from "./TopBar.module.scss";

interface TopBarProps {
  title: string;
  searchPlaceholder?: string;
}

export function TopBar({
  title,
  searchPlaceholder = "Search data...",
}: TopBarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { errorMessage, isSubmitting, submit } = useSignOut();

  async function handleSignOut() {
    const didSignOut = await submit();

    if (didSignOut) {
      dispatch(clearUser());
      setIsMenuOpen(false);
      router.push("/");
    }
  }

  return (
    <div className={styles["top-bar"]}>
      <div className={styles["top-bar__heading"]}>
        <p className={styles["top-bar__eyebrow"]}>AI CV Generator</p>
        <h2 className={styles["top-bar__title"]}>{title}</h2>
      </div>

      <div className={styles["top-bar__actions"]}>
        <Input
          placeholder={searchPlaceholder}
          startAdornment={
            <Icon className={styles["top-bar__search-icon"]} name="search" />
          }
          type="text"
          wrapperClassName={styles["top-bar__search"]}
        />

        <button className={styles["top-bar__icon-button"]} type="button">
          <Icon name="notifications" />
        </button>

        <button className={styles["top-bar__icon-button"]} type="button">
          <Icon name="settings" />
        </button>

        <div className={styles["top-bar__profile"]}>
          <button
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className={styles["top-bar__avatar-button"]}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            type="button"
          >
            <Image
              alt="User profile"
              className={styles["top-bar__avatar"]}
              height={40}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7sGv-j1FzqgxOSBty-8ZAJ2qIywEb7GzpOcAQvWrnMMAkPxrcgtYV85A-7nyVd_gfxgHHvYUfGEcysVyhkJ178mXl2d1LLrN6AcwxzXm09oMGKwGXxgWv09VNBPTaKKlVHJrYbQp_t7p4oroWjghtauIPANXrxrgH-enCuT3WrLP2FWceesRpIB3tLZDQ4CPm6m2kvYrHBa-_AOHuZgMJEkfXc1cFopCmZp1w5AOtyo8EfK4IZvtMJfSLkad0aXL1OsvWlLoKKx9a"
              width={40}
            />
          </button>

          {isMenuOpen ? (
            <div className={styles["top-bar__dropdown"]} role="menu">
              <button
                className={styles["top-bar__dropdown-item"]}
                disabled={isSubmitting}
                onClick={handleSignOut}
                type="button"
              >
                <Icon name="logout" />
                <span>{isSubmitting ? "Signing Out..." : "Sign Out"}</span>
              </button>

              {errorMessage ? (
                <p className={styles["top-bar__dropdown-error"]}>
                  {errorMessage}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

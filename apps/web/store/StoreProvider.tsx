"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  clearStoredAuthUser,
  readStoredAuthUser,
  writeStoredAuthUser,
} from "@/modules/auth/auth-storage";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState<AppStore>(() =>
    makeStore({
      auth: {
        user: readStoredAuthUser(),
      },
    }),
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const {
        auth: { user },
      } = store.getState();

      if (user) {
        writeStoredAuthUser(user);
        return;
      }

      clearStoredAuthUser();
    });

    return unsubscribe;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}

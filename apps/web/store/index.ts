import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore, type TypedUseSelectorHook } from "react-redux";
import { authReducer, type AuthState } from "./auth-slice";

export interface AppPreloadedState {
  auth: AuthState;
}

export function makeStore(preloadedState?: AppPreloadedState) {
  return configureStore({
    preloadedState,
    reducer: {
      auth: authReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>();

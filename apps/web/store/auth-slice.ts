import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/modules/auth/types/auth.types";

export interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
  },
});

export const { clearUser, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
}

interface SetCredentialsPayload {
  token: string;
  expiresAt?: number;
}

const initialState: AuthState = {
  token: null,
  expiresAt: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt ?? null;
      state.isAuthenticated = true;
    },
    clearAuthState: () => {
      return initialState;
    },
  },
});

export const { clearAuthState, setCredentials } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean | null;
  errorMessage: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: null,
  errorMessage: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      state.isLoading = false; // Завершаем загрузку
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
      state.isLoading = false; // Завершаем загрузку при ошибке
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload; // Управляем состоянием загрузки
    },
  },
});

export const { setAuthStatus, setErrorMessage, setLoading } = authSlice.actions;

export default authSlice.reducer;

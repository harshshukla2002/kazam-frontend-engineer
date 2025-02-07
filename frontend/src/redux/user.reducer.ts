import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface State {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  token: string | null;
}

const initialState: State = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  isError: false,
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserIsLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    setUserIsError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const { setUserIsError, setUserIsLoading, setUser, setToken } =
  userSlice.actions;

export default userSlice.reducer;

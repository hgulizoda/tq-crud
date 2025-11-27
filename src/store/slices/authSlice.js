import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    logIn: (state) => {
      state.auth = true;
    },
    logOut: (state) => {
      state.auth = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;

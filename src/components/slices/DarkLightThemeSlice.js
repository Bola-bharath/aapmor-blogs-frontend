import { createSlice } from "@reduxjs/toolkit";

const navbarChange = createSlice({
  name: "navbar",
  initialState: {
    mode: "light",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { changeTheme } = navbarChange.actions;

export default navbarChange.reducer;

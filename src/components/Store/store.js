import { configureStore } from "@reduxjs/toolkit";
import navbarChange from "../slices/DarkLightThemeSlice";

const store = configureStore({
  reducer: {
    navbar: navbarChange,
  },
});
export default store;

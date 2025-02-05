import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface IThemeState {
  mode: "light" | "dark";
}

const initialState: IThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const currentTheme = state.mode;
      state.mode = currentTheme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.theme;
export default themeSlice.reducer;

// src/redux/languageSlice.ts
"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "@/i18n";

interface LangState {
  lang: "en" | "ar";
}

const initialState: LangState = {
  lang: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // set explicit language
    setLanguage(state, action: PayloadAction<"en" | "ar">) {
      state.lang = action.payload;
      // update i18n instantly on client
      try {
        i18n.changeLanguage(state.lang);
      } catch (e) {
        // ignore in case running on server (should be client)
      }
    },
    // optional toggle helper
    toggleLanguage(state) {
      state.lang = state.lang === "en" ? "ar" : "en";
      try {
        i18n.changeLanguage(state.lang);
      } catch (e) {}
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;

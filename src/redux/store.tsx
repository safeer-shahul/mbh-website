//src/redux/store.tsx
"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import languageReducer from "./languageSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

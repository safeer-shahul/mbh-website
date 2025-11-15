//src/redux/searchSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface State {
  query: string;
}

const initialState: State = { query: "" };

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = slice.actions;
export default slice.reducer;

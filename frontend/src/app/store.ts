import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/book/bookSlice";
import authorReducer from "../features/author/authorSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    author: authorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

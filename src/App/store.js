import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../features/todosSlice";

export const store = configureStore({
  reducer: todosSlice,
});


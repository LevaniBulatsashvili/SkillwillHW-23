import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todo.slice";
import themeReducer from "./theme/theme.slice";

const rootReducer = combineReducers({
  todo: todoReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

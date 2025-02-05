import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo, IFormTodo } from "../../interfaces/todo.interface";

const apiKey: string = import.meta.env.VITE_API_KEY;

export const fetchTodos = createAsyncThunk<
  ITodo[],
  void,
  { rejectValue: string }
>("/todos/GET", async (_, thunkApi) => {
  try {
    const res = await fetch("https://crudapi.co.uk/api/v1/todos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch todos!");

    const data: { items: ITodo[] } = await res.json();

    return data.items;
  } catch (err) {
    if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

export const addTodoRequest = createAsyncThunk<
  ITodo,
  IFormTodo,
  { rejectValue: string }
>("/todos/POST", async (todo, thunkApi) => {
  try {
    const res = await fetch("https://crudapi.co.uk/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify([todo]),
    });

    if (!res.ok) throw new Error("Failed to update todo!");

    const data: { items: [ITodo] } = await res.json();
    return data.items[0];
  } catch (err) {
    if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

export const finishTodoRequest = createAsyncThunk<
  ITodo,
  string,
  { rejectValue: string }
>("/todos/PATCH", async (uuid, thunkApi) => {
  try {
    const res = await fetch(`https://crudapi.co.uk/api/v1/todos/${uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ isCompleted: true }),
    });

    if (!res.ok) throw new Error("Failed to update todo!");

    const data: ITodo = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) return thunkApi.rejectWithValue(err.message);
    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

export const deleteTodoRequest = createAsyncThunk<
  ITodo,
  string,
  { rejectValue: string }
>("/todos/DELETE", async (uuid, thunkApi) => {
  try {
    const res = await fetch(`https://crudapi.co.uk/api/v1/todos/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete todo!");

    const data: ITodo = await res.json();

    return data;
  } catch (err) {
    if (err instanceof Error) return thunkApi.rejectWithValue(err.message);

    return thunkApi.rejectWithValue("Something went wrong!");
  }
});

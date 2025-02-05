import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTodoRequest,
  finishTodoRequest,
  fetchTodos,
  addTodoRequest,
} from "./todo.thunks";
import { ITodo } from "../../interfaces/todo.interface";
import { RootState } from "../index";

interface ITodoState {
  todoList: ITodo[];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ITodoState = {
  todoList: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, { payload: todo }: PayloadAction<ITodo>) {
      state.todoList.unshift(todo);
    },
    finishTodo(state, { payload: todoId }: PayloadAction<string>) {
      state.todoList = state.todoList.map((todo) => {
        if (todo._uuid !== todoId) return todo;
        todo.isCompleted = true;
        return todo;
      });
    },
    deleteTodo(state, { payload: todoId }: PayloadAction<string>) {
      state.todoList = state.todoList.filter((todo) => todo._uuid !== todoId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, { payload: todos }: PayloadAction<ITodo[]>) => {
          state.loading = false;
          state.error = null;
          state.todoList = todos;
        }
      )
      .addCase(
        fetchTodos.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      )
      .addCase(addTodoRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addTodoRequest.fulfilled,
        (state, { payload: todo }: PayloadAction<ITodo>) => {
          state.loading = false;
          state.error = null;
          state.todoList = [todo, ...state.todoList];
        }
      )
      .addCase(
        addTodoRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      )
      .addCase(finishTodoRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        finishTodoRequest.fulfilled,
        (state, { payload: updatedTodo }: PayloadAction<ITodo>) => {
          state.loading = false;
          state.error = null;
          state.todoList = state.todoList.map((todo) => {
            if (todo._uuid !== updatedTodo._uuid) return todo;
            return updatedTodo;
          });
        }
      )
      .addCase(
        finishTodoRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      )
      .addCase(deleteTodoRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteTodoRequest.fulfilled,
        (state, { payload: deletedTodo }: PayloadAction<ITodo>) => {
          state.loading = false;
          state.error = null;
          state.todoList = state.todoList.filter(
            (todo) => todo._uuid !== deletedTodo._uuid
          );
        }
      )
      .addCase(
        deleteTodoRequest.rejected,
        (state, { payload: thrownErr }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = thrownErr;
        }
      );
  },
});

export const { addTodo, finishTodo, deleteTodo } = todoSlice.actions;
export const todoSelector = (state: RootState) => state.todo;
export default todoSlice.reducer;

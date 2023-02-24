import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const getTodos = createAsyncThunk("todos/feach", async (_, thunkAPI) => {
  try {
    const todo = await fetch("http://localhost:3010/todos");
    return todo.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addTodos = createAsyncThunk(
  "todos/feach/get",
  async (text, thunkAPI) => {
    try {
      const todo = await fetch("http://localhost:3010/todos", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          done: false,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      return await todo.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/fetch/delete",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3010/todos/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTodos = createAsyncThunk(
  "todos/fetch/update",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3010/todos/${id}`, {
        method: "PATCH",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todos) => todos._id !== action.payload
        );
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        state.todos = state.todos.map((item) => {
          if (item._id === action.payload) {
            item.done = !item.done;
          }
          return item;
        });
      });
  },
});

export default todosSlice.reducer;

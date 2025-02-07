import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  description?: string;
  isCompleted: boolean;
  userId: string;
}

interface State {
  tasks: Task[] | null;
  isLoading: boolean;
  isError: boolean;
}

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: null,
    isLoading: false,
    isError: false,
  },
  reducers: {
    setTasks: (state: State, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    setTaskIsLoading: (state: State) => {
      state.isLoading = true;
      state.isError = false;
    },
    setTaskIsError: (state: State) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const { setTaskIsError, setTaskIsLoading, setTasks } = taskSlice.actions;
export default taskSlice.reducer;

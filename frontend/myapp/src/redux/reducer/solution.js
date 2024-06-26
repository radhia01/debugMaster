import { createSlice } from "@reduxjs/toolkit";
import { addSolution, getSolutions } from "../actions/solution";

const solutionSlice = createSlice({
  name: "solution",
  initialState: {
    solutions: [],
    isLoading: false,
    error: null,
    message: null,
    success: false,
  },
  reducers: {
    Reset_Message: (state, action) => {
      state.message = null;
    },
    Reset_Error: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // add solution
    builder.addCase(addSolution.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSolution.fulfilled, (state, action) => {
      state.isLoading = false;
      state.solutions = [...state.solutions, action.payload.data];
      state.message = action.payload.message;
    });
    builder.addCase(addSolution.rejected, (state, action) => {
      state.error = action.payload;
    });
    // get solutions
    builder.addCase(getSolutions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSolutions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.solutions = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(getSolutions.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default solutionSlice.reducer;
export const { Reset_Message, Reset_Error } = solutionSlice.actions;

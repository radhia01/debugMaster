import { createSlice } from "@reduxjs/toolkit";
import {
  addProblem,
  deleteProblem,
  getProblems,
  getProblemsTag,
  getProblemDetails,
  getProblemsByTag,
} from "../actions/problem";

const problemSlice = createSlice({
  name: "problem",
  initialState: {
    problems: [],
    isLoading: false,
    error: null,
    message: null,
    success: false,
    tags: [],
    problem: null,
  },
  reducers: {
    Reset_Message: (state, action) => {
      state.message = null;
    },
    Reset_Error: (state, action) => {
      state.error = null;
    },
    Logout: (state, action) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    // add problem
    builder.addCase(addProblem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems = [...state.problems, action.payload.data];
      state.message = action.payload.message;
      localStorage.setItem("problem", JSON.stringify(action.payload.data));
    });
    builder.addCase(addProblem.rejected, (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    });
    // get problems
    builder.addCase(getProblems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProblems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems = action.payload.data;
    });
    builder.addCase(getProblems.rejected, (state, action) => {
      state.error = action.payload;
    });
    // delete problem
    builder.addCase(deleteProblem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems = state.problems.filter(
        (el) => el.id !== action.payload.data.id
      );
      state.message = action.payload.message;
    });

    builder.addCase(deleteProblem.rejected, (state, action) => {
      state.error = action.payload;
    });

    // get tags

    builder.addCase(getProblemsTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProblemsTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = action.payload.data;
      state.message = action.payload.message;
    });

    builder.addCase(getProblemsTag.rejected, (state, action) => {
      state.error = action.payload;
    });
    // get problem details

    builder.addCase(getProblemDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProblemDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.data);
      state.problem = action.payload.data;
      state.message = action.payload.message;
    });

    builder.addCase(getProblemDetails.rejected, (state, action) => {
      state.error = action.payload;
    });
    // get problems from a tag
    builder.addCase(getProblemsByTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProblemsByTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems = action.payload.data;
      state.message = action.payload.message;
    });

    builder.addCase(getProblemsByTag.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default problemSlice.reducer;
export const { Reset_Message, Reset_Error, Logout } = problemSlice.actions;

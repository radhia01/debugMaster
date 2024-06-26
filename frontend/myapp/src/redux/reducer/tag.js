import { createSlice } from "@reduxjs/toolkit";
import { addTag, getTags } from "../actions/tag";
import { deleteProblem } from "../actions/problem";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    isLoading: false,
    error: null,
    message: null,
    success: false,
  },
  reducers: {
    Reset_Tag_Message: (state, action) => {
      state.message = null;
    },
    Reset_Error: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // add tag
    builder.addCase(addTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
    builder.addCase(addTag.rejected, (state, action) => {
      state.error = action.payload;
    });
    // get tags
    builder.addCase(getTags.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = action.payload.data;
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.error = action.payload;
    });

    // delete tag
    builder.addCase(deleteProblem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProblem.fulfilled, (state, action) => {
      state.isLoading = false;
      const tagsList = action.payload.tags.map((el) => el.id_tag);
      console.log(tagsList);
      for (const tag in tagsList) {
        state.tags = state.tags.filter((el) => el.id !== tag);
      }
    });
    builder.addCase(deleteProblem.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default tagSlice.reducer;
export const { Reset_Tag_Message, Reset_Error } = tagSlice.actions;

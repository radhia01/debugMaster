import { createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  addUser,
  login,
  updateUser,
  updateUserPassword,
  getPostedProblems,

} from "../actions/user";
import { deleteProblem } from "../actions/problem";
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
    message: null,
    success: false,
    problems: [],
    token:null
  },
  reducers: {
    Reset_Message: (state, action) => {
      state.message = null;
    },
    Reset_Error: (state, action) => {
      state.error = null;
    },
    Logout: (state, action) => {
      state.success=false;
      state.token=null;
     localStorage.clear()
     
    
    
     
    },
  },
  extraReducers: (builder) => {
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    });
    // add user

    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = [...state.users, action.payload.data];
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    });
    // login

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.token=action.payload.token
      localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
      localStorage.setItem("userToken", JSON.stringify(action.payload.token));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
    });
    // update profile

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
      state.message = action.payload.message;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    // upadte user password
    builder.addCase(updateUserPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
      state.message = action.payload.message;
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.error = action.payload;
    });
    // get posted problems
    builder.addCase(getPostedProblems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostedProblems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.problems = action.payload.data;
    });
    builder.addCase(getPostedProblems.rejected, (state, action) => {
      state.error = action.payload;
    });
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
  },
});
export default userSlice.reducer;
export const { Reset_Message, Reset_Error, Logout } = userSlice.actions;

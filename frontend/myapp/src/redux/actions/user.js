import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const token = JSON.stringify(localStorage.getItem("token"));
// login
export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://debug-master-backend.vercel.app/api/login",
        payload
      );
      const data = await response.data;
      return data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// logout 
export const logout = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://debug-master-backend.vercel.app/api/login",
        payload
      );
      const data = await response.data;
      return data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// add user
export const addUser = createAsyncThunk(
  "user/addUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://debug-master-backend.vercel.app/api/users",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Berear ${token}`,
          },
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all users
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://debug-master-backend.vercel.app/api/users",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error during users loading");
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await axios.put(
        `https://debug-master-backend.vercel.app/api/users/${data.id}`,
        data.data,
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      return await response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update user password
export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://debug-master-backend.vercel.app/api/users/update/password/${data.id}`,
        data.data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:`Bearer ${data.token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get posted problems
export const getPostedProblems = createAsyncThunk(
  "user/getPostedProblems",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://debug-master-backend.vercel.app/api/problems/users/${data.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:`Bearer ${data.token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

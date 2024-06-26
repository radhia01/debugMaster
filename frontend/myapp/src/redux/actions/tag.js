import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const token = JSON.parse(localStorage.getItem("token"));
// add new tag
export const addTag = createAsyncThunk(
  "tag/addTag",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://debug-master-backend.vercel.app/api/tags/${payload.id}`,
        payload.data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return await response.data;
    } catch (error) {
      const err = error.response.data.message;
      return thunkAPI.rejectWithValue(err);
    }
  }
);
// get tags
export const getTags = createAsyncThunk("tag/getTags", async (token, thunkAPI) => {
  try {
    console.log(token)
    const response = await axios.get(
      `https://debug-master-backend.vercel.app/api/tags/`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.data;
  } catch (error) {
    const err = error.response.data.message;
    return thunkAPI.rejectWithValue(err);
  }
});

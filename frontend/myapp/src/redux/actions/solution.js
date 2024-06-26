import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// const headers = {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
//   "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
// };
const token = JSON.parse(localStorage.getItem("token"));
// add new solution

export const addSolution = createAsyncThunk(
  "solution/addSolution",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await axios.post(
        `https://debug-master-backend.vercel.app/api/solutions/problems/${payload.id_problem}/users/${payload.idUser}`,
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
// get all solutions
export const getSolutions = createAsyncThunk(
  "solution/getSolutions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://debug-master-backend.vercel.app/api/solutions",
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
  }
);

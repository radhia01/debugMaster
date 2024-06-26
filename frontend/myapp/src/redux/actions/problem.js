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
// add new problem

export const addProblem = createAsyncThunk(
  "problem/addProblem",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://debug-master-backend.vercel.app/api/problems/users/${data.idUser}`,
        data.data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
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
// get problems
export const getProblems = createAsyncThunk(
  "problem/getProblems",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://debug-master-backend.vercel.app/api/problems",
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
// delete problem
export const deleteProblem = createAsyncThunk(
  "problem/deleteProblem",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://debug-master-backend.vercel.app/api/problems/${data.id}`,
        {
          headers: {
            "Content-Type": "application/json",
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

// get tags associated to a problem
export const getProblemsTag = createAsyncThunk(
  "problem/gettags",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://debug-master-backend.vercel.app/api/tags/problem/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
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
// get problem

export const getProblemDetails = createAsyncThunk(
  "problem/problemDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://debug-master-backend.vercel.app/api/problems/details/${data.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
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

// get problems associated to a tag
export const getProblemsByTag = createAsyncThunk(
  "problem/getproblemsByTag",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://debug-master-backend.vercel.app/api/problems/tag/${data.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const err = error.reponse.data.message;
      return thunkAPI.rejectWithValue(err);
    }
  }
);

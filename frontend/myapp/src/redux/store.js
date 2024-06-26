import { configureStore } from "@reduxjs/toolkit";
import {reducers} from "../redux/reducer/index";
export const store = configureStore({ reducer: reducers });

import { combineReducers } from "redux";
import user from "../reducer/user";
import problem from "../reducer/problem";
import solution from "../reducer/solution";
import tag from "../reducer/tag";
export const reducers = combineReducers({
  user,
  problem,
  solution,
  tag,
});

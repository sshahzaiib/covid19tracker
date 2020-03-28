// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import uiReducer from "./uiReducer";
import NewsReducer from "./NewsReducer";
import StatsReducer from "./StatsReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  UI: uiReducer,
  data: NewsReducer,
  stats: StatsReducer
});


export default rootReducer;

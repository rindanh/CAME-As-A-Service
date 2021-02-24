import { combineReducers } from "redux";
import methodChunks from "./methodChunk.reducer";
import providers from "./provider.reducer";
import characteristics from "./characteristic.reducer";
import projects from "./project.reducer";
import industries from "./industries.reducer";
import dimensions from "./dimensions.reducer";

const rootReducer = combineReducers({
  providers,
  methodChunks,
  characteristics,
  projects,
  industries,
  dimensions
});

export default rootReducer;

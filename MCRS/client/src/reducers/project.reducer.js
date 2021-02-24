import {
  ADD_PROJECT,
  READ_PROJECT,
  FETCH_PROJECT_BEGIN,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECT_SUCCESS,
  DELETE_PROJECT,
  UPDATE_PROJECT
} from "../actions";

const initialState = {
  all: []
};

const projects = (state = initialState, action) => {
  let entry = {};
  let entries = {};
  let ids = [];
  let item = {};
  switch (action.type) {
    case ADD_PROJECT:
      entry = {};
      item = action.payload.project;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
      };
    case DELETE_PROJECT:
      entries = { ...state };
      delete entries[action.payload.id];
      ids = state.all.filter(v => v !== action.payload.id);
      return {
        ...entries,
        all: ids
      };
    case UPDATE_PROJECT:
      entry = {};
      item = action.payload.project;
      entry[item.id] = item;
      return {
        ...state,
        ...entry
      };
    case READ_PROJECT:
      return state;
    case FETCH_PROJECT_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_PROJECT_SUCCESS:
      entries = { ...state };
      ids = [];
      action.payload.projects.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default projects;

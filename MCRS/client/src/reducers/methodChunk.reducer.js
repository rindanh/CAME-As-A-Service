import {
  ADD_METHOD_CHUNK,
  READ_METHOD_CHUNK,
  FETCH_METHOD_CHUNK_BEGIN,
  FETCH_METHOD_CHUNK_FAILURE,
  FETCH_METHOD_CHUNK_SUCCESS,
  DELETE_METHOD_CHUNK,
  UPDATE_METHOD_CHUNK
} from "../actions";

const initialState = {
  all: []
};

const methodChunks = (state = initialState, action) => {
  let entry = {};
  let entries = {};
  let ids = [];
  let item = {};
  switch (action.type) {
    case ADD_METHOD_CHUNK:
      entry = {};
      item = action.payload.methodChunk;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
      };
    case DELETE_METHOD_CHUNK:
      entries = { ...state };
      delete entries[action.payload.id];
      ids = state.all.filter(v => v !== action.payload.id);
      return {
        ...entries,
        all: ids
      };
    case UPDATE_METHOD_CHUNK:
      entry = {};
      item = action.payload.methodChunk;
      entry[item.id] = item;
      return {
        ...state,
        ...entry
      };
    case READ_METHOD_CHUNK:
      return state;
    case FETCH_METHOD_CHUNK_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_METHOD_CHUNK_SUCCESS:
      entries = { ...state };
      ids = [];
      action.payload.methodChunks.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_METHOD_CHUNK_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default methodChunks;

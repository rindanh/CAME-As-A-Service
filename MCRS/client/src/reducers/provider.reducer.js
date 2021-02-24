import {
  ADD_PROVIDER,
  READ_PROVIDER,
  AUTHENTICATE,
  LOGOUT,
  FETCH_PROVIDER_BEGIN,
  FETCH_PROVIDER_FAILURE,
  FETCH_PROVIDER_SUCCESS,
  DELETE_PROVIDER,
  UPDATE_PROVIDER
} from "../actions";

const initialState = {
  all: []
};

const providers = (state = initialState, action) => {
  let entry = {};
  let entries = {};
  let ids = [];
  let item = {};
  switch (action.type) {
    case ADD_PROVIDER:
      entry = {};
      item = action.payload.provider;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
      };
    case AUTHENTICATE:
      return { ...state, token: action.payload.token, user: action.payload.user };
    case LOGOUT:
      return { ...state, token: undefined, user: undefined };
    case DELETE_PROVIDER:
      entries = { ...state };
      delete entries[action.payload.id];
      ids = state.all.filter(v => v !== action.payload.id);
      return {
        ...entries,
        all: ids
      };
    case UPDATE_PROVIDER:
      entry = {};
      item = action.payload.provider;
      entry[item.id] = item;
      return {
        ...state,
        ...entry
      };
    case READ_PROVIDER:
      return state;
    case FETCH_PROVIDER_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_PROVIDER_SUCCESS:
      entries = { ...state };
      ids = [];
      action.payload.providers.forEach(p => {
        entries[p.id] = p;
        ids[ids.length] = p.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_PROVIDER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default providers;

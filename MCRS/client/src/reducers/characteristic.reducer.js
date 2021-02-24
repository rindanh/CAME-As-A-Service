import {
  ADD_CHARACTERISTIC,
  READ_CHARACTERISTIC,
  FETCH_CHARACTERISTIC_BEGIN,
  FETCH_CHARACTERISTIC_FAILURE,
  FETCH_CHARACTERISTIC_SUCCESS,
  DELETE_CHARACTERISTIC,
  UPDATE_CHARACTERISTIC
} from "../actions";

const initialState = {
  all: []
};

const characteristics = (state = initialState, action) => {
  let entry = {};
  let entries = {};
  let ids = [];
  let item = {};
  switch (action.type) {
    case ADD_CHARACTERISTIC:
      entry = {};
      item = action.payload.characteristic;
      entry[item.id] = item;
      return {
        ...state,
        ...entry,
        all: [...state.all, item.id]
      };
    case DELETE_CHARACTERISTIC:
      entries = { ...state };
      delete entries[action.payload.id];
      ids = state.all.filter(v => v !== action.payload.id);
      return {
        ...entries,
        all: ids
      };
    case UPDATE_CHARACTERISTIC:
      entry = {};
      item = action.payload.characteristic;
      entry[item.id] = item;
      return {
        ...state,
        ...entry
      };
    case READ_CHARACTERISTIC:
      return state;
    case FETCH_CHARACTERISTIC_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_CHARACTERISTIC_SUCCESS:
      entries = { ...state };
      ids = [];
      action.payload.characteristics.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_CHARACTERISTIC_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default characteristics;

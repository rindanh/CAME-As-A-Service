import {
  READ_DIMENSION,
  FETCH_DIMENSION_BEGIN,
  FETCH_DIMENSION_FAILURE,
  FETCH_DIMENSION_SUCCESS
} from "../actions";

const initialState = {
  all: []
};

const dimensions = (state = initialState, action) => {
  switch (action.type) {
    case READ_DIMENSION:
      return state;
    case FETCH_DIMENSION_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_DIMENSION_SUCCESS:
      let entries = {};
      let ids = [];
      action.payload.dimensions.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_DIMENSION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default dimensions;

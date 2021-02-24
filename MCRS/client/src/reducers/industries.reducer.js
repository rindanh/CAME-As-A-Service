import {
  READ_INDUSTRY,
  FETCH_INDUSTRY_BEGIN,
  FETCH_INDUSTRY_FAILURE,
  FETCH_INDUSTRY_SUCCESS
} from "../actions";

const initialState = {
  all: []
};

const industries = (state = initialState, action) => {
  switch (action.type) {
    case READ_INDUSTRY:
      return state;
    case FETCH_INDUSTRY_BEGIN:
      return {
        ...state,
        loading: true,
        errors: null
      };
    case FETCH_INDUSTRY_SUCCESS:
      let entries = {};
      let ids = [];
      action.payload.industries.forEach(mc => {
        entries[mc.id] = mc;
        ids[ids.length] = mc.id;
      });
      return {
        ...entries,
        all: ids,
        loading: false
      };
    case FETCH_INDUSTRY_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

export default industries;

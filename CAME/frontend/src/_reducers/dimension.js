import { dimensionConstants } from '../_constants';

export function dimensions(state = {}, action) {
  switch (action.type) {
    case dimensionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case dimensionConstants.GETALL_SUCCESS:
      return {
        items: action.dimensions
      };
    case dimensionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case dimensionConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case dimensionConstants.GETONE_SUCCESS:
      return {
        item: action.dimension
      };
    case dimensionConstants.GETONE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}
import { configConstants } from '../_constants';

export function configs(state = {}, action) {
  switch (action.type) {
    case configConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case configConstants.GETALL_SUCCESS:
      return {
        items: action.configs
      };
    case configConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case configConstants.SETTYPE_REQUEST:
      return {
        loading: true
      }
    default:
      return state
  }
}
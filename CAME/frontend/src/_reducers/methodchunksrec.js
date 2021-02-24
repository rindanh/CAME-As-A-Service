import { methodchunkrecConstants } from '../_constants';

export function methodchunksrec(state = {}, action) {
  switch (action.type) {
    case methodchunkrecConstants.FIND_REQUEST:
      return {
        loading: true
      };
    case methodchunkrecConstants.FIND_SUCCESS:
      return {
        items: action.methodchunk
      };
    case methodchunkrecConstants.FIND_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
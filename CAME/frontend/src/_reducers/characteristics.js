import { characteristicConstants } from '../_constants';

export function characteristics(state = {}, action) {
  switch (action.type) {
    case characteristicConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case characteristicConstants.GETALL_SUCCESS:
      return {
        items: action.characteristics
      };
    case characteristicConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case characteristicConstants.DELETE_REQUEST:
      // add 'deleting:true' property to characteristic being deleted
      return {
        ...state,
        items: state.items.map(characteristic =>
          characteristic.id === action.id
            ? { ...characteristic, deleting: true }
            : characteristic
        )
      };
    case characteristicConstants.DELETE_SUCCESS:
      // remove deleted characteristic from state
      return {
        items: state.items.filter(characteristic => characteristic.id !== action.id)
      };
    case characteristicConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to characteristic 
      return {
        ...state,
        items: state.items.map(characteristic => {
          if (characteristic.id === action.id) {
            // make copy of characteristic without 'deleting:true' property
            const { deleting, ...characteristicCopy } = characteristic;
            // return copy of characteristic with 'deleteError:[error]' property
            return { ...characteristicCopy, deleteError: action.error };
          }

          return characteristic;
        })
      };
    default:
      return state
  }
}
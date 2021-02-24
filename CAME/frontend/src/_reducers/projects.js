import { projectConstants } from '../_constants';

export function projects(state = {}, action) {
  switch (action.type) {
    case projectConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case projectConstants.GETALL_SUCCESS:
      return {
        items: action.projects
      };
    case projectConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case projectConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case projectConstants.GETONE_SUCCESS:
      return {
        item: action.project
      };
    case projectConstants.GETONE_FAILURE:
      return { 
        error: action.error
      };
    case projectConstants.DELETE_REQUEST:
      // add 'deleting:true' property to project being deleted
      return {
        deleting: true
        
      };
    case projectConstants.DELETE_SUCCESS:
      // remove deleted project from state
      return {
        deleted: true
      };
    case projectConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to project 
      return {
        deleted: false
      };
    default:
      return state
  }
}
import { tenantSettingsConstants } from '../_constants';

export function tenantSettings(state = {}, action) {
  switch (action.type) {
    case tenantSettingsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case tenantSettingsConstants.GETALL_SUCCESS:
      return {
        items: action.tenantSettings
      };
    case tenantSettingsConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case tenantSettingsConstants.GETBYTYPE_REQUEST:
      return {
        loading: true
      }
    case tenantSettingsConstants.GETBYTYPE_SUCCESS:
      return {
        item: action.tenantSetting
      };
    case tenantSettingsConstants.GETBYTYPE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}
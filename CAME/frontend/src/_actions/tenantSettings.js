import { tenantSettingsConstants } from '../_constants';
import { tenantSettingsService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const tenantSettingsActions = {
    getAll,
    getByType
};

function getAll() {
    return dispatch => {
        dispatch(request());

        tenantSettingsService.getAll()
            .then(
                tenantSettings => dispatch(success(tenantSettings)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tenantSettingsConstants.GETALL_REQUEST } }
    function success(tenantSettings) { return { type: tenantSettingsConstants.GETALL_SUCCESS, tenantSettings } }
    function failure(error) { return { type: tenantSettingsConstants.GETALL_FAILURE, error } }
}

function getByType(type) {
    return dispatch => {
        dispatch(request());

        tenantSettingsService.getByType(type)
            .then(
                tenant => dispatch(success(tenant)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tenantSettingsConstants.GETBYTYPE_REQUEST } }
    function success(tenant) { return { type: tenantSettingsConstants.GETBYTYPE_SUCCESS, tenant } }
    function failure(error) { return { type: tenantSettingsConstants.GETBYTYPE_FAILURE, error } }
}
import { configConstants } from '../_constants';
import { configService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const configActions = {
    setType,
    getAll
};

function setType(tenant_id, type) {
    let body = {
        tenant_id: tenant_id,
        type: type
    }
    return dispatch => {
        dispatch(request(body));

        configService.setType(body)
            .then(
                configs => { 
                    dispatch(success(configs));
                },
                error => {
                    console.log("error woyyy")
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(configs) { return { type: configConstants.SETTYPE_REQUEST, configs } }
    function success(configs) { return { type: configConstants.SETTYPE_SUCCESS, configs } }
    function failure(error) { return { type: configConstants.SETTYPE_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        configService.getAll()
            .then(
                configs => dispatch(success(configs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: configConstants.GETALL_REQUEST } }
    function success(configs) { return { type: configConstants.GETALL_SUCCESS, configs } }
    function failure(error) { return { type: configConstants.GETALL_FAILURE, error } }
}

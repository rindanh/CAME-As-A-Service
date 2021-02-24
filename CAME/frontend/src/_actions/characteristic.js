import { characteristicConstants } from '../_constants';
import { characteristicService } from '../_services';
import { alertActions } from './';

export const characteristicActions = {
    create,
    getOne,
    getAll,
    // update,
    delete: _delete
};

function create(characteristic) {
    return dispatch => {
        dispatch(request(characteristic));

        characteristicService.create(characteristic)
            .then(
                characteristic => { 
                    dispatch(success());
                    dispatch(alertActions.success('Create characteristic successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(characteristic) { return { type: characteristicConstants.CREATE_REQUEST, characteristic } }
    function success(characteristic) { return { type: characteristicConstants.CREATE_SUCCESS, characteristic } }
    function failure(error) { return { type: characteristicConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        characteristicService.getAll()
            .then(
                characteristics => dispatch(success(characteristics)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: characteristicConstants.GETALL_REQUEST } }
    function success(characteristics) { return { type: characteristicConstants.GETALL_SUCCESS, characteristics } }
    function failure(error) { return { type: characteristicConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        characteristicService.getById(id)
            .then(
                characteristic => dispatch(success(characteristic)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: characteristicConstants.GETONE_REQUEST } }
    function success(characteristic) { return { type: characteristicConstants.GETONE_SUCCESS, characteristic } }
    function failure(error) { return { type: characteristicConstants.GETONE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        characteristicService.delete(id)
            .then(
                characteristic => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: characteristicConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: characteristicConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: characteristicConstants.DELETE_FAILURE, id, error } }
}
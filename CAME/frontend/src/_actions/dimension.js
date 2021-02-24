import { dimensionConstants } from '../_constants';
import { dimensionService } from '../_services';

export const dimensionActions = {
    getOne,
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        dimensionService.getAll()
            .then(
                dimensions => dispatch(success(dimensions)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dimensionConstants.GETALL_REQUEST } }
    function success(dimensions) { return { type: dimensionConstants.GETALL_SUCCESS, dimensions } }
    function failure(error) { return { type: dimensionConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        dimensionService.getById(id)
            .then(
                dimension => dispatch(success(dimension)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dimensionConstants.GETONE_REQUEST } }
    function success(dimension) { return { type: dimensionConstants.GETONE_SUCCESS, dimension } }
    function failure(error) { return { type: dimensionConstants.GETONE_FAILURE, error } }
}

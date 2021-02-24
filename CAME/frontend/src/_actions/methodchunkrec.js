import { methodchunkrecConstants } from '../_constants';
import { methodchunkrecService } from '../_services';
import { alertActions } from './';

export const methodchunkrecActions = {
    find
};

function find(pid) {
    return dispatch => {
        dispatch(request(pid));

        methodchunkrecService.find(pid)
            .then(
                methodchunk => { 
                    dispatch(success(methodchunk));
                    // dispatch(alertActions.success('Find method chunks recommendation successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(pid) { return { type: methodchunkrecConstants.FIND_REQUEST, pid } }
    function success(methodchunk) { return { type: methodchunkrecConstants.FIND_SUCCESS, methodchunk } }
    function failure(error) { return { type: methodchunkrecConstants.FIND_FAILURE, error } }
}

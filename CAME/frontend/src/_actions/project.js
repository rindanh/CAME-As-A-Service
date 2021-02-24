import { projectConstants } from '../_constants';
import { projectService } from '../_services';
import { alertActions } from './';
import { history, store } from '../_helpers';

export const projectActions = {
    create,
    getOne,
    getAll,
    update,
    getOneByPid,
    saveMCForProject,
    saveMethod,
    delete: _delete
};

function create(project_body) {
    return dispatch => {
        dispatch(request(project_body));

        projectService.create(project_body)
            .then(
                project => { 
                    dispatch(success());
                    // dispatch(alertActions.success('Create project successful'));

                    let user_id = store.getState().authentication.user.username
                    let project_id = project_body.name.replace(/\s/g,'-').toLowerCase()
                    
                    let pid = user_id + '/' + project_id
                    history.push('/find/' + pid)
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(project) { return { type: projectConstants.CREATE_REQUEST, project } }
    function success(project) { return { type: projectConstants.CREATE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.CREATE_FAILURE, error } }
}

function getAll(tenantId) {
    return dispatch => {
        dispatch(request(tenantId));

        projectService.getAll(tenantId)
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: projectConstants.GETALL_REQUEST } }
    function success(projects) { return { type: projectConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        projectService.getById(id)
            .then(
                project => dispatch(success(project)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: projectConstants.GETONE_REQUEST } }
    function success(project) { return { type: projectConstants.GETONE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.GETONE_FAILURE, error } }
}

function getOneByPid(pid) {
    return dispatch => {
        dispatch(request());

        projectService.getByPid(pid)
            .then(
                project => dispatch(success(project)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: projectConstants.GETONE_REQUEST } }
    function success(project) { return { type: projectConstants.GETONE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.GETONE_FAILURE, error } }
}

function saveMCForProject(data) {
    return dispatch => {
        dispatch(request());

        projectService.saveMCForProject(data)
            .then(
                project => {
                    dispatch(success(project))
                    history.push('/compose/' + data.project_id)
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: projectConstants.SAVEMC_REQUEST } }
    function success(project) { return { type: projectConstants.SAVEMC_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.SAVEMC_FAILURE, error } }
}

function saveMethod(data){
    return dispatch => {
        dispatch(request());

        projectService.saveMethod(data)
            .then(
                project => {
                    dispatch(success(project))
                    history.push('/projects/' + data.project_id)
                },
                error => dispatch(failure(error.toString()))
            )
    }
    function request() { return { type: projectConstants.SAVEMC_REQUEST } }
    function success(project) { return { type: projectConstants.SAVEMC_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.SAVEMC_FAILURE, error } }
}

function update(data, pid){
    return dispatch => {
        dispatch(request());

        projectService.update(data, pid)
            .then(
                project => {
                    dispatch(success(project))
                    history.push('/projects/' + pid)
                },
                error => dispatch(failure(error.toString()))
            )
    }
    function request() { return { type: projectConstants.UPDATE_REQUEST } }
    function success(project) { return { type: projectConstants.UPDATE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        projectService.delete(id)
            .then(
                project => {
                    dispatch(success(id))
                    history.push('/projects')
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: projectConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: projectConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: projectConstants.DELETE_FAILURE, id, error } }
}
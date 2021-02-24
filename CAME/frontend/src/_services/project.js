import { authHeader } from '../_helpers';

export const projectService = {
    create,
    getAll,
    getById,
    getByPid,
    saveMCForProject,
    saveMethod,
    update,
    delete: _delete
};

function create(project) {
    const requestOptions = {
        method: 'POST',
        crossDomain:true,
        headers: authHeader(),
        body: JSON.stringify(project)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects`, requestOptions).then(handleResponse);
}

function getAll(tenantId) {
    console.log("tenantId", tenantId)
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let tenant = ''
    if (tenantId) {
        tenant = '?tenantId='+tenantId
    }

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects${tenant}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/${id}`, requestOptions).then(handleResponse);
}

function getByPid(pid) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/${pid}`, requestOptions).then(handleResponse);
}

function saveMCForProject(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/method-chunks`, requestOptions).then(handleResponse);
}

function saveMethod(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/save-method`, requestOptions).then(handleResponse);
}

function update(data, pid) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/${pid}`, requestOptions).then(handleResponse);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
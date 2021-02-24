import { authHeader } from '../_helpers';

export const characteristicService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

function create(characteristic) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(characteristic)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/characteristics`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${process.env.REACT_APP_CAME_URL}/characteristics`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/characteristics/${id}`, requestOptions).then(handleResponse);
}

function update(characteristic) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(characteristic)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/characteristics/${characteristic.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/characteristics/${id}`, requestOptions).then(handleResponse);
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
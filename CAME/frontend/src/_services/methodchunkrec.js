import { authHeader } from '../_helpers';

export const methodchunkrecService = {
    find,
};

function find(pid) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(pid)
    };

    return fetch(`${process.env.REACT_APP_CAME_URL}/projects/find-recommendation`, requestOptions).then(handleResponse);
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
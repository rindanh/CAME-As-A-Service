import axios from "axios";

export const ADD_PROVIDER = "ADD_PROVIDER";
export const READ_PROVIDER = "READ_PROVIDER";
export const DELETE_PROVIDER = "DELETE_PROVIDER";
export const UPDATE_PROVIDER = "UPDATE_PROVIDER";

export const FETCH_PROVIDER_BEGIN = "FETCH_PROVIDER_BEGIN";
export const FETCH_PROVIDER_SUCCESS = "FETCH_PROVIDER_SUCCESS";
export const FETCH_PROVIDER_FAILURE = "FETCH_PROVIDER_FAILURE";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const fetchProviderBegin = () => ({
  type: FETCH_PROVIDER_BEGIN
});

export const fetchProviderSuccess = providers => ({
  type: FETCH_PROVIDER_SUCCESS,
  payload: { providers }
});

export const fetchProviderFailure = errors => ({
  type: FETCH_PROVIDER_FAILURE,
  payload: { errors }
});

export const addProvider = provider => ({
  type: ADD_PROVIDER,
  payload: { provider }
});

export const authenticate = ({ token, user }) => ({
  type: AUTHENTICATE,
  payload: { token, user }
});

export const logout = () => ({
  type: LOGOUT
});

export const readProviders = () => {
  return dispatch => {
    dispatch(fetchProviderBegin());
    return axios
      .get("/providers")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readProviders','success')
        dispatch(fetchProviderSuccess(data));
      })
      .catch(error => dispatch(fetchProviderFailure(error)));
  };
};

export const deleteProvider = id => ({
  type: DELETE_PROVIDER,
  payload: { id }
});

export const updateProvider = provider => ({
  type: UPDATE_PROVIDER,
  payload: { provider }
});

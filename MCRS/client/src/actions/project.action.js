import axios from "axios";

export const ADD_PROJECT = "ADD_PROJECT";
export const READ_PROJECT = "READ_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";

export const FETCH_PROJECT_BEGIN = "FETCH_PROJECT_BEGIN";
export const FETCH_PROJECT_SUCCESS = "FETCH_PROJECT_SUCCESS";
export const FETCH_PROJECT_FAILURE = "FETCH_PROJECT_FAILURE";

export const fetchProjectBegin = () => ({
  type: FETCH_PROJECT_BEGIN
});

export const fetchProjectSuccess = projects => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: { projects }
});

export const fetchProjectFailure = errors => ({
  type: FETCH_PROJECT_FAILURE,
  payload: { errors }
});

// export const findBegin = () => ({
//   type: FIND_BEGIN
// });

// export const findSuccess = find => ({
//   type: FIND_SUCCESS,
//   payload: { find }
// });

// export const findFailure = errors => ({
//   type: FETCH_PROJECT_FAILURE,
//   payload: { errors }
// });

export const addProject = project => ({
  type: ADD_PROJECT,
  payload: { project }
});

export const readProjects = () => {
  return dispatch => {
    dispatch(fetchProjectBegin());
    return axios
      .get("/projects")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readProjects','success')
        dispatch(fetchProjectSuccess(data));
      })
      .catch(error => dispatch(fetchProjectFailure(error)));
  };
};

export const deleteProject = id => ({
  type: DELETE_PROJECT,
  payload: { id }
});

export const updateProject = project => ({
  type: UPDATE_PROJECT,
  payload: { project }
});

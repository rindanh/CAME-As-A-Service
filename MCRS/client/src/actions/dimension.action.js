import axios from "axios";

export const READ_DIMENSION = "READ_DIMENSION";

export const FETCH_DIMENSION_BEGIN = "FETCH_DIMENSION_BEGIN";
export const FETCH_DIMENSION_SUCCESS = "FETCH_DIMENSION_SUCCESS";
export const FETCH_DIMENSION_FAILURE = "FETCH_DIMENSION_FAILURE";

export const fetchDimensionBegin = () => ({
  type: FETCH_DIMENSION_BEGIN
});

export const fetchDimensionSuccess = dimensions => ({
  type: FETCH_DIMENSION_SUCCESS,
  payload: { dimensions }
});

export const fetchDimensionFailure = errors => ({
  type: FETCH_DIMENSION_FAILURE,
  payload: { errors }
});

export const readDimensions = () => {
  return dispatch => {
    dispatch(fetchDimensionBegin());
    return axios
      .get("/dimensions")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readDimensions','success')
        dispatch(fetchDimensionSuccess(data));
      })
      .catch(error => dispatch(fetchDimensionFailure(error)));
  };
};

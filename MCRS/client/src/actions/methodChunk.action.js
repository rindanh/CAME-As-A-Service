import axios from "axios";

export const ADD_METHOD_CHUNK = "ADD_METHOD_CHUNK";
export const READ_METHOD_CHUNK = "READ_METHOD_CHUNK";
export const DELETE_METHOD_CHUNK = "DELETE_METHOD_CHUNK";
export const UPDATE_METHOD_CHUNK = "UPDATE_METHOD_CHUNK";

export const FETCH_METHOD_CHUNK_BEGIN = "FETCH_METHOD_CHUNK_BEGIN";
export const FETCH_METHOD_CHUNK_SUCCESS = "FETCH_METHOD_CHUNK_SUCCESS";
export const FETCH_METHOD_CHUNK_FAILURE = "FETCH_METHOD_CHUNK_FAILURE";

export const fetchMethodChunkBegin = () => ({
  type: FETCH_METHOD_CHUNK_BEGIN
});

export const fetchMethodChunkSuccess = methodChunks => ({
  type: FETCH_METHOD_CHUNK_SUCCESS,
  payload: { methodChunks }
});

export const fetchMethodChunkFailure = errors => ({
  type: FETCH_METHOD_CHUNK_FAILURE,
  payload: { errors }
});

export const addMethodChunk = methodChunk => ({
  type: ADD_METHOD_CHUNK,
  payload: { methodChunk }
});

export const readMethodChunks = () => {
  return dispatch => {
    dispatch(fetchMethodChunkBegin());
    return axios
      .get("/method-chunks")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readMethodChunks','success')
        dispatch(fetchMethodChunkSuccess(data));
      })
      .catch(error => dispatch(fetchMethodChunkFailure(error)));
  };
};

export const deleteMethodChunk = id => ({
  type: DELETE_METHOD_CHUNK,
  payload: { id }
});

export const updateMethodChunk = methodChunk => ({
  type: UPDATE_METHOD_CHUNK,
  payload: { methodChunk }
});

import axios from "axios";

export const ADD_CHARACTERISTIC = "ADD_CHARACTERISTIC";
export const READ_CHARACTERISTIC = "READ_CHARACTERISTIC";
export const DELETE_CHARACTERISTIC = "DELETE_CHARACTERISTIC";
export const UPDATE_CHARACTERISTIC = "UPDATE_CHARACTERISTIC";

export const FETCH_CHARACTERISTIC_BEGIN = "FETCH_CHARACTERISTIC_BEGIN";
export const FETCH_CHARACTERISTIC_SUCCESS = "FETCH_CHARACTERISTIC_SUCCESS";
export const FETCH_CHARACTERISTIC_FAILURE = "FETCH_CHARACTERISTIC_FAILURE";

export const fetchCharacteristicBegin = () => ({
  type: FETCH_CHARACTERISTIC_BEGIN
});

export const fetchCharacteristicSuccess = characteristics => ({
  type: FETCH_CHARACTERISTIC_SUCCESS,
  payload: { characteristics }
});

export const fetchCharacteristicFailure = errors => ({
  type: FETCH_CHARACTERISTIC_FAILURE,
  payload: { errors }
});

export const addCharacteristic = characteristic => ({
  type: ADD_CHARACTERISTIC,
  payload: { characteristic }
});

export const readCharacteristics = () => {
  return dispatch => {
    dispatch(fetchCharacteristicBegin());
    return axios
      .get("/characteristics")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readCharacteristics','success')
        dispatch(fetchCharacteristicSuccess(data));
      })
      .catch(error => dispatch(fetchCharacteristicFailure(error)));
  };
};

export const deleteCharacteristic = id => ({
  type: DELETE_CHARACTERISTIC,
  payload: { id }
});

export const updateCharacteristic = characteristic => ({
  type: UPDATE_CHARACTERISTIC,
  payload: { characteristic }
});

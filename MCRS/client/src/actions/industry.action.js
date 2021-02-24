import axios from "axios";

export const READ_INDUSTRY = "READ_INDUSTRY";

export const FETCH_INDUSTRY_BEGIN = "FETCH_INDUSTRY_BEGIN";
export const FETCH_INDUSTRY_SUCCESS = "FETCH_INDUSTRY_SUCCESS";
export const FETCH_INDUSTRY_FAILURE = "FETCH_INDUSTRY_FAILURE";

export const fetchIndustryBegin = () => ({
  type: FETCH_INDUSTRY_BEGIN
});

export const fetchIndustrySuccess = industries => ({
  type: FETCH_INDUSTRY_SUCCESS,
  payload: { industries }
});

export const fetchIndustryFailure = errors => ({
  type: FETCH_INDUSTRY_FAILURE,
  payload: { errors }
});

export const readIndustries = () => {
  return dispatch => {
    dispatch(fetchIndustryBegin());
    return axios
      .get("/industries")
      .then(({ data }) => {
        // console.log(data)
        // console.log('readIndustrys','success')
        dispatch(fetchIndustrySuccess(data));
      })
      .catch(error => dispatch(fetchIndustryFailure(error)));
  };
};

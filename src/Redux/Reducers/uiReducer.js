import {
    SET_LOADING,
    // SET_ERRORS,
    UNSET_LOADING,
    // CLEAR_ERRORS,
  } from "../consts";
  
  const initialState = {
    loading: false,
    errors: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_LOADING:
        return Object.assign({}, state, {
          loading: true
        })
      case UNSET_LOADING:
        return Object.assign({}, state, {
          loading: false
        })
      default:
        return state;
    }
  };
  
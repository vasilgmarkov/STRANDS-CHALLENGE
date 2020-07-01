import { API_REQUEST, GET_BREEDS, SET_ERRORS } from "../actions/types";

const initialState = {
  breeds: [],
  isLoading: false,
  errors: null,
};

export default function breedsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        isLoading: false,
        errors: null,
      };
    case API_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

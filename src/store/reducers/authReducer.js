import { setAuth } from "../routines";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case setAuth.TRIGGER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
}

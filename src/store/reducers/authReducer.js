import { signIn, signUp, logOut } from "@routines/authRoutines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../baseHandle";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const handleSignIn = {
  ...handleTrigger(signIn),
  ...handleRequest(signIn),
  ...handleSuccess(signIn),
  ...handleFailure(signIn),
  ...handleFulfill(signIn),
};

const handleSignUp = {
  ...handleTrigger(signUp),
  ...handleRequest(signUp),
  ...handleSuccess(signUp),
  ...handleFailure(signUp),
  ...handleFulfill(signUp),
};

const handleLogOut = {
  [logOut.SUCCESS]: (state) => ({
    ...state,
    data: null,
    loading: false,
    error: null,
  }),
};

export const authReducer = createReducer(initialState)({
  ...handleSignIn,
  ...handleSignUp,
  ...handleLogOut,
});

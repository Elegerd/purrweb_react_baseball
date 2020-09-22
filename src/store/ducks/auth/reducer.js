import {
  signIn,
  signUp,
  signOut,
  tokenVerification,
} from "@ducks/auth/routines";
import { createReducer } from "../createReducer";
import {
  handleFailure,
  handleFulfill,
  handleSuccess,
  handleRequest,
  handleTrigger,
} from "../baseHandleActions";

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

const handleSignOut = {
  ...handleTrigger(signOut),
  ...handleRequest(signOut),
  ...handleSuccess(signOut),
  ...handleFailure(signOut),
  ...handleFulfill(signOut),
};

const handleTokenVerification = {
  ...handleTrigger(tokenVerification),
  ...handleRequest(tokenVerification),
  ...handleSuccess(tokenVerification),
  ...handleFailure(tokenVerification),
  ...handleFulfill(tokenVerification),
};

export const reducer = createReducer(initialState)({
  ...handleSignIn,
  ...handleSignUp,
  ...handleSignOut,
  ...handleTokenVerification,
});

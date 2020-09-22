import { createRoutine } from "redux-saga-routines";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  TOKEN_VERIFICATION,
} from "@ducks/auth/actions";

export const signIn = createRoutine(SIGN_IN);

export const signUp = createRoutine(SIGN_UP);

export const signOut = createRoutine(SIGN_OUT);

export const tokenVerification = createRoutine(TOKEN_VERIFICATION);

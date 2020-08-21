import request from "./request";

export function signInRequest(user) {
  return request.post("/api/v1/auth/sign_in", user);
}

export function signUpRequest(user) {
  return request.post("/api/v1/auth", user);
}

export function signOutRequest() {
  return request.delete("/api/v1/auth/sign_out");
}

export function tokenVerificationRequest() {
  return request.get("/api/v1/auth/validate_token");
}

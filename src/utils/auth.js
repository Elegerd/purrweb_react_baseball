import request from "../request";

export function signInRequest(user) {
  return request.post("/api/v1/auth/sign_in", user).then(({ data }) => data);
}

export function signUpRequest(user) {
  return request.post("/api/v1/auth", user).then(({ data }) => data);
}

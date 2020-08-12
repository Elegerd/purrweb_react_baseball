export const authService = {
  logout,
  setToken,
  get token() {
    return JSON.parse(localStorage.getItem("auth"));
  },
};

function setToken(value) {
  localStorage.setItem("auth", JSON.stringify(value));
}

function logout() {
  localStorage.removeItem("auth");
}

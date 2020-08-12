import axios from "axios";
import config from "config";
import { authService } from "@services/authService";

const request = () => {
  const defaultOptions = {
    baseURL: config.apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      const currentUser = authService.token;
      if (
        currentUser &&
        typeof currentUser["access-token"] !== "undefined" &&
        typeof currentUser["client"] !== "undefined" &&
        typeof currentUser["uid"] !== "undefined"
      ) {
        config.headers["access-token"] = currentUser["access-token"];
        config.headers["client"] = currentUser["client"];
        config.headers["uid"] = currentUser["uid"];
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    async (response) => {
      return response;
    },
    (error) => {
      const { status, data, statusText } = error.response;
      if ([401, 403].indexOf(status) !== -1) {
        authService.logout();
      }
      const errorMessage = (data && data.message) || statusText;
      return Promise.reject(errorMessage);
    }
  );

  return instance;
};

export default request();

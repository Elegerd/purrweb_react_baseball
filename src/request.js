import axios from "axios";
// import getStorageData from "./utils/getStorageData";

const request = () => {
  const defaultOptions = {
    baseURL: "https://baseballcloud-back.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      // const authData = await getStorageData("auth");
      // if (typeof authData !== "undefined") {
      //   const data = JSON.parse(authData.data);
      //   if (data && data.token) {
      //     config.headers.Authorization = `Bearer ${data.token}`;
      //   }
      // }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default request();

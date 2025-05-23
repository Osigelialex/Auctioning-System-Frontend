import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: "https://auctioning-system-backend-production.up.railway.app",
  // baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  config => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return config;
    }

    try {
      const decodedJwt = jwtDecode(accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        Cookies.remove("accessToken");
        return config;
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    } catch (error) {
      console.error("Error processing token:", error);
      Cookies.remove("accessToken");
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("accessToken");
    }
    return Promise.reject(error);
  }
);

export default instance;
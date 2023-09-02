import axios from "axios";
import { BACK_END_URL } from "../utils";
import { RedirectToLoginAlert } from "../componenets/Alert/AuthAlert";
var loadingStatusArray = [];
function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
  localStorage.removeItem("Token"), localStorage.removeItem("userId");
  localStorage.removeItem("writerId");
}

export function AxiosApihandling(loader) {
  // Add a request interceptor
  axios.defaults.baseURL = BACK_END_URL;

  axios.interceptors.request.use(
    (config) => {
      if (config.showLoader) {
        if (!loadingStatusArray.includes(config.url)) {
          loadingStatusArray.push(config.url);
        }
        if (loadingStatusArray.length > 0) {
          loader(true);
        }
      }
      let token = localStorage.getItem("Token");
      if (config.authRequired) {
        if (!token) {
          // If token is not available, prevent the request from being sent
          RedirectToLoginAlert();
          return Promise.reject(new Error("Token not available"));
        }
      }
      
      config.headers["authorization"] = `Bearer ${token}`;

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if (response.config?.showLoader) {
        loadingStatusArray.splice(
          loadingStatusArray.indexOf(response.config.url),
          1
        );
        if (loadingStatusArray.length == 0) {
          loader(false);
        }
      }
      return response.data ? response.data : response;
    },
    function (error) {
      if (error.config?.showLoader) {
        loadingStatusArray.splice(
          loadingStatusArray.indexOf(error.config.url),
          1
        );
        if (loadingStatusArray.length == 0) {
          loader(false);
        }
      }
      if (error.response.status === 401) {
        removeUserFromLocalStorage();
        RedirectToLoginAlert();
        // router.push('/login')
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}

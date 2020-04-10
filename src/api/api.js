import * as moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import history from "../utils/history";

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = async (request) => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.access_token;

      var now = moment();
      var expiration = moment(user.expiration);


      if (expiration.diff(now) <= 0) {
        const api = axios.create({ baseURL: "http://localhost:5000" });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${user.refresh_token}`;
        let response = await api.post("/tokenrefresh");

        token = response.data.access_token;
        user.access_token = token;
        user.expiration = response.data.expiration;

        localStorage.setItem("user", JSON.stringify(user));
      }

      request.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return request;
};
const errorHandler = (error) => {
  let message;
  if (isHandlerEnabled(error.config)) {
    switch (error.response.status) {
      case 401:
        let currentUrl = history.location.pathname;
        history.push("/dashboard/signin?comefrom=" + currentUrl);
        break;
      case 404:
        message = "Recurso no encontrado";
        break;
      default:
        message = "Ha ocurrido un error";
        break;
    }
    if (message) {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }

  return Promise.reject({ message });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

// export default axios.create({ baseURL: "http://128.199.43.48/storeapp_webapi" });
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Add interceptors
axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;

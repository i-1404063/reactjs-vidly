import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, ex => {
  const expectedError =
    ex.response && ex.response.status >= 400 && ex.response.status < 500;

  if (!expectedError) {
    logger.log(ex);
    toast.error("an unexpected error occured");
  }

  return Promise.reject(ex);
});

export function setJwt(jwt) {
  //adding header to all kind of request
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

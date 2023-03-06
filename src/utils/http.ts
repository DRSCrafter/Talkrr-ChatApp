import axios from "axios";
import toastError from "./toastError";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

axios.interceptors.response.use(null, error => {
    toastError(error);

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
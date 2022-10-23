import axios from "axios";
import toastError from "./toastError";

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
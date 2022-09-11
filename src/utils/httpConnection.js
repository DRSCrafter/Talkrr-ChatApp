import axios from "axios";
import toast from "react-hot-toast";

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log(error);
        if (error.response.data && error.response.data != '')
            toast.error(error.response.data);
        else
            toast.error('An unexpected error occured!');
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
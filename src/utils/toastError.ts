import {toast} from "react-toastify";
import {AxiosError} from "axios";

function ToastError(error: AxiosError) {
    if (error.response?.data && (error.response.data as string).includes('DOCTYPE'))
        toast.error('Internal Server Error!');
    else if (error.response?.data && error.response.data !== '')
        toast.error((error.response.data as string));
    else
        toast.error('An unexpected error occurred!');
}

export default ToastError;
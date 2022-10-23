import {toast} from "react-toastify";

function ToastError(error) {
    if (error.response.data && error.response.data.includes('DOCTYPE'))
        toast.error('Internal Server Error!');
    else if(error.response.data && error.response.data !== '')
        toast.error(error.response.data);
    else
        toast.error('An unexpected error occurred!');
}

export default ToastError;
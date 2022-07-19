import '../Styles/Components/SignUp.css';
import React from "react";
import {TextField} from "@mui/material";

const Input = ({label, error, ...rest}) => {
    return (
        // <div className="form-group">
        //     <label htmlFor={name}>{label}</label>
        //     <input {...rest} name={name} id={name} className="form-control" />
        //     {error && <div className="alert alert-danger">{error}</div>}
        // </div>
        <TextField id="outlined-basic" variant="outlined" size="small" label={error ? "error" : label} error={error} helperText={error} {...rest}/>
    );
};

export default Input;
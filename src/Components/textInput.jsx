import '../Styles/Components/SignUp.css';
import React from "react";
import {TextField} from "@mui/material";

const TextInput = ({label, error, ...rest}) => {
    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label={error ? "error" : label}
            error={error}
            helperText={error}
            {...rest}
        />
    );
};

export default TextInput;
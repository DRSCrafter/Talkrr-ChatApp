import '../Styles/Components/SignUp.css';
import React from "react";
import {TextField} from "@mui/material";
import TextInputProps from "../types/components/textInput";

const TextInput = ({label, error, ...rest}: TextInputProps) => {
    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label={error ? "error" : label}
            error={Boolean(error)}
            helperText={error}
            {...rest}
        />
    );
};

export default TextInput;
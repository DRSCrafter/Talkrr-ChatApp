import "../Styles/Components/TypingBox.css";
import React from "react";
import {IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function TypingBox({value, onChange, onSubmit}) {
    return (
        <div className="typing-box-container">
            <input className="typing-box-input input" placeholder="Type and Press Login to Send" value={value}
                   onChange={onChange}/>
            <IconButton className="typing-box-btn" onClick={onSubmit}>
                <SendIcon/>
            </IconButton>
        </div>
    );
}

export default TypingBox;

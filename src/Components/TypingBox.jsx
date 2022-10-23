import "../Styles/Components/TypingBox.css";
import React from "react";
import {IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function TypingBox({value, onChange, onSend}) {
    return (
        <form className="typing-box-container" onSubmit={onSend}>
            <input className="typing-box-input input" placeholder="Type and Press Login to Send" value={value}
                   onChange={onChange}/>
            <IconButton className="typing-box-btn" type="submit">
                <SendIcon/>
            </IconButton>
        </form>
    );
}

export default TypingBox;

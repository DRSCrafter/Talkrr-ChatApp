import '../Styles/Components/TypingBox.css';
import React from "react";
import {IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function TypingBox() {
    return (
        <div className="typing-box-root">
            <div className="typing-box-container">
                <input className="typing-box-input input" placeholder="Type and Press Login to Send"/>
                <IconButton className="typing-box-btn">
                    <SendIcon/>
                </IconButton>
            </div>
        </div>
    );
}

export default TypingBox;
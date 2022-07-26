import '../App.css';
import '../Styles/Components/WindowBar.css';
import React from "react";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function closeWindow() {
    window.__TAURI__.process.exit();
}

function WindowBar() {
    return (
        <span className="window-bar-root">
            <span data-tauri-drag-region className="window-bar-container"/>
            <IconButton onClick={closeWindow} style={{color: 'rgba(178,0,0,0.91)'}} className="window-bar-icon-container not-draggable">
                <CloseIcon className="window-bar-icon" fontSize="small"/>
            </IconButton>
        </span>
    )
}

export default WindowBar;
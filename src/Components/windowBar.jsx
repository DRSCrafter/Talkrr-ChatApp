import '../Styles/Components/WindowBar.css';
import React from "react";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function WindowBar() {
    return (
        <span className="window-bar-root">
            <span data-tauri-drag-region className="window-bar-container"/>
            <IconButton onClick={closeWindow} className="window-bar-icon-container not-draggable">
                <CloseIcon className="window-bar-iconn" fontSize="small"/>
            </IconButton>
        </span>
    )
}
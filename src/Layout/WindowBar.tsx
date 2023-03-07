import '../Styles/Components/WindowBar.scss';
import React from "react";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function closeWindow() {
    // @ts-ignore
    window.__TAURI__.process.exit();
}

function WindowBar() {
    return (
        <span className="window__bar">
            <span data-tauri-drag-region className="window__bar__body"/>
            <IconButton
                onClick={closeWindow}
                style={{color: 'rgba(178,0,0,0.91)'}}
                className="window__bar__icon not-draggable"
            >
                <CloseIcon className="window__bar__icon" fontSize="small"/>
            </IconButton>
        </span>
    )
}

export default WindowBar;
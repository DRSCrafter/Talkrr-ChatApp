import React from "react";
import {IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function closeWindow() {
    window.__TAURI__.process.exit();
}

function Root({children}) {
    return (
        <div style={{overflow: 'hidden'}}>
            <img
                src={require("../Assets/Background/Background (2).jpg")}
                style={{...styles.background, zIndex: -10, overflowX: 'hidden'}}
                alt="background"/>
            <span style={{display: 'flex', width: '100vw', height: '100vh'}}>
                {children}
            </span>
        </div>
    );
}

const styles = {
    background: {
        width: '100vw', height: '100vh', position: 'absolute',
    },
};

export default Root;
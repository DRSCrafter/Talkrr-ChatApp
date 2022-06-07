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
                <span style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    zIndex: 10,
                    width: '100%',
                    height: 30,
                    backgroundColor: 'rgba(0,0,0,0.39)'
                }}>
                    <span data-tauri-drag-region style={{width: '100%', height: 30, position: "absolute", zIndex: 10}}/>
                    <IconButton onClick={closeWindow} className="not-draggable" style={{width: 30, height: 30, color: 'red'}}>
                        <CloseIcon style={{color: 'white', position: 'absolute', zIndex: 11}} fontSize="small"/>
                    </IconButton>
                </span>
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
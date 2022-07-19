import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import Button from '@mui/material/Button';

function closeWindow() {
    setTimeout(function () {
        window.__TAURI__.process.exit();
    }, 300);
}

function Login() {
    return (
        <>
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
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    width: '60vw',
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{fontSize: '15vh', fontFamily: "Debby Script", textShadow: "0px 0px 6px #666666"}}>
                        Talkrr
                    </span>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '50%',
                        height: 130
                    }}>
                        <Button sx={{height: 55}} variant="contained">Login</Button>
                        <Button sx={{height: 55}} variant="contained">Sign Up</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
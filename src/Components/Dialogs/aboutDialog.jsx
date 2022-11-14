import '../../Styles/Components/Dialogs/aboutDialog.css';
import React from 'react';

import {Button, Dialog, IconButton, useMediaQuery} from "@mui/material";
import {styled} from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function AboutDialog({open, onClose}) {
    const isPC = useMediaQuery('(min-width: 1024px)');

    const DialogContainer = styled(Dialog)(() => ({
        '& .MuiPaper-root': {
            display: 'flex',
            flexDirection: 'column',
            rowGap: '15px',
            justifyContent: 'center',
            backgroundColor: '#252525',
            overflowX: 'hidden',
            color: "white",
            boxSizing: 'border-box',
            padding: '20px'
        },
    }));

    return (
        <>
            <DialogContainer
                open={open}
                onClose={onClose}
                fullWidth={isPC}
                fullScreen={!isPC}
                style={{backdropFilter: 'blur(10px)'}}
            >
                <div className="about-dialog-header">
                    <div>
                        <IconButton style={{color: 'white'}} onClick={onClose}>
                            <KeyboardBackspaceIcon fontSize={"medium"}/>
                        </IconButton>
                    </div>
                    <span className="about-dialog-header-title">
                        About US
                    </span>
                </div>
                <div className="about-dialog-body-container">
                    <div className="about-dialog-logo-container">
                        <img src={require('../../Assets/logo.png')} className="about-dialog-logo-image"/>
                        <span>Talkrr</span>
                    </div>
                    Talkrr is an open-source project powered by ReactJS. The server-side coding is done in ExpressJS and
                    Socket.io. Also to make the Stand-alone app, I used Tauri which is a tool for building optimized and
                    secure application for multi-platform deployment.
                    <br/>If you found this app worth of your time, please leave a star in the github repository. I
                    highly appreciate it.
                    <br/>I also would be grateful if you could take a few minutes to visit my other projects as well.
                </div>
                <div className="about-dialog-btn-section">
                    <Button variant="contained" style={{padding: 10}}>GitHub Repository</Button>
                    <Button variant="text" style={{padding: 10}}>About Developer</Button>
                </div>

            </DialogContainer>
        </>
    );
}

export default AboutDialog;
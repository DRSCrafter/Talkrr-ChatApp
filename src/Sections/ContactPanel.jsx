import React from "react";

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from "@mui/material/Button";

function ContactPanel() {
    return (
        <div style={{display: 'flex', width: '23%', height: '100%', marginTop: 30}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '90%',
                height: '95%',
                margin: 'auto',
                borderRadius: 30,
                backdropFilter: 'blur(10px)',
                boxShadow: '0px 0px 10px #333333',
                fontFamily: "Segoe UI Light",
                color: 'white',
                overflow: 'hidden'
            }}>
                <div style={{width: '90%', height: '30%', display: 'flex', flexDirection: 'column', marginTop: 10}}>
                    <img src={require('../Assets/thumbnail (1).png')}
                         style={{width: '60%', borderRadius: '50%', boxShadow: '0 0 7px #333333', margin: 'auto'}}/>
                    <span style={{
                        fontSize: 30,
                        margin: 'auto',
                        marginTop: 10
                    }}>John Smith</span>
                </div>

                <div style={{
                    width: '90%',
                    height: '25%',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 'auto',
                }}>
                    <div style={{display: 'flex', flexWrap: 'nowrap', marginBlock: 10}}>
                        <AlternateEmailIcon fontSize="medium"/>
                        <span style={{fontSize: 15, marginLeft: 10,}}>Drsprogramming2020@gmail.com</span>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'nowrap', marginBlock: 10}}>
                        <PhoneIcon fontSize="medium"/>
                        <span style={{fontSize: 15, marginLeft: 10,}}>+989156461700</span>
                    </div>
                    <div style={{marginTop: 20, fontSize: 13}}>
                        I don't know who you are. But I'm gonna find you. And I'm gonna kill you!
                    </div>
                </div>

                <div style={{
                    width: '90%',
                    height: '15%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginInline: 'auto',
                }}>
                    <Button style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'nowrap',
                        marginBlock: 10,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}>
                        <DeleteIcon fontSize="medium"/>
                        <span style={{fontSize: 15, marginLeft: 10,}}>Delete Chat</span>
                    </Button>
                    <Button style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'nowrap',
                        marginBlock: 10,
                        color: 'red',
                        cursor: 'pointer',
                        marginTop: '-1%',
                        whiteSpace: 'nowrap'
                    }}>
                        <HighlightOffIcon fontSize="medium"/>
                        <span style={{fontSize: 15, marginLeft: 10,}}>Remove Contact</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ContactPanel;
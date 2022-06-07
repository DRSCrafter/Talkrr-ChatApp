import React from "react";
import Button from "@mui/material/Button";

function UserButton() {
    return (<Button style={styles.sideUserContainer}>
        <img src={require('../Assets/thumbnail (1).png')} style={styles.sideUserImg}/>
        <span style={styles.sideUserText}>
                <div style={styles.sideUserName}>John Smith</div>
                <div style={styles.sideUserMessage}>Yo man what's up...</div>
            </span>
    </Button>)
}

const styles = {
    sideUserContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '90%',
        height: 70,
        backgroundColor: 'rgba(256, 256, 256, 0.4)',
        color: '#ffffff',
        margin: "auto",
        marginTop: 10,
        borderRadius: 10,
        padding: 0,
        overflow: 'hidden',
        backdropFilter: "blur(4px)"
    },
    sideUserImg: {
        height: '85%', margin: "auto 0", marginLeft: 7
    },
    sideUserText: {
        display: 'flex',
        margin: "auto 0",
        marginLeft: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        whiteSpace: 'nowrap'
    },
    sideUserName: {fontSize: 17, color: 'black', textTransform: 'capitalize'},
    sideUserMessage: {fontSize: 12, color: 'rgb(71,71,71)', textTransform: 'capitalize'},
};

export default UserButton;
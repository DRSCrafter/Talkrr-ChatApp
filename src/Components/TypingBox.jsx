import React from "react";
import {IconButton} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function TypingBox() {
    return (
        <div style={{width: '100%', height: '12%'}}>
            <div style={styles.container}>
                <input className="input" placeholder="Type and Press Login to Send"
                       style={styles.input}/>
                <IconButton
                    style={styles.button}>
                    <SendIcon/>
                </IconButton>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        height: '75%',
        borderRadius: 200,
        margin: 'auto auto',
        backgroundColor: 'rgba(255,255,255,0.5)',
        backdropFilter: "blur(4px)"
    },
    input: {
        width: '90%',
        height: '100%',
        marginLeft: 15,
        outline: 0,
        background: 'none',
        border: 0,
        fontSize: 15
    },
    button: {
        display: 'flex',
        width: '10%',
        height: '90%',
        borderRadius: '100%',
        backgroundColor: 'dodgerblue',
        marginInline: 5,
    }
};

export default TypingBox;
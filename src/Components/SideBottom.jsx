import React from "react";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SideBottom() {
    return (
        <div style={styles.sideBottomSection}>
            <img src={require('../Assets/thumbnail (2).png')} style={{width: 50, height: 50}}
                 alt="Profile"/>
            <IconButton aria-label="Add" style={{width: 50, color: 'white'}}>
                <AddIcon fontSize="large" style={{color: 'white'}}/>
            </IconButton>
        </div>
    );
}

const styles = {
    sideBottomSection: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: 50,
        alignItems: 'center',
        width: '80%',
        height: '9%',
        margin: 'auto',
        marginTop: 10
    },
};

export default SideBottom;
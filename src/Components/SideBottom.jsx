import '../Styles/Components/SideBottom.css';
import React from "react";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SideBottom() {
    return (
        <div className="side-bottom-container">
            <img src={require('../Assets/thumbnail (2).png')} style={{width: 50, height: 50}}
                 alt="Profile"/>
            <IconButton aria-label="Add" style={{width: 50, color: 'white'}}>
                <AddIcon fontSize="large" style={{color: 'white'}}/>
            </IconButton>
        </div>
    );
}

export default SideBottom;
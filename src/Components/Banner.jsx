import '../Styles/Components/Banner.css';
import React from "react";

import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function Banner({onToggleDrawer}) {
    return (
        <div className="banner-container">
            <IconButton edge="start" style={{boxShadow: "none", color: '#ffffff', margin: '10px'}} onClick={onToggleDrawer(true)} size="large">
                <MenuIcon fontSize="medium"/>
            </IconButton>
            <img src={require('../Assets/logo.png')} style={{width: 50}} alt="Logo"/>
            <span className="banner-name">Talkrr</span>
        </div>
    );
}

export default Banner;
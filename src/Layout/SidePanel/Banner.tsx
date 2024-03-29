import '../../Styles/Layout/SidePanel/Banner.scss';
import React from "react";

import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import BannerProps from "../../types/layout/sidePanel/banner";

import logo from '../../Assets/logo.png';

function Banner({onToggleDrawer}: BannerProps) {
    return (
        <div className="banner">
            <IconButton edge="start" style={{boxShadow: "none", color: '#ffffff', margin: '10px'}} onClick={onToggleDrawer(true)} size="large">
                <MenuIcon fontSize="medium"/>
            </IconButton>
            <img src={logo} style={{width: 50}} alt="Logo"/>
            <span className="banner__title">Talkrr</span>
        </div>
    );
}

export default Banner;
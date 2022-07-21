import React from "react";
import '../Styles/Components/Banner.css';

function Banner() {
    return (
        <div className="banner-container">
            <img src={require('../Assets/logo.png')} style={{width: 50}} alt="Logo"/>
            <span className="banner-name">Talkrr</span>
        </div>
    );
}

export default Banner;
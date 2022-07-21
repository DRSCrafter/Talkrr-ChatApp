import React from "react";
import '../Styles/Components/MessagingHeader.css';

function MessagingHeader() {
    return (
        <div className="messaging-header-container">
            <img src={require('../Assets/thumbnail (1).png')} className="messaging-header-profile-image"/>
            <span className="messaging-header-profile-info">
                <div style={{fontSize: 22}}>John Smith</div>
                <div style={{fontSize: 13}}>Last seen in a month</div>
            </span>
        </div>
    );
}

export default MessagingHeader;
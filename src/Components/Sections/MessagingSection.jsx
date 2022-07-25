import React from "react";
import '../../Styles/Sections/MessagingSection.css';

import Message from "../Message";
import TypingBox from "../TypingBox";
import MessagingHeader from "../MessagingHeader";

function MessagingSection() {
    return (
        <span className="messaging-panel-root">
            <div className="messaging-panel-container">
                <MessagingHeader/>
                <div className="messages-container">
                    <Message/>
                    <Message isSent/>
                </div>
            </div>
            <TypingBox/>
        </span>
    );
}

export default MessagingSection;

import React from "react";
import '../Styles/Sections/MessagingSection.css';

import Message from "../Components/Message";
import TypingBox from "../Components/TypingBox";
import MessagingHeader from "../Components/MessagingHeader";

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

import React from "react";
import '../../Styles/Components/Sections/MessagingSection.css';

import Message from "../Message";
import TypingBox from "../TypingBox";
import MessagingHeader from "../MessagingHeader";

function MessagingSection({messages, self}) {
    return (
        <span className="messaging-panel-root">
            <div className="messaging-panel-container">
                <MessagingHeader/>
                <div className="messages-container">
                    {messages.map(message => (<Message message={message} isSent={message.sender.id === self._id} />))}
                </div>
            </div>
            <TypingBox/>
        </span>
    );
}

export default MessagingSection;

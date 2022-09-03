import '../Styles/Components/Message.css';
import React from "react";

function Message({isSent, message, onGetMember}) {
    const {content, sender, date} = message;

    const member = onGetMember(sender);

    return (
        <div style={styles.container(isSent)} className="message-container">
            <div className={ `message-body ${isSent ? "message-body-send" : "message-body-receive"}`}>
                {isSent ? null : <div style={{fontWeight: 'bold'}}>{member && member.name}</div>}
                <div style={{fontSize: 14}}>{content}</div>
                <div className="message-data">{date}</div>
            </div>
        </div>
    );
}

const styles = {
    container: isSent => ({direction: isSent ? 'rtl' : 'ltr'}),
};

export default Message;
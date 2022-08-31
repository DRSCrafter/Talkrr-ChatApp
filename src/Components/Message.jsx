import '../Styles/Components/Message.css';
import React, {useContext} from "react";
// import date from "date-and-time";

function Message({isSent, message}) {
    const {content, sender, date} = message;

    return (
        <div style={styles.container(isSent)} className="message-container">
            <div className={ isSent ? "message-body-send" : "message-body-receive"}>
                {isSent ? null : <div style={{fontWeight: 'bold'}}>{sender.name}</div>}
                <div style={{fontSize: 14}}>{content}</div>
                <div className="message-data">{date}</div>
            </div>
        </div>
    );
}

const styles = {
    container: isSent => ({
        height: isSent ? 80 : 90,
        direction: isSent ? 'rtl' : 'ltr'
    }),
};

export default Message;
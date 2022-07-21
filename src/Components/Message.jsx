import '../Styles/Components/Message.css';
import React from "react";
import date from "date-and-time";

function Message({isSent}) {
    return (
        <div style={styles.container(isSent)} className="message-container">
            <div className={ isSent ? "message-body-send" : "message-body-receive"}>
                {isSent ? null : <div style={{fontWeight: 'bold'}}>John Smith</div>}
                <div style={{fontSize: 14}}>Yo man what's up? haven't heard of you in a while.</div>
                <div className="message-data">{date.format(new Date(), 'ddd, MMM DD HH:mm')}
                </div>
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
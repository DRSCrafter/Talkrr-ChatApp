import React from "react";

import Message from "../Components/Message";
import TypingBox from "../Components/TypingBox";
import MessagingHeader from "../Components/MessagingHeader";

function MessagingSection() {
    return (<span style={styles.outerContainer}>
            <div
                style={styles.innerContainer}>
            <MessagingHeader/>
            <div style={{width: '100%', height: '75%'}}>
                <Message/>
                <Message isSent/>
            </div>
                </div>
            <TypingBox/>

        </span>);
}

const styles = {
    innerContainer: {
        width: '95%',
        height: '83%',
        margin: 'auto',
        marginInline: 10,
        borderRadius: 30,
        overflow: 'hidden',
        backdropFilter: "blur(10px)",
        boxShadow: '0px 0px 10px #333333'
    }, outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '55%',
        minWidth: 500,
        height: '100%',
        marginTop: 30
    }
};

export default MessagingSection;

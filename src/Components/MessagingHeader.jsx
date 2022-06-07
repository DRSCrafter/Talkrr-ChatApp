import React from "react";

function MessagingHeader() {
    return (
        <div style={{
            width: '100%',
            height: '13%',
            backgroundColor: 'rgba(46,47,50,0.59)',
            display: 'flex',
            alignItems: 'center'
        }}>
            <img src={require('../Assets/thumbnail (1).png')} style={styles.UserImg}/>
            <span style={styles.UserText}>
                        <div style={styles.UserName}>John Smith</div>
                        <div style={styles.UserMessage}>Last seen in a month</div>
                    </span>
        </div>
    );
}

const styles = {
    UserImg: {
        height: '75%', margin: "auto 0", marginLeft: 20
    }, UserText: {
        display: 'flex',
        margin: "auto 0",
        marginLeft: 12,
        flexDirection: 'column',
        whiteSpace: 'nowrap',
        color: 'white',
        fontFamily: 'Segoe UI Light',
    }, UserName: {fontSize: 22}, UserMessage: {fontSize: 13},
};

export default MessagingHeader;
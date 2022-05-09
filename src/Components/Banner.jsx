import React from "react";

function Banner() {
    return (
        <div style={styles.container}>
            <img src={require('../Assets/logo.png')} style={{width: 50}} alt="Logo"/>
            <span style={styles.appName}>Talkrr</span>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex', width: '100%', marginBlock: 15
    }, appName: {
        fontFamily: 'Debby Script', fontSize: 35, color: "white", marginLeft: 20
    },
};

export default Banner;
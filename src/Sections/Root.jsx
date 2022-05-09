import React from "react";

function Root({children}) {
    return (
        <div style={{overflowX: 'hidden'}}>
            <img
                src={require("../Assets/Background/Background (2).jpg")}
                style={{...styles.background, zIndex: -2, overflowX: 'hidden'}}
                alt="background"/>
            <img className="background"
                 src={require("../Assets/Background/Background (2).jpg")}
                 style={{...styles.background, zIndex: -1, filter: 'blur(10px)', overflowX: 'hidden'}}
                 alt="background"/>
            <span style={{display: 'flex'}}>
                {children}
            </span>
        </div>
    );
}

const styles = {
    background: {
        width: '100vw', height: '100vh', position: 'absolute',
    },
};

export default Root;
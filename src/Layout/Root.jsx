import '../Styles/Layout/Root.css';
import React from "react";

function Root({children}) {
    return (
        <div style={{height: '100vh', overflow: 'hidden'}}>
            <img
                src={require("../Assets/Background/Background (2).jpg")}
                className="root-background"
                alt="background"/>
            <span className="root-container">
                {children}
            </span>
        </div>
    );
}

export default Root;
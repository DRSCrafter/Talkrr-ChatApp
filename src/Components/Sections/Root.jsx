import '../../Styles/Sections/Root.css';
import React from "react";

function closeWindow() {
    window.__TAURI__.process.exit();
}

function Root({children}) {
    return (
        <div style={{overflow: 'hidden'}}>
            <img
                src={require("../../Assets/Background/Background (2).jpg")}
                className="root-background"
                alt="background"/>
            <span className="root-container">
                {children}
            </span>
        </div>
    );
}

export default Root;
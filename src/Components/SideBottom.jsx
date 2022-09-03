import '../Styles/Components/SideBottom.css';
import React from "react";
import AddButton from "./addButton";

function SideBottom() {
    return (
        <div className="side-bottom-container">
            <img src={require('../Assets/thumbnail (2).png')} style={{width: 50, height: 50}}
                 alt="Profile"/>
            <AddButton/>
        </div>
    );
}

export default SideBottom;
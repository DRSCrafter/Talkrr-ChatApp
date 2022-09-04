import '../../Styles/Components/Sections/SidePanel.css';
import React from "react";

import UserButton from "../UserButton";
import SearchBar from "../SearchBar";
import Banner from "../Banner";

function SidePanel({talks, onToggleDrawer}) {
    return (<>
            <span className="side-panel-container">
                <Banner onToggleDrawer={onToggleDrawer}/>
                <SearchBar/>
                <div className="users-container">
                    {talks && talks.map((talk, index) => (<UserButton key={index} talk={talk}/>))}
                </div>
            </span>
    </>);
}

export default SidePanel;

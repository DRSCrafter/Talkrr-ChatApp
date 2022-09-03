import '../../Styles/Components/Sections/SidePanel.css';
import React from "react";

import UserButton from "../UserButton";
import SearchBar from "../SearchBar";
import SideBottom from "../SideBottom";
import Banner from "../Banner";

function SidePanel({talks}) {
    return (<>
            <span className="side-panel-container">
                <Banner/>
                <SearchBar/>
                <div className="users-container">
                    {talks && talks.map((talk, index) => (<UserButton key={index} talk={talk}/>))}
                </div>
                <SideBottom/>
            </span>
    </>);
}

export default SidePanel;

import '../../App.css';
import '../../Styles/Components/Sections/SidePanel.css';

import UserButton from "../UserButton";
import SearchBar from "../SearchBar";
import SideBottom from "../SideBottom";
import Banner from "../Banner";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../Context/userContext";

function SidePanel({talks}) {
    const {user, handleUpdateUser} = useContext(UserContext);

    return (<>
            <span className="side-panel-container">
                <Banner/>
                <SearchBar/>
                <div className="users-container">
                    {talks && talks.map(talk => (<UserButton talk={talk}/>))}
                </div>
                <SideBottom/>
            </span>
    </>);
}

export default SidePanel;

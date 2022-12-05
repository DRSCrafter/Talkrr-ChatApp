import '../Styles/Layout/Root.css';
import React, {useContext} from "react";
import UserContext from "../Context/userContext";

function Root({children}) {
    const {isNative} = useContext(UserContext);

    return (
        <div style={{overflow: 'hidden'}}>
            <img
                src={require("../Assets/Background/Background (2).jpg")}
                className={`root-background ${isNative && 'root-app-height root-app-border'}`}
                alt="background"/>
            <span className={`root-container ${isNative && 'root-app-height'}`}>
                {children}
            </span>
        </div>
    );
}

export default Root;
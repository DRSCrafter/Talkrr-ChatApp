import '../Styles/Layout/Root.css';
import React, {useContext} from "react";
import UserContext from "../Context/userContext.js";

import background from "../Assets/Background/Background (2).jpg";

function Root({children}: {children: React.ReactNode}) {
    const {isNative} = useContext(UserContext);

    return (
        <div style={{overflow: 'hidden'}}>
            <img
                src={background}
                className={`root-background ${isNative && 'root-app-height root-app-border'}`}
                alt="background"/>
            <span className={`root-container ${isNative && 'root-app-height'}`}>
                {children}
            </span>
        </div>
    );
}

export default Root;
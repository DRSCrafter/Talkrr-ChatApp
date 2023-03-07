import '../Styles/Layout/Root.scss';
import React, {useContext} from "react";
import UserContext from "../Context/userContext.js";

import background from "../Assets/Background/Background (2).jpg";

function Root({children}: {children: React.ReactNode}) {
    const {isNative} = useContext(UserContext);

    return (
        <div style={{overflow: 'hidden'}}>
            <img
                src={background}
                className={`root__background ${isNative && 'root__app__height root__app__border'}`}
                alt="background"/>
            <span className={`root__container ${isNative && 'root__app__height'}`}>
                {children}
            </span>
        </div>
    );
}

export default Root;
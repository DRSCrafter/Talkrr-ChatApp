import '../Styles/Layout/loading.css';
import React from 'react';

import logo from '../Assets/logo.png';

function Loading() {
    return (
        <div className="loading-root">
            {/*<picture>*/}
            {/*    <source srcSet="logo.webp" type="image/webp"/>*/}
            <img src={logo} className="loading-logo" alt="Logo"/>
            {/*</picture>*/}
            <div className="loading-text">Now Loading...</div>
        </div>
    );
}

export default Loading;
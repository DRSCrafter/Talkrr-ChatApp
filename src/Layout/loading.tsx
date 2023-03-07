import '../Styles/Layout/loading.scss';
import React from 'react';

import logo from '../Assets/logo.png';

function Loading() {
    return (
        <div className="loading__root">
            {/*<picture>*/}
            {/*    <source srcSet="logo.webp" type="image/webp"/>*/}
            <img src={logo} className="loading__logo" alt="Logo"/>
            {/*</picture>*/}
            <div className="loading__text">Now Loading...</div>
        </div>
    );
}

export default Loading;
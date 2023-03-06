import React from "react";

export default interface LottieLoader {
    animationData: JSON<any>,
    width?: string | number,
    height?: string | number,
    style?: React.CSSProperties
}
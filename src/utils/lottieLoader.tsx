import {useEffect, useRef} from "react";
import lottie from "lottie-web";
import LottieLoaderProps from "../types/utils/lottieLoader";

function LottieLoader({animationData, width='100%', height='100%', style}: LottieLoaderProps) {
    const element = useRef(null)
    const lottieInstance = useRef<any>();

    useEffect(() => {
        if (element.current) {
            lottieInstance.current = lottie.loadAnimation({
                container: element.current,
                loop: true,
                autoplay: true,
                animationData,
            });
            lottieInstance.current!.setSpeed(0.5);
        }
        return () => {
            lottieInstance.current?.destroy()
        }
    }, [animationData])

    return (
        <>
            <div style={{width, height, ...style}} ref={element}/>
        </>
    );
}

export default LottieLoader;
import React, { useEffect, useRef } from 'react';
import flv from "flv.js";
const MainShowContainer2  = ({l_code}) => {
    const videoRef = useRef();

    const buildPlayer = () => {
        const player = flv.createPlayer({
          type: "flv",
          url: `https://teamstance.shop:8443/live/${l_code}.flv`,
        });
        player.attachMediaElement(videoRef.current);
        player.load();
    };

    useEffect(() => {
        buildPlayer();
    }, []);

    return (
        <>
            {/* <video ref={videoRef} style={{ width: "100%" }} controls /> */}
            <video ref={videoRef} style={{ height: "49vh" }} controls />
        </>
    );
};

export default MainShowContainer2 ;
import React, { useEffect, useRef } from 'react';
import flv from "flv.js";
const MainStreamingListContainer = ({l_code}) => {
    const videoRef = useRef();

    const buildPlayer = () => {
        const player = flv.createPlayer({
          type: "flv",
          url: `https://localhost:8443/live/${l_code}.flv`,
        });
        player.attachMediaElement(videoRef.current);
        player.load();
    };

    useEffect(() => {
        buildPlayer();
    }, []);

    return (
        <>
            <video ref={videoRef} style={{ width: "100%" }} controls />
        </>
    );
};

export default MainStreamingListContainer;
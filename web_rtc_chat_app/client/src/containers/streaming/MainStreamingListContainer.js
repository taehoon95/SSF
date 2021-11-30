import React, { useEffect, useRef } from 'react';
import flv from "flv.js";
import { useDispatch } from 'react-redux';
import { showStreamingByLnum } from '../../modules/streaming';
const MainStreamingListContainer = ({l_code}) => {
    const videoRef = useRef();
    const dispatch = useDispatch();

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
        <div>
            <video ref={videoRef} style={{ width: "70%" }} controls />
        </div>
    );
};

export default MainStreamingListContainer;
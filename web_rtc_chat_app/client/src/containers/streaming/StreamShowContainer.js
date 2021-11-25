import React, { useEffect, useRef, useState } from 'react';
import flv from 'flv.js';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteStreaming } from '../../modules/streaming';


// 2021 1125 이태훈 streaming show page
const StreamShow = () => {
    const {l_code} = useParams();
    const dispatch = useDispatch();

    const videoRef = useRef();
    const [offStreaming, setOffStreaming] = useState(false);
    
    useEffect(() => {
        buildPlayer()
    },[offStreaming])

    const buildPlayer = () => {
        const player = flv.createPlayer({
          type: 'flv',
          url: `https://localhost:8443/live/${l_code}.flv`
        });

        player.attachMediaElement(videoRef.current);
        player.load();
        if(offStreaming){
            player.destroy();
            dispatch(deleteStreaming(l_code))
        }
    }

    const offStreamingbtn = () => {
        setOffStreaming(true);
    }

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }} controls />
            <input type='button' value="방송종료" onClick={offStreamingbtn}/>
            <h1>방송중</h1>
            <h5>방송중 22</h5>
        </div>
    );
};

export default StreamShow;
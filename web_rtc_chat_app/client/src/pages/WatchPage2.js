/* 
20211115 이태훈 
비디오 보는 페이지 테스트중
*/

import React from 'react';

const WatchPage2 = () => {
    const cdn = "https://d3lafl73dhs1s7.cloudfront.net/";
    return (
        <video controls autoPlay loop muted>
            <source src="https://d3lafl73dhs1s7.cloudfront.net/Waves%20-%2070796.mp4" type="video/mp4" />
        </video>
    );
};

export default WatchPage2;
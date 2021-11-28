import React from 'react';
import StreamListContainer from '../containers/streaming/StreamListContainer';
import { ContextProvider } from '../SocketContext';

const StreamingListPage = () => {
    return (
        <div>
            <ContextProvider>
            <StreamListContainer/>
            </ContextProvider>
        </div>
    );
};

export default StreamingListPage;
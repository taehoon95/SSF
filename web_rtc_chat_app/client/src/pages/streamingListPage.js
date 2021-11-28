import React from 'react';
import StreamListContainer from '../containers/streaming/StreamListContainer';
import { ContextProvider } from '../SocketContext';

const streamingListPage = () => {
    return (
        <div>
            <ContextProvider>
            <StreamListContainer/>
            </ContextProvider>
        </div>
    );
};

export default streamingListPage;
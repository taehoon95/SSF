import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import StreamListContainer from '../containers/streaming/StreamListContainer';
import { ContextProvider } from '../SocketContext';

const StreamingListPage = () => {
    return (
        <>
            <Header />
            <ContextProvider>
            <StreamListContainer/>
            </ContextProvider>

        </>
    );
};

export default StreamingListPage;
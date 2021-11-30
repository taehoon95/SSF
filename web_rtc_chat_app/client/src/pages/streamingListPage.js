import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import StreamListContainer from '../containers/streaming/StreamListContainer';
import { ContextProvider } from '../SocketContext';

const StreamingListPage = () => {
    return (
        <div>
            <Header />
            <ContextProvider>
            <StreamListContainer/>
            </ContextProvider>
            <Footer />
        </div>
    );
};

export default StreamingListPage;
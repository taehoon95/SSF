import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import SearchResultContainer from '../containers/auth/SearchResultContainer';

const searchResultPage = () => {
    return (
        <div>
            <Header />
            <SearchResultContainer />
            <Footer />
        </div>
    );
};

export default searchResultPage;
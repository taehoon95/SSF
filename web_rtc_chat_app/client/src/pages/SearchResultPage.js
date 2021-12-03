import React from 'react';
import Header from '../components/common/Header';
import SearchResultContainer from '../containers/auth/SearchResultContainer';

const searchResultPage = () => {
    return (
        <>
            <Header />
            <SearchResultContainer />
        </>
    );
};

export default searchResultPage;
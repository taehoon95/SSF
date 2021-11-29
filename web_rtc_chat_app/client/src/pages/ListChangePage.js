import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import ListChagneContainer from "../containers/auth/ListChangeContainer";

const ListChangePage = () => {
  return (
    <>
      <Header />
        <ListChagneContainer/>
      <Footer />
    </>
  );
};

export default ListChangePage;

import React from "react";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import PropTypes from "prop-types";
import "./app.css";

const App = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;

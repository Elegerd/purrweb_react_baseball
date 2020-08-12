import ReactLoading from "react-loading";
import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className={"spinner__container"}>
      <ReactLoading
        className={"spinner"}
        delay={1}
        type={"bubbles"}
        color={"#48BBFF"}
        width={"5%"}
      />
    </div>
  );
};

export default Spinner;

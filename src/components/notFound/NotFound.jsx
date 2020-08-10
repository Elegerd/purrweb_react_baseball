import React from "react";
import baseballImg from "@assets/img/baseball.svg";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__nf-container">
        <div className="nf-container__baseball-svg">
          <h3>
            4<span style={{ backgroundImage: `url(${baseballImg})` }} />4
          </h3>
        </div>
        <h3 className="nf-container__text">
          <span>Page Not Found!</span>
        </h3>
      </div>
    </div>
  );
};

export default NotFound;

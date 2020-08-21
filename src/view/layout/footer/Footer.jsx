import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="legal">
        <span>© 2018 BaseballCloud</span>
        <Link to="/legal/terms"> Terms of Service </Link>
        <Link to="/legal/privacy"> Privacy Policy </Link>
      </div>
      <div className="socialMedia">
        <a href="https://baseballcloud.blog" rel="noreferrer" target="_blank">
          Blog
        </a>
        <a
          href="http://twitter.com/baseballcloudus"
          rel="noreferrer"
          target="_blank"
        >
          Twitter
        </a>
        <a
          href="http://www.instagram.com/baseballcloudus/"
          rel="noreferrer"
          target="_blank"
        >
          Instagram
        </a>
        <a
          href="http://www.facebook.com/BaseballCloudUS/"
          rel="noreferrer"
          target="_blank"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;

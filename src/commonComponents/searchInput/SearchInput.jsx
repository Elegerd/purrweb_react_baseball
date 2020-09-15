import React from "react";
import { ReactComponent as Search } from "@assets/svg/search.svg";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";
import "./searchInput.css";

const SearchInput = ({ ...rest }) => {
  return (
    <div className="search-input">
      <button className="search-input__button">
        <span>
          <Search />
        </span>
      </button>
      <DebounceInput
        debounceTimeout={500}
        className="search-input__input"
        {...rest}
      />
    </div>
  );
};

SearchInput.propTypes = {};

export default SearchInput;

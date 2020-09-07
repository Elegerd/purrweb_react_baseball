import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "./customDatePicker.css";

const CustomDatePicker = ({ ...rest }) => {
  return (
    <div className="custom-datepicker">
      <DatePicker {...rest} />
    </div>
  );
};

CustomDatePicker.propTypes = {};

export default CustomDatePicker;

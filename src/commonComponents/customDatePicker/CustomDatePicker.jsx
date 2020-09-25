import React, { memo } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import "./customDatePicker.css";

const CustomDatePicker = ({ ...rest }) => {
  return (
    <div className="custom-datepicker">
      <DatePicker {...rest} />
    </div>
  );
};

CustomDatePicker.propTypes = {};

export default memo(CustomDatePicker);

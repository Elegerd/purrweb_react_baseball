import React, { memo } from "react";
import PropTypes from "prop-types";
import { toBase64 } from "@helpers/utilities";

const AvatarInput = ({
  input: { onChange, value, ...input },
  meta,
  ...rest
}) => {
  const handleOnChange = async ({ target }) => {
    const file = target.files.length ? target.files[0] : undefined;
    file.base64 = await toBase64(file);
    onChange(file);
  };
  return (
    <>
      <input onChange={handleOnChange} {...input} {...rest} />
      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </>
  );
};

AvatarInput.propTypes = {
  input: PropTypes.object,
  onChange: PropTypes.func,
  meta: PropTypes.object,
};

export default memo(AvatarInput);

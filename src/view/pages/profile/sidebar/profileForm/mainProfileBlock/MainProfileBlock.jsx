import React, { memo } from "react";
import { Field } from "react-final-form";
import { required } from "@helpers/validators";
import CustomInput from "@commonComponents/customInput/CustomInput";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import { positionOptions } from "@constants";
import PropTypes from "prop-types";

const MainProfileBlock = ({
  profile,
  defaultValues: { position, position2 },
}) => {
  return (
    <>
      <div className="edit-profile__names">
        <Field
          name="first_name"
          type="text"
          validate={required}
          defaultValue={profile.first_name}
          placeholder={"First Name *"}
          title={"First Name *"}
          component={CustomInput}
        />
        <Field
          defaultValue={profile.last_name}
          name="last_name"
          type="text"
          validate={required}
          placeholder={"Last Name *"}
          title={"Last Name *"}
          component={CustomInput}
        />
      </div>
      <div className="edit-profile__position">
        <Field
          name="position"
          defaultValue={position}
          placeholder={"Position in Game *"}
          title={"Position in Game *"}
          options={positionOptions}
          component={CustomSelect}
        />
      </div>
      <div className="edit-profile__position2">
        <Field
          name="position2"
          defaultValue={position2}
          placeholder={"Secondary Position in Game"}
          options={[{ value: undefined, label: "-" }, ...positionOptions]}
          component={CustomSelect}
        />
      </div>
    </>
  );
};

MainProfileBlock.propTypes = {
  profile: PropTypes.object,
  defaultValues: PropTypes.object,
};

export default memo(MainProfileBlock);

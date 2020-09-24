import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import { useSelector } from "react-redux";
import { getFacilitiesIsLoading } from "@ducks/facilities/selector";
import PropTypes from "prop-types";

const FacilityProfileBlock = ({ profileFacilities, facilities }) => {
  const isLoadingFacilities = useSelector(getFacilitiesIsLoading);
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const facultyOptions = facilities.map((faculty) => {
    return { value: faculty.id, label: faculty.u_name };
  });

  useEffect(() => {
    if (!isLoadingFacilities)
      setSelectedFacilities(
        facultyOptions.filter((option) =>
          profileFacilities.map((value) => value.id).includes(option.value)
        )
      );
  }, [isLoadingFacilities]);

  return (
    <>
      <div className="edit-profile__block-text">Facility</div>
      <div className="edit-profile__facility">
        <Field
          defaultValue={selectedFacilities}
          name="facilities"
          render={(props) => (
            <CustomSelect
              isLoading={isLoadingFacilities}
              isMulti={true}
              isClearable={false}
              isSearchable={true}
              placeholder={"Facility"}
              options={facultyOptions}
              {...props}
            />
          )}
        />
      </div>
    </>
  );
};

FacilityProfileBlock.propTypes = {
  profileFacilities: PropTypes.array,
  facilities: PropTypes.array,
};

export default FacilityProfileBlock;

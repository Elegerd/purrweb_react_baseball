import React, { memo, useEffect, useMemo, useState } from "react";
import { Field } from "react-final-form";
import CustomSelect from "@commonComponents/customSelect/CustomSelect";
import { useSelector } from "react-redux";
import { getTeamsIsLoading } from "@ducks/teams/selector";
import { getSchoolsIsLoading } from "@ducks/schools/selector";
import { schoolYearOptions } from "@constants";
import PropTypes from "prop-types";

const SchoolProfileBlock = ({
  profileSchool,
  schools,
  profileTeams,
  teams,
  defaultValues: { school_year },
}) => {
  const isLoadingSchool = useSelector(getSchoolsIsLoading);
  const isLoadingTeams = useSelector(getTeamsIsLoading);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const schoolOptions = useMemo(
    () =>
      schools.map((school) => {
        return { value: school.id, label: school.name };
      }),
    [schools]
  );

  const teamOptions = useMemo(
    () =>
      teams.map((team) => {
        return { value: team.id, label: team.name };
      }),
    [teams]
  );

  useEffect(() => {
    if (!isLoadingSchool)
      setSelectedSchool(
        schoolOptions.find(
          (option) =>
            option.value === (profileSchool ? profileSchool.id : undefined)
        )
      );
    if (!isLoadingTeams)
      setSelectedTeams(
        teamOptions.filter((option) =>
          profileTeams.map((value) => value.id).includes(option.value)
        )
      );
  }, [isLoadingSchool, isLoadingTeams]);

  return (
    <>
      <div className="edit-profile__block-title">
        <div className="edit-profile__block-text">School</div>
      </div>
      <div className="edit-profile__school">
        <Field
          defaultValue={selectedSchool}
          name="school"
          render={(props) => (
            <CustomSelect
              isLoading={isLoadingSchool}
              isSearchable={true}
              placeholder={"School"}
              options={schoolOptions}
              {...props}
            />
          )}
        />
      </div>
      <div className="edit-profile__school-year">
        <Field
          name="school_year"
          defaultValue={school_year}
          render={(props) => (
            <CustomSelect
              isSearchable={true}
              placeholder={"School Year"}
              options={schoolYearOptions}
              {...props}
            />
          )}
        />
      </div>
      <div className="edit-profile__teams">
        <Field
          defaultValue={selectedTeams}
          name="teams"
          render={(props) => (
            <CustomSelect
              isLoading={isLoadingTeams}
              isMulti={true}
              isClearable={false}
              isSearchable={true}
              placeholder={"Team"}
              options={teamOptions}
              {...props}
            />
          )}
        />
      </div>
    </>
  );
};

SchoolProfileBlock.propTypes = {
  profileSchool: PropTypes.object,
  schools: PropTypes.array,
  profileTeams: PropTypes.array,
  teams: PropTypes.array,
  defaultValues: PropTypes.object,
};

export default memo(SchoolProfileBlock);

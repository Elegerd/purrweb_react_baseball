import React from "react";
import HiddenInput from "@commonComponents/hiddenInput/HiddenInput";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import { filterFavorite, filterPositions, filterShow } from "@constants";
import Menu, { Item as MenuItem } from "rc-menu";
import { getObjectById } from "@helpers/utilities";
import PropTypes from "prop-types";

const NetworkFilter = ({
  schoolName,
  teamName,
  age,
  favorite,
  position,
  show,
}) => {
  const renderMenu = (items, onClick) => {
    return (
      <Menu selectable={false} onClick={onClick} className="dropdown-panel">
        {items.map((item) => (
          <MenuItem
            className="dropdown-panel__item"
            data-item={item.id}
            key={item.id}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const handleOnClickItem = (array, setField) => (e) => {
    const type = getObjectById(array, e.item.props["data-item"]);
    setField(type);
  };

  return (
    <div className="n-header-filters">
      <div className="n-header-filters__school">
        <HiddenInput
          value={schoolName}
          inputClass={"n-header-filters__input-school"}
          arrowContainerClass={"n-header-filters__arrow-hidden"}
          name={"school"}
          placeholder={"School"}
          onChange={onChangeSchoolName}
        />
      </div>
      <div className="n-header-filters__team">
        <HiddenInput
          value={teamName}
          inputClass={"n-header-filters__input-team"}
          arrowContainerClass={"n-header-filters__arrow-hidden"}
          name={"team"}
          placeholder={"Team"}
          onChange={onChangeTeamName}
        />
      </div>
      <div className="n-header-filters__position">
        <ButtonDropdown
          trigger={["click"]}
          text={`${position.field ? `${position.title}` : "Position"}`}
          buttonClass={"n-header-filters__button"}
          arrowContainerClass={"n-header-filters__arrow"}
          overlay={renderMenu(
            filterPositions,
            handleOnClickItem(filterPositions, setPost)
          )}
        />
      </div>
      <div className="n-header-filters__age">
        <HiddenInput
          value={age}
          inputClass={"n-header-filters__input-age"}
          arrowContainerClass={"n-header-filters__arrow-hidden"}
          type={"number"}
          min={6}
          max={30}
          name={"age"}
          placeholder={"Age"}
          onChange={onChangeAge}
        />
      </div>
      <div className="n-header-filters__favorite">
        <ButtonDropdown
          trigger={["click"]}
          text={`${favorite.field ? `${favorite.title}` : "All"}`}
          buttonClass={"n-header-filters__button"}
          arrowContainerClass={"n-header-filters__arrow"}
          overlay={renderMenu(
            filterFavorite,
            haonChangeFavoritendleOnClickFavoriteItem
          )}
        />
      </div>
      <div className="n-header-filters__show">
        <ButtonDropdown
          trigger={["click"]}
          text={`Show: ${show.title}`}
          buttonClass={"n-header-filters__button"}
          arrowContainerClass={"n-header-filters__arrow"}
          overlay={renderMenu(filterShow, handleOnClickShowItem)}
        />
      </div>
    </div>
  );
};

NetworkFilter.propTypes = {};

export default NetworkFilter;

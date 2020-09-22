import React, { useEffect, useState } from "react";
import HiddenInput from "@commonComponents/hiddenInput/HiddenInput";
import ButtonDropdown from "@commonComponents/buttonDropdown/ButtonDropdown";
import {
  filterFavorite,
  filterPositions,
  filterShow,
  networkHeader,
} from "@constants/index";
import Menu, { Item as MenuItem } from "rc-menu";
import { getObjectById } from "@helpers/utilities";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfilesData } from "@ducks/profiles/profilesRoutines";
import Pagination from "react-paginate";
import {
  getProfiles,
  getProfilesIsLoading,
} from "@ducks/profiles/profilesSelector";
import Spinner from "@commonComponents/spinner/Spinner";
import SearchInput from "@commonComponents/searchInput/SearchInput";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartO } from "@fortawesome/free-regular-svg-icons";
import { updateFavoriteProfileRequest } from "@helpers/request/profileRequest";
import "./network.css";

const Network = () => {
  const dispatch = useDispatch();
  const profileList = useSelector(getProfiles);
  const isLoadingProfiles = useSelector(getProfilesIsLoading);
  const [activePage, setActivePage] = useState(0);
  const [show, setShow] = useState(filterShow[0]);
  const [schoolName, setSchoolName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState(filterPositions[0]);
  const [favorite, setFavorite] = useState(filterFavorite[0]);
  const [age, setAge] = useState("");

  useEffect(() => {
    const offset = activePage ? Math.ceil(activePage * show.field) : 0;
    dispatch(
      fetchProfilesData({
        offset,
        profiles_count: show.field,
        age: age || undefined,
        favorite: favorite.field ? 1 : undefined,
        player_name: playerName || undefined,
        position: position.field || undefined,
        school: schoolName || undefined,
        team: teamName || undefined,
      })
    );
  }, [
    show,
    schoolName,
    teamName,
    playerName,
    position,
    age,
    favorite,
    activePage,
  ]);

  const handleOnClickShowItem = (e) => {
    const type = getObjectById(filterShow, e.item.props["data-item"]);
    setShow(type);
  };

  const handleOnClickPositionItem = (e) => {
    const type = getObjectById(filterPositions, e.item.props["data-item"]);
    setPosition(type);
  };

  const handleOnClickFavoriteItem = (e) => {
    const type = getObjectById(filterFavorite, e.item.props["data-item"]);
    setFavorite(type);
  };

  const handleOnClickFavorite = (data) => async () => {
    await updateFavoriteProfileRequest(data);
    const offset = activePage ? Math.ceil(activePage * show.field) : 0;
    dispatch(
      fetchProfilesData({
        offset,
        profiles_count: show.field,
        age: age || undefined,
        favorite: favorite.field ? 1 : undefined,
        player_name: playerName || undefined,
        position: position.field || undefined,
        school: schoolName || undefined,
        team: teamName || undefined,
      })
    );
  };

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

  const handlePageChange = (data) => {
    let selected = data.selected;
    setActivePage(selected);
  };

  const renderHeader = () => {
    return (
      <div className="c-table__header">
        <div className="ss-table__header network-table__header">
          {networkHeader.map((item, index) => (
            <div className="network__header-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRows = () => {
    return (
      profileList &&
      profileList.profiles.map((item, index) => (
        <div key={index} className="network-row network__row c-table__row">
          <div className="network-row__item">
            <Link className="network-row__link" to={`/profile/${item.id}`}>
              {`${item.first_name} ${item.last_name}`}
            </Link>
          </div>
          <div className="network-row__item">
            {item.events.length ? item.events.length : "-"}
          </div>
          <div className="network-row__item">
            {item.school ? item.school.name : "-"}
          </div>
          <div className="network-row__item">
            {item.teams.length ? item.teams[0].name : "-"}
          </div>
          <div className="network-row__item">{item.age || "-"}</div>
          <div className="network-row__item">
            <FontAwesomeIcon
              className="icon blue-icon icon-button"
              onClick={handleOnClickFavorite({
                profile_id: item.id,
                favorite: !item.favorite,
              })}
              icon={item.favorite ? faHeart : faHeartO}
            />
          </div>
        </div>
      ))
    );
  };

  return (
    <div className="network__container">
      <div className="network">
        <div className="network__header">
          <div className="network__header-title">Network</div>
          <div className="n-header-filters">
            <div className="n-header-filters__school">
              <HiddenInput
                value={schoolName}
                inputClass={"n-header-filters__input-school"}
                arrowContainerClass={"n-header-filters__arrow-hidden"}
                name={"school"}
                placeholder={"School"}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div className="n-header-filters__team">
              <HiddenInput
                value={teamName}
                inputClass={"n-header-filters__input-team"}
                arrowContainerClass={"n-header-filters__arrow-hidden"}
                name={"team"}
                placeholder={"Team"}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="n-header-filters__position">
              <ButtonDropdown
                trigger={["click"]}
                text={`${position.field ? `${position.title}` : "Position"}`}
                buttonClass={"n-header-filters__button"}
                arrowContainerClass={"n-header-filters__arrow"}
                overlay={renderMenu(filterPositions, handleOnClickPositionItem)}
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
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="n-header-filters__favorite">
              <ButtonDropdown
                trigger={["click"]}
                text={`${favorite.field ? `${favorite.title}` : "All"}`}
                buttonClass={"n-header-filters__button"}
                arrowContainerClass={"n-header-filters__arrow"}
                overlay={renderMenu(filterFavorite, handleOnClickFavoriteItem)}
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
        </div>
        <div className="network__filter">
          <div className="n-filter__total-count">
            Available Players
            {profileList ? ` (${profileList.total_count})` : " (-)"}
          </div>
          <div className="n-filter__player-name">
            <SearchInput
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Player Name"
              name="player_name"
            />
          </div>
        </div>
        <div className="network__content">
          <div className="network__table c-table">
            {renderHeader()}
            {isLoadingProfiles ? (
              <div className="network__spinner-container">
                <Spinner />
              </div>
            ) : profileList && profileList.total_count ? (
              <>
                <div className="c-table__content">{renderRows()}</div>
                <Pagination
                  previousLabel={"«"}
                  nextLabel={"»"}
                  forcePage={activePage}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  disabledClassName={"disabled"}
                  marginPagesDisplayed={1}
                  pageCount={Math.ceil(profileList.total_count / show.field)}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="network-table__empty c-table__content">
                {"There's no info yet!"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;

import React, { useState } from "react";
import "./charts.css";
import Menu, { Item as MenuItem } from "rc-menu";
import { ReactComponent as Arrow } from "@assets/svg/arrow2.svg";
import Dropdown from "rc-dropdown";

const Charts = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuTypeItems = [
    <MenuItem className="dropdown-panel__item" key="None">
      None
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Four Seam Fastball">
      Four Seam Fastball
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Two Seam Fastball">
      Two Seam Fastball
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Curveball">
      Curveball
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Changeup">
      Changeup
    </MenuItem>,
    <MenuItem className="dropdown-panel__item" key="Slider">
      Slider
    </MenuItem>,
  ];

  const handleOnClickItem = (e) => {
    setSelectedItem(e.key !== "None" ? e.key : null);
  };

  const menuType = (
    <Menu
      selectable={false}
      onClick={handleOnClickItem}
      className="dropdown-panel dropdown-statistic"
    >
      {menuTypeItems}
    </Menu>
  );

  return (
    <div className="charts__wrapper">
      <div className="charts__actions">
        <div className="charts__pitch-type">
          <Dropdown trigger={["click"]} overlay={menuType}>
            <button>
              Pitch Type {selectedItem ? `(${selectedItem})` : null}
              <span className="charts-actions__arrow">
                <Arrow />
              </span>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="charts__content">
        {true ? "There's no info yet!" : null}
      </div>
    </div>
  );
};

export default Charts;

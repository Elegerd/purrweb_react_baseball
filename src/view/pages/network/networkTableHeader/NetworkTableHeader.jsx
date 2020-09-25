import React, { memo } from "react";
import { networkHeader } from "@constants";

const NetworkTableHeader = () => {
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

export default memo(NetworkTableHeader);

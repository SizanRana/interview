import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

export const RoleRecustionEndPoint = ({
  type,
  parentLink,
  onDataChange,
  isDisabled,
  value,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [updateData]);

  const handleDataChange = (link) => {
    onDataChange(link);
    setUpdateData(!updateData);
  };

  return (
    <div>
      {type === "switch" ? (
        <div className="form-switch form-check-primary">
          <Input
            type="switch"
            style={{ height: "20px" }}
            // defaultChecked={localValue}
            checked={localValue}
            disabled={isDisabled}
            onChange={() => {
              handleDataChange(parentLink);
            }}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div>
          <Input
            type="checkbox"
            checked={value.edit}
            disabled={isDisabled}
            onClick={() => {
              handleDataChange(`${parentLink}.edit`);
            }}
            className="cursor-pointer"
          />

          <Input
            type="checkbox"
            checked={value.view}
            disabled={isDisabled}
            onChange={() => {
              handleDataChange(`${parentLink}.view`);
            }}
            className="cursor-pointer ms-4"
          />
        </div>
      )}
    </div>
  );
};

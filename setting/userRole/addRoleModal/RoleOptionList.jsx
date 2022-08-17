import React from "react";
import { Row } from "reactstrap";
import { RoleRecustion } from "./roleRecursion";

const RoleOptionList = ({
  roleStructure,
  roleData,
  updateRoleData,
  isDisabled = false,
}) => {
  const handleDataChange = (data) => {
    const nodes = data.split(".");
    nodes.reduce((accumulator, node) => {
      if (typeof accumulator[node] === "boolean") {
        switch (node) {
          case "edit":
            if (!accumulator.edit) {
              accumulator.view = !accumulator[node];
            }
            accumulator[node] = !accumulator[node];
            break;
          case "view":
            if (accumulator.view) {
              accumulator.edit = !accumulator[node];
            }
            accumulator[node] = !accumulator[node];
            break;

          default:
            accumulator[node] = !accumulator[node];
            break;
        }
      }
      return accumulator[node];
    }, roleData);
    updateRoleData({ ...roleData });
  };

  return (
    <div>
      {roleData &&
        Object.entries(roleStructure).map((role, i) => {
          return (
            <Row className="mt-2">
              <RoleRecustion
                key={i}
                values={roleData[role[0]]}
                entries={role[1]}
                parentLink={role[0]}
                isHeading={true}
                isDisabled={isDisabled}
                onDataChange={(data) => handleDataChange(data)}
              />
            </Row>
          );
        })}
    </div>
  );
};

export default RoleOptionList;

import React from "react";
import { RoleRecustionEndPoint } from "./roleRecursionEndPoint";
import styles from "./addRoleModal.module.css";
import cn from "classnames";

export const RoleRecustion = ({
  entries,
  values,
  parentLink,
  isHeading,
  isDisabled,
  onDataChange,
}) => {
  const getEntry = (entries) => {
    const data = Object.entries(entries).filter(
      (entry) => !["_name", "_type"].includes(entry[0]),
    );
    return data;
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {entries._type ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="me-auto">
              {isHeading ? (
                <p className={cn(styles.roleTittle, "fw-bold")}>
                  {entries._name}
                </p>
              ) : (
                <p>{entries._name}</p>
              )}
            </div>
            <RoleRecustionEndPoint
              type={entries._type}
              value={values}
              isDisabled={isDisabled}
              parentLink={`${parentLink}`}
              onDataChange={(data) => onDataChange(data)}
            />
          </div>
        ) : (
          <div>
            <div className="me-auto">
              {isHeading ? (
                <p className={cn(styles.roleTittle, "fw-bold")}>
                  {entries._name}
                </p>
              ) : (
                <p>{entries._name}</p>
              )}
            </div>
            {getEntry(entries)?.map((entry) => {
              return (
                <div>
                  <RoleRecustion
                    entries={entry[1]}
                    values={values[entry[0]]}
                    nodeLink={entry[0]}
                    isDisabled={isDisabled}
                    parentLink={`${parentLink}.${entry[0]}`}
                    onDataChange={(data) => onDataChange(data)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

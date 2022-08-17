import React from "react";
import Avatar from "@components/avatar";
import styles from "./EmployeeDetails.module.css";
import * as Icon from "react-feather";
import colorOptions from "../../../colorOption";

const EmployeeDetails = ({ name, email, groupName, icon }) => {
  const IconTag = Icon[icon];
  return (
    <div className={`mt-2 ${styles.employeeDetailsContainer}`}>
      {/* User Details */}
      <div className={styles.userDetailsContainer}>
        <div>
          <Avatar
            className="mr-1"
            img={`https://ui-avatars.com/api/?name=${name}%&background=abcdef`}
            width="35"
            height="35"
          />
        </div>
        <div className={styles.employeeNameEmail}>
          <h5 className={styles.employeeName}>{name}</h5>
          <p>{email}</p>
        </div>
      </div>

      {/* Role Details */}
      <div className={styles.roleDetailsContainer}>
        {/* Icon */}
        <div>
          {icon && (
            <IconTag color={colorOptions[icon]} size={18} className="me-1" />
          )}
        </div>

        {/* Role Name */}
        <div>
          <h5 className={styles.groupName}>{groupName}</h5>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

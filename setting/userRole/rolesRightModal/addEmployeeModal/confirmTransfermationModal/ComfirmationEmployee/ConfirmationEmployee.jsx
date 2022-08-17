import React from "react";
import styles from "./ConfirmationEmployee.module.css";
import Avatar from "@components/avatar";
import { ArrowRight } from "react-feather";

const ConfirmationEmployee = ({ name, email, role, groupName }) => {
  console.log("This is the group name", groupName);
  return (
    <div className={styles.staffMainContainer}>
      {/* Employee Container */}
      <div className={styles.staffInnerContainer}>
        {/* Employee Details */}
        <div className={styles.employeeDetailsContainer}>
          {/* Avatar  */}
          <div>
            <Avatar
              className="mr-1"
              img={`https://ui-avatars.com/api/?name=${name}%&background=abcdef`}
              width="42"
              height="42"
            />
          </div>

          {/* UserDetails */}
          <div className={styles.userInfoContainer}>
            {/* User Name */}
            <div>
              <h5 className={styles.name}>{name}</h5>
            </div>

            {/* User Email */}
            <div>
              <p className="mb-0">{email}</p>
            </div>
          </div>
        </div>

        {/* Role Details */}
        <div className={styles.roleDetailsContainer}>
          {/* Previous Role */}
          <div>
            <p className={styles.role}>{role}</p>
          </div>

          {/* Right Icon */}
          <div className={styles.rightIconContainer}>
            <ArrowRight size={15} />
          </div>

          {/* New Role */}
          <div>
            <p className={styles.role}>{groupName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationEmployee;

import React, { useEffect, useState } from "react";
import Avatar from "@components/avatar";
import styles from "./TransferEmployeeData.module.css";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import * as Icon from "react-feather";
import colorOptions from "../../../colorOption";

const TransferEmployeeData = ({
  name,
  email,
  groupName,
  roleId,
  setRole,
  roleList,
  icon,
}) => {
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    setRole(selectedRole.id);
  }, [selectedRole]);

  // Set default role
  useEffect(() => {
    setSelectedRole({
      name: groupName,
      id: roleId,
      icon,
    });
  }, [groupName]);

  // Icon
  const IconTag = Icon[selectedRole?.icon];

  return (
    <div className={styles.staffsMainContainer}>
      <div className={styles.userInfoContainer}>
        {/* User Avatar and name */}
        <div className={styles.userDetailContainer}>
          {/* Avatar */}
          <div>
            <Avatar
              className="mr-1"
              img={`https://ui-avatars.com/api/?name=${name}%&background=abcdef`}
              width="35"
              height="35"
            />
          </div>

          {/* User Details */}
          <div className={styles.userNameEmailContainer}>
            {/* User Name */}
            <div>
              <h5 className={styles.staffName}>{name}</h5>
            </div>

            {/* User Email */}
            <div>
              <p className={styles.staffEmail}>{email}</p>
            </div>
          </div>
        </div>

        {/* User Role */}
        <div>
          <UncontrolledDropdown className="mr-7">
            <DropdownToggle className="cursor-pointer" tag="span">
              {selectedRole.icon && (
                <IconTag
                  color={colorOptions[selectedRole.icon]}
                  size={18}
                  className="me-1"
                />
              )}

              {selectedRole.name}
            </DropdownToggle>
            <DropdownMenu className={styles.dropdownMenuContainer} end>
              {roleList.map((data, i) => {
                return (
                  <DropdownItem
                    onClick={() =>
                      setSelectedRole({
                        name: data.name,
                        id: data._id,
                        icon: data.icon ? data.icon : "",
                      })
                    }
                    key={i}
                    className={styles.dropdownItem}
                  >
                    {data.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </div>
  );
};

export default TransferEmployeeData;

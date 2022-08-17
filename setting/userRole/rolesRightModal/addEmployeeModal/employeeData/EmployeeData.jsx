import React, { useEffect, useState } from "react";
import Avatar from "@components/avatar";
import styles from "./EmployeeData.module.css";
import * as Icon from "react-feather";
import colorOptions from "../../../colorOption";

const EmployeeData = ({
  id,
  name,
  email,
  role,
  setSelectedEmployees,
  selectedEmployees,
  icon,
}) => {
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);

  console.log("THis is the icon", icon);

  // Function to check if employee is selected
  useEffect(() => {
    selectedEmployees.map((employee) => {
      if (employee.id === id) {
        setIsEmployeeSelected(true);
      }
    });
  }, [selectedEmployees]);

  // Function to handle employee list click
  const handleEmployeeClick = () => {
    if (isEmployeeSelected) {
      const staffData = selectedEmployees;
      const newData = staffData.filter((data) => data.id !== id);

      setSelectedEmployees(newData);
      setIsEmployeeSelected(false);
    } else {
      setSelectedEmployees([...selectedEmployees, { id, role, email, name }]);
    }
  };

  const IconTag = Icon[icon];

  return (
    <div
      sty
      className={`${
        isEmployeeSelected && styles.selectedEmployee
      } mt-1 cursor-pointer`}
      onClick={() => handleEmployeeClick()}
    >
      <div className={styles.employeeContaienr}>
        <div className={styles.userContainer}>
          <div className={styles.userInfoContainer}>
            {/* Avatar */}
            <div>
              <Avatar
                className="mr-1"
                img={`https://ui-avatars.com/api/?name=${name}%&background=abcdef`}
                width="42"
                height="42"
              />
            </div>

            {/* User Details */}
            <div className={styles.userDetailsContainer}>
              {/* User Name */}
              <div>
                <h6 className={styles.employeeName}>{name}</h6>
              </div>

              {/* Email */}
              <div>
                <p className="mt-0">{email}</p>
              </div>
            </div>
          </div>

          {/* User role */}
          <div className="d-flex">
            <IconTag color={colorOptions[icon]} size={18} className="me-1" />

            <h5 className={styles.userRole}>{role}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;

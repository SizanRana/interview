import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import EmployeeDetails from "./employeeDetails/EmployeeDetails";

const RolesEmployee = ({ data, groupName, icon }) => {
  const [searchValue, setSearchValue] = useState("");
  const [staffData, setStaffData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataToMap, setDataToMap] = useState([]);

  useEffect(() => {
    setStaffData(data);
  }, [data]);

  //   Function to handel data filter acc to search
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);
    if (searchValue.length) {
      updatedData = staffData.filter((item) => {
        if (!item.name) return;
        const startsWith = item?.name
          .toLowerCase()
          .includes(value.toLowerCase());

        const includes = item?.name.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
    }
  };

  // useEffect(() => {
  //   if (searchValue === "") {
  //     setStaffData(data);
  //     return;
  //   }

  //   handleFilter();
  // }, [searchValue]);

  useEffect(() => {
    if (searchValue.length > 1) {
      setDataToMap(filteredData);
    } else {
      setDataToMap(staffData);
    }
  }, [searchValue, staffData]);
  return (
    <div>
      {/* Search Container */}
      <div>
        <InputGroup className="input-group-merge">
          <InputGroupText>
            <Search size={14} />
          </InputGroupText>
          <Input
            value={searchValue}
            onChange={(e) => handleFilter(e)}
            placeholder="Search..."
          />
        </InputGroup>
      </div>

      {/* Employee List */}
      <div>
        {dataToMap.map((staff, i) => {
          return (
            <EmployeeDetails
              key={i}
              name={staff.name ? staff.name : ""}
              email={staff.email}
              groupName={groupName}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RolesEmployee;

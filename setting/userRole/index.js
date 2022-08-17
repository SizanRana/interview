// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Roles Components
import Table from "./Table";

// Styles
import styles from "./Roles.module.css";
import { Button, Input, Label, Spinner } from "reactstrap";
import PermissionTable from "./permissionTable/PermissionTable";
import fetchAllPermissionListApi from "@apicall/services/roles/getAllPermissionList";
import fetchAllStaffsApi from "@apicall/services/staff/fetchAllStaffApi";
import fetchAllRolesApi from "@apicall/services/roles/getAllRoles";
import fetchRoleStructureApi from "@apicall/services/roles/roleStructureGet";
import BlankPageCard from "@reusable/blankPageCard/BlankPageCard";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { verifyPermission } from "@reusable/ability";
import RoleCards from "./RoleCards";

const Roles = () => {
  const [roleOptions, setRoleOptions] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [userSearchValue, setUserSearchValue] = useState("");
  const [permissionSearchValue, setPermissionSearchValue] = useState("");
  const [selectedTable, setSelectedTable] = useState("User");
  const [selectedRoleList, setSelectedRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [userFilteredData, setUserFilteredData] = useState([]);
  const [permissionFilteredData, setPermissionFilteredData] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [allRoleList, setAllRoleList] = useState([]);
  const [defaultRoleList, setDefaultRoleList] = useState([]);
  const [customRoleList, setCustomRoleList] = useState([]);
  const [roleStructure, setRoleStructure] = useState({});
  const [isDataMutated, setIsDataMutated] = useState(false);
  const [isRoleDataPending, setIsRoleDataPending] = useState(true);
  const [isStaffDataPending, setIsStaffDataPending] = useState(true);
  const [isPermissionDataPending, setIsPermissionDataPending] = useState(true);

  console.log(defaultRoleList, customRoleList, roleStructure);

  // Function to get all roles
  const fetchAllRoles = async () => {
    const roleResponse = await fetchAllRolesApi();

    if (roleResponse !== null) {
      const defaultRole = [];
      const customRole = [];

      setAllRoleList(roleResponse.roles);

      roleResponse?.roles?.map((roleData) => {
        if (roleData?.isCustom) {
          customRole.push(roleData);
        } else {
          defaultRole.push(roleData);
        }
      });

      setDefaultRoleList(defaultRole);
      setCustomRoleList(customRole);
    }
    setIsRoleDataPending(false);
  };

  // Function to set all role option list
  useEffect(() => {
    const roleOptionList = [
      {
        label: "All",
        value: "All",
      },
    ];
    allRoleList.map((roleData) => {
      roleOptionList.push({
        label: roleData.name,
        value: roleData._id,
      });
    });

    setRoleOptions(roleOptionList);
  }, [allRoleList]);

  // FUnction to handle role select
  const handleSelectRole = (option) => {
    setSelectedRole(option);
  };

  const roleStructureResponse = async () => {
    const _roleStructure = await fetchRoleStructureApi();
    setRoleStructure(_roleStructure);
  };

  const getAllStaffData = async () => {
    const allStaffsResponse = await fetchAllStaffsApi();

    setStaffList(allStaffsResponse.employees);
    setIsStaffDataPending(false);
  };

  // function to get all permission list
  const getPermissionList = async () => {
    const permissionListResponse = await fetchAllPermissionListApi();

    setPermissionList(permissionListResponse.permissionList);
    setIsPermissionDataPending(false);
  };

  useEffect(() => {
    fetchAllRoles();
    roleStructureResponse();
    getAllStaffData();
    getPermissionList();
  }, []);

  // Fetch data on mutation
  useEffect(() => {
    if (!isDataMutated) return;

    fetchAllRoles();
    getAllStaffData();
    setIsDataMutated(false);
  }, [isDataMutated]);

  // Function to handle user filter
  const handleUserFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setUserSearchValue(value);

    if (value.length) {
      updatedData = staffList.filter((item) => {
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
      setUserFilteredData(updatedData);
      setUserSearchValue(value);
    }
  };

  // Function to handle list filter user accordeing to role
  const filterAccToRole = (roleData) => {
    const similarRoleStaff = [];
    if (roleData?.value === "All") {
      setSelectedRoleList([]);
    } else {
      staffList.map((staffData) => {
        if (roleData.value === staffData.role) {
          similarRoleStaff.push(staffData);
        }
      });

      setSelectedRoleList(similarRoleStaff);
    }
  };

  useEffect(() => {
    if (!selectedRole?.value) return;
    filterAccToRole(selectedRole);
  }, [selectedRole]);

  // Function to handle filter permission list
  const handlePermissionSearch = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setPermissionSearchValue(value);

    if (value.length) {
      updatedData = permissionList.filter((item) => {
        const startsWith = item.module
          .toLowerCase()
          .includes(value.toLowerCase());

        const includes = item.module
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setPermissionFilteredData(updatedData);
      setPermissionSearchValue(value);
    }
  };

  return (
    <Fragment>
      <BlankPageCard isScrollable={true}>
        <div className={styles.rolesCardContainer}>
          <div className="px-1 mt-2">
            <h3>Roles List</h3>
            <p className="mb-2">
              A role provides access to predefined menus and features depending
              on the assigned
            </p>

            {isRoleDataPending ? (
              <div
                style={{ height: "70vh" }}
                className="d-flex justify-content-center align-items-center"
              >
                <Spinner color="primary" size={50} />
              </div>
            ) : (
              <div>
                <RoleCards
                  defaultRoleList={defaultRoleList}
                  customRoleList={customRoleList}
                  roleStructure={roleStructure}
                  setIsDataMutated={setIsDataMutated}
                  isDataMutated={isDataMutated}
                />

                {verifyPermission(["user.staff.view"]) && (
                  <div>
                    <h3 className="mt-5">Total users with their roles</h3>
                    <p className="mb-2">
                      Find all of your company’s administrator accounts and
                      their associate roles.
                    </p>
                    <div className="my-1 d-flex justify-content-between">
                      <div>
                        <Button
                          color={selectedTable === "User" && "primary"}
                          onClick={() => setSelectedTable("User")}
                          className=""
                        >
                          User
                        </Button>
                        <Button
                          onClick={() => setSelectedTable("Permission")}
                          color={selectedTable === "Permission" && "primary"}
                          className="ms-1"
                        >
                          Permission
                        </Button>
                      </div>
                      <div className="d-flex">
                        <div className="d-flex justify-content-end align-items-center">
                          <Label className="mb-0" for="search-invoice">
                            Search:
                          </Label>
                          {selectedTable === "User" ? (
                            <Input
                              id="search-invoice"
                              className="ms-50 w-100"
                              type="text"
                              value={userSearchValue}
                              onChange={(e) => handleUserFilter(e)}
                            />
                          ) : (
                            <Input
                              id="search-invoice"
                              className="ms-50 w-100"
                              type="text"
                              value={permissionSearchValue}
                              onChange={(e) => handlePermissionSearch(e)}
                            />
                          )}
                        </div>

                        {selectedTable === "User" && (
                          <div style={{ width: "180px" }} className="ms-2">
                            <Select
                              theme={selectThemeColors}
                              value={selectedRole}
                              placeholder="Select Role"
                              isMulti={false}
                              options={roleOptions}
                              classNamePrefix="select"
                              onChange={handleSelectRole}
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 2 }),
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="app-user-list">
                      {selectedTable === "User" ? (
                        <Table
                          staffList={
                            selectedRole && selectedRole.value !== "All"
                              ? selectedRoleList
                              : userSearchValue.length > 1
                              ? userFilteredData
                              : staffList
                          }
                          isLoading={isStaffDataPending}
                          allRoleList={allRoleList}
                          setIsDataMutated={setIsDataMutated}
                        />
                      ) : (
                        <PermissionTable
                          permissionList={
                            permissionSearchValue.length > 1
                              ? permissionFilteredData
                              : permissionList
                          }
                          isDataPending={isPermissionDataPending}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </BlankPageCard>
    </Fragment>
  );
};

export default Roles;

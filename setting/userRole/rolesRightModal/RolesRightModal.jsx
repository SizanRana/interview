import React, { useEffect, useState } from "react";
import {
  Copy,
  Edit,
  Eye,
  EyeOff,
  MoreVertical,
  Trash2,
  UserPlus,
} from "react-feather";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Offcanvas,
  UncontrolledDropdown,
} from "reactstrap";
import RolesActivity from "./rolesActivity/RolesActivity";
import RolesEmployee from "./rolesEmployee/RolesEmployee";
import RolesPermission from "./rolesPermission/RolesPermission";
import styles from "./RolesRightModal.module.css";
import fetchSingleRoleDataApi from "@apicall/services/roles/getSingleRoleData";
import fetchSingleRoleEmployeeList from "@apicall/services/roles/getSingleRoleEmployee";
import RoleEditModal from "./roleEditModal/RoleEditModal";
import disableRoleAPi from "@apicall/services/roles/disableRole";
import enableRoleApi from "@apicall/services/roles/enableRole";
import AddEmployeeModal from "./addEmployeeModal/AddEmployeeModal";
import { handleConfirmation } from "@reusable/sweetAlert";
import deleteRoleApi from "@apicall/services/roles/deleteRole";
import TransferEmployeeModal from "./transferEmployeeModal/TransferEmployeeModal";
import DuplicateRoleModal from "./duplicateRoleModal/DuplicateRoleModal";
import { verifyPermission } from "@reusable/ability";

const RolesRightModal = ({
  state,
  closeRoleRightModal,
  data,
  setIsDataMutated,
  isDataMutated,
  roleStructure,
}) => {
  const [selectedRoleData, setSelectedRoleData] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [openRoleEditModal, setOpenRoleEditModal] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [openRoleTransferModal, setOpenRoleTransferModal] = useState(false);
  const [openDuplicateRoleModal, setOpenDuplicateRoleModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("permission");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to close roleEdit modal
  const closeRoleEditModal = () => setOpenRoleEditModal(false);

  // Function to close add employee modal
  const closeAddEmployeeModal = () => setOpenAddEmployeeModal(false);

  // Function to close role transfer modal
  const closeTransferModal = () => setOpenRoleTransferModal(false);

  // Function to close duplicate role modal
  const closeDuplicateModal = () => setOpenDuplicateRoleModal(false);

  // Function to get single role data
  const getSingleRoleData = async () => {
    const roleResponse = await fetchSingleRoleDataApi({
      id: data?.data?._id,
    });

    setSelectedRoleData(roleResponse?.role);
  };

  // Resetting role data
  useEffect(() => {
    if (!state) {
      setSelectedRoleData({});
    }
  }, [state]);

  // Function to get employee list
  const getSingleRoleEmployeeList = async () => {
    setIsDataLoading(true);
    const staffResponse = await fetchSingleRoleEmployeeList({
      id: data?.data?._id,
    });

    if (staffResponse !== null) {
      setEmployeeList(staffResponse?.employees);
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    // if (!data?.data?._id) return;
    getSingleRoleData();
    getSingleRoleEmployeeList();
  }, [data]);

  //  refetch data on mutation
  useEffect(() => {
    if (!isDataMutated) return;
    getSingleRoleData();
    getSingleRoleEmployeeList();
  }, [isDataMutated]);

  const renderContent = () => {
    switch (selectedOption) {
      case "permission":
        return (
          <RolesPermission
            data={selectedRoleData}
            isDataLoading={isDataLoading}
            roleStructure={roleStructure}
          />
        );
        break;
      case "employee":
        return (
          <RolesEmployee
            data={employeeList}
            groupName={data?.data?.name}
            icon={data?.data?.icon}
          />
        );
        break;
      case "activity":
        return <RolesActivity roleId={data?.data?._id} />;
        break;
    }
  };

  // Function to handle disable role
  const disableRole = async () => {
    const { isConfirmed } = await handleConfirmation({
      title: "Disable Role",
      text: `If you want to give this role to anyone you can disable default role.`,
      icon: "info",
      buttonText: "Disable it!",
      confirmButtonColor: "btn-primary",
      cancleButtonColor: "btn-secondary",
    });

    if (!isConfirmed) return;
    const disableResponse = await disableRoleAPi({ roledId: data?.data?._id });

    if (disableResponse !== null) {
      setIsDataMutated(true);
      closeRoleRightModal();
    }
  };

  // Function to handle enable role
  const enableRole = async () => {
    const { isConfirmed } = await handleConfirmation({
      title: "Enable Role",
      text: `If you want to give this role to anyone you can enable default role.`,
      icon: "info",
      buttonText: "Enable it!",
      confirmButtonColor: "btn-primary",
      cancleButtonColor: "btn-secondary",
    });

    if (!isConfirmed) return;

    const enableRole = await enableRoleApi({ roledId: data?.data?._id });

    if (enableRole !== null) {
      setIsDataMutated(true);
      closeRoleRightModal();
    }
  };

  // Function to handle role delete
  const handleRoleDelete = async () => {
    const { isConfirmed } = await handleConfirmation({
      title: "Delete Role?",
      text: `Are you sure you want to delete "${data?.data?.name}" role. There is no user in this role you can delete it.`,
      icon: "info",
      buttonText: "Yes, Delete it",
      confirmButtonColor: "btn-primary",
      cancleButtonColor: "btn-outline-danger",
    });

    if (!isConfirmed) return;

    if (employeeList?.length > 0) {
      const { isConfirmed } = await handleConfirmation({
        title: "Delete Role?",
        text: `You can't delete "${data?.data?.name}" role as there are employee in this role. Please transfer them to another role before deletion`,
        icon: "info",
        buttonText: "Transfer Employee",
        confirmButtonColor: "btn-primary",
        cancleButtonColor: "btn-outline-danger",
      });

      if (!isConfirmed) return;

      console.log(isConfirmed);
      setOpenRoleTransferModal(true);
    } else {
      const deleteRoleResponse = await deleteRoleApi({
        roleId: data?.data?._id,
      });

      if (deleteRoleResponse !== null) {
        setIsDataMutated(true);
        closeRoleRightModal();
      }
    }
  };

  return (
    <Offcanvas
      isOpen={state}
      toggle={closeRoleRightModal}
      direction="end"
      style={{ width: "450px" }}
    >
      {/* Canvas Container */}
      <div className={styles.canvasContainer}>
        {/* Modal Header */}
        <div className={styles.headerContainer}>
          <h3>{data?.data?.name}</h3>

          <div>
            <UncontrolledDropdown className="mr-7">
              <DropdownToggle className="cursor-pointer" tag="span">
                <MoreVertical size={20} />
              </DropdownToggle>

              {verifyPermission(["restaurant.userRole.edit"]) && (
                <DropdownMenu className={styles.dropdownMenu} end>
                  {data.isCustom && (
                    <DropdownItem
                      onClick={() => setOpenRoleEditModal(true)}
                      className={styles.dropdownItem}
                    >
                      <Edit size={15} />
                      <p className={styles.dropdownText}>Edit Role</p>
                    </DropdownItem>
                  )}

                  <DropdownItem
                    onClick={() => setOpenAddEmployeeModal(true)}
                    className={styles.dropdownItem}
                  >
                    <UserPlus size={15} />
                    <p className={styles.dropdownText}>Add Employee</p>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setOpenDuplicateRoleModal(true)}
                    className={styles.dropdownItem}
                  >
                    <Copy size={15} />
                    <p className={styles.dropdownText}>Duplicate Role</p>
                  </DropdownItem>
                  {data.isCustom && (
                    <DropdownItem
                      onClick={() => handleRoleDelete()}
                      className={styles.dropdownItem}
                    >
                      <Trash2 size={15} />
                      <p className={styles.dropdownText}>Delete Role</p>
                    </DropdownItem>
                  )}

                  {data?.data?.isDisabled ? (
                    <DropdownItem
                      onClick={() => enableRole()}
                      className={styles.dropdownItem}
                    >
                      <Eye size={15} />
                      <p className={styles.dropdownText}>Enable Role</p>
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => disableRole()}
                      className={styles.dropdownItem}
                    >
                      <EyeOff size={15} />
                      <p className={styles.dropdownText}>Disable Role</p>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              )}
            </UncontrolledDropdown>
          </div>
        </div>

        {/* Modal Header text */}
        <div className="mt-1">
          <p>
            This is for new waiter team, please use this for waiter, helper,
            delivery boy.
          </p>
        </div>

        {/* Options buttons */}
        <div className="mt-2">
          <Button
            onClick={() => handleOptionSelect("permission")}
            color={selectedOption === "permission" ? "primary" : "secondary"}
            className={styles.optionButton}
          >
            Permission
          </Button>
          <Button
            onClick={() => handleOptionSelect("employee")}
            color={selectedOption === "employee" ? "primary" : "secondary"}
            className={styles.optionButton}
          >
            Employee
          </Button>
          <Button
            onClick={() => handleOptionSelect("activity")}
            color={selectedOption === "activity" ? "primary" : "secondary"}
            className={styles.optionButton}
          >
            Activity
          </Button>
        </div>

        <div className="mt-3">{renderContent()}</div>
      </div>
      {/* Role Edit Modal */}
      <RoleEditModal
        state={openRoleEditModal}
        closeRoleEditModal={closeRoleEditModal}
        groupName={data?.data?.name}
        icon={data?.icon}
        data={selectedRoleData}
        setIsDataMutated={setIsDataMutated}
        closeRoleRightModal={closeRoleRightModal}
        roleStructure={roleStructure}
      />

      {/* Add employee modal */}
      <AddEmployeeModal
        state={openAddEmployeeModal}
        closeAddEmployeeModal={closeAddEmployeeModal}
        groupName={data?.data?.name}
        roleId={data?.data?._id}
        setIsDataMutated={setIsDataMutated}
      />

      {/* Transfer Employee modal */}
      <TransferEmployeeModal
        state={openRoleTransferModal}
        closeTransferModal={closeTransferModal}
        groupName={data?.data?.name}
        employeeList={employeeList}
        roleId={data?.data?._id}
        setIsDataMutated={setIsDataMutated}
        closeRoleRightModal={closeRoleRightModal}
        icon={data?.data?.icon}
      />

      {/* Duplicate Role Modal */}
      <DuplicateRoleModal
        state={openDuplicateRoleModal}
        closeDuplicateModal={closeDuplicateModal}
        groupName={data?.data?.name}
        setIsDataMutated={setIsDataMutated}
        roleStructure={roleStructure}
        icon={data?.icon}
        data={selectedRoleData}
        closeRoleRightModal={closeRoleRightModal}
      />
    </Offcanvas>
  );
};

export default RolesRightModal;

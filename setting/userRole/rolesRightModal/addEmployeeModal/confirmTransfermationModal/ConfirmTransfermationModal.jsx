import React, { useEffect, useState } from "react";
import { UserPlus } from "react-feather";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import addStaffOnRoleApi from "@apicall/services/roles/addEmployeesOnRole";
import ConfirmationEmployee from "./ComfirmationEmployee/ConfirmationEmployee";
import styles from "./ConfirmTransfermationModal.module.css";

const ConfirmTransfermationModal = ({
  state,
  closeConfirmModal,
  selectedEmployees,
  groupName,
  roleId,
  closeAddEmployeeModal,
  setIsDataMutated,
}) => {
  const [staffIdList, setStaffIdList] = useState([]);
  const [isButtonSubmitted, setIsButtonSubmitted] = useState(false);

  // Function to transfer staffs
  const handleTransferStaffs = async () => {
    setIsButtonSubmitted(true);
    const addStaffResponse = await addStaffOnRoleApi({
      roleId,
      staffIds: staffIdList,
    });

    if (addStaffResponse !== null) {
      closeConfirmModal();
      closeAddEmployeeModal();
      setIsDataMutated(true);
    }
    setIsButtonSubmitted(false);
  };

  useEffect(() => {
    const idList = [];
    selectedEmployees.map((data) => {
      idList.push(data.id);
    });

    setStaffIdList(idList);
  }, [selectedEmployees]);
  return (
    <Modal
      isOpen={state}
      onClosed={closeConfirmModal}
      toggle={closeConfirmModal}
      className="modal-dialog-centered modal-lg"
      style={{ width: "650px" }}
    >
      <ModalHeader
        className="bg-transparent"
        toggle={closeConfirmModal}
      ></ModalHeader>

      {/* Header Message */}
      <div style={{ marginTop: "-20px" }} className="text-center mb-3">
        <div>
          <UserPlus size={60} />
        </div>
        <h2>Add Employee</h2>
        <p>
          Are you sure you want to switch all following employeeto {groupName}
          Role?
        </p>
      </div>

      <ModalBody
        style={{
          marginTop: "-50px",
          paddingLeft: "80px",
          paddingRight: "80px",
          paddingBottom: "40px",
        }}
      >
        {/* Text */}
        <div className="mt-2">
          <p className="text-center">Summary</p>
        </div>

        {/* EmployeeList */}
        <div className={styles.employeeListContainer}>
          {selectedEmployees.map((staffs, i) => {
            return (
              <ConfirmationEmployee
                key={i}
                name={staffs.name}
                email={staffs.email}
                role={staffs.role}
                groupName={groupName}
              />
            );
          })}
        </div>

        {/* Bottm button */}
        <div className="d-flex flex-column justify-content-center mt-3">
          {isButtonSubmitted ? (
            <Button
              disabled
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
              color="primary"
            >
              Switching...
              <Spinner size="sm" />
            </Button>
          ) : (
            <Button
              onClick={() => handleTransferStaffs()}
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
              color="primary"
            >
              Yes, Switch it !
            </Button>
          )}

          <Button
            onClick={() => closeConfirmModal()}
            className="mt-2"
            color="transparent"
          >
            Cancle
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmTransfermationModal;

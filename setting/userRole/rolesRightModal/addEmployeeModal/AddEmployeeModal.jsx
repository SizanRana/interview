import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import fetchAllStaffsApi from "@apicall/services/staff/fetchAllStaffApi";
import EmployeeData from "./employeeData/EmployeeData";
import styles from "./AddEmployeeModal.module.css";
import ConfirmTransfermationModal from "./confirmTransfermationModal/ConfirmTransfermationModal";

const AddEmployeeModal = ({
  state,
  closeAddEmployeeModal,
  groupName,
  roleId,
  setIsDataMutated,
}) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [openTransfermationModal, setOpenTransfermationModal] = useState(false);

  // Function to close transfermation Modal
  const closeConfirmModal = () => setOpenTransfermationModal(false);

  //   // Function to get staff list
  const getStaffList = async () => {
    const staffResponse = await fetchAllStaffsApi();

    if (staffResponse !== null) {
      setStaffList(staffResponse.employees);
    }
  };

  useEffect(() => {
    getStaffList();
  }, []);

  // Function to handle add employee
  const handleAddEmployee = () => {
    setOpenTransfermationModal(true);
  };

  return (
    <div>
      <Modal
        isOpen={state}
        onClosed={closeAddEmployeeModal}
        toggle={closeAddEmployeeModal}
        className="modal-dialog-centered modal-lg"
        style={{ width: "650px" }}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={closeAddEmployeeModal}
        ></ModalHeader>
        <div className="text-center mb-3">
          <h1>Select Employee</h1>
          <p>Select your employee to give {groupName} Role</p>
        </div>

        <ModalBody
          style={{
            marginTop: "-50px",
            paddingLeft: "80px",
            paddingRight: "80px",
            paddingBottom: "40px",
          }}
        >
          {/* Staff List */}
          <div className={styles.staffList}>
            {staffList.map((staffs, i) => {
              return (
                <div key={i}>
                  <EmployeeData
                    id={staffs._id}
                    name={staffs.name ? staffs.name : ""}
                    email={staffs.email}
                    role={staffs.relation.name}
                    selectedEmployees={selectedEmployees}
                    setSelectedEmployees={setSelectedEmployees}
                    icon={staffs.relation.icon ? staffs.relation.icon : ""}
                  />
                </div>
              );
            })}
          </div>
          {/* Employee Count */}
          <div className="d-flex justify-content-center">
            <p>{staffList.length} Employee</p>
          </div>
          <div className="mt-3">
            <Button
              onClick={() => handleAddEmployee()}
              className="w-100"
              color="primary"
            >
              Add Employee
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <ConfirmTransfermationModal
        state={openTransfermationModal}
        closeConfirmModal={closeConfirmModal}
        groupName={groupName}
        selectedEmployees={selectedEmployees}
        roleId={roleId}
        closeAddEmployeeModal={closeAddEmployeeModal}
        setIsDataMutated={setIsDataMutated}
      />
    </div>
  );
};

export default AddEmployeeModal;

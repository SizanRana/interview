import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";
import TransferEmployeeData from "./transferEmployeeData/TransferEmployeeData";
import fetchAllRolesApi from "@apicall/services/roles/getAllRoles";
import transferRoleOnDeleteApi from "@apicall/services/roles/transferRoleOnDelete";
import styles from "./TransferEmployeeModal.module.css";
import { handleConfirmation } from "@reusable/sweetAlert";
import deleteRoleApi from "@apicall/services/roles/deleteRole";

const TransferEmployeeModal = ({
  state,
  closeTransferModal,
  groupName,
  employeeList,
  roleId,
  setIsDataMutated,
  closeRoleRightModal,
  icon,
}) => {
  const [transferedEmployees, setTransferedEmployees] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [isButtonSubmitted, setIsButtonSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Function to get all roles
  const fetchAllRoles = async () => {
    const roleResponse = await fetchAllRolesApi();

    if (roleResponse !== null) {
      setRoleList(roleResponse.roles);
    }
  };

  useEffect(() => {
    fetchAllRoles();
    setErrorMsg("");
  }, []);

  useEffect(() => {
    setTransferedEmployees(
      employeeList.map((employee) => {
        return {
          id: employee._id,
          roleId,
        };
      }),
    );
  }, [employeeList]);

  useEffect(() => {
    setErrorMsg("");
  }, [roleList, transferedEmployees]);

  // Function to handle employee transfer
  const handleEmployeeTransfer = async () => {
    if (isButtonSubmitted) return;
    setIsButtonSubmitted(true);

    setErrorMsg("");

    const staffLeft = transferedEmployees.filter(
      (data) => data.roleId === undefined,
    );

    if (staffLeft.length) {
      setErrorMsg(`${staffLeft.length} staff is left to transfer.`);
      setIsButtonSubmitted(false);
      return;
    }
    const transferResponse = await transferRoleOnDeleteApi({
      roleId,
      employees: transferedEmployees,
    });

    if (transferResponse !== null) {
      if (transferResponse.allTransfered) {
        const { isConfirmed } = await handleConfirmation({
          title: "Delete Role?",
          text: `Your Employee role transfer has been done, now you can delete ${groupName} role`,
          icon: "warning",
          buttonText: "Yes, Delete it",
          confirmButtonColor: "btn-primary",
          cancleButtonColor: "btn-outline-danger",
        });

        if (!isConfirmed) return;

        const deleteRoleResponse = await deleteRoleApi({
          roleId,
        });

        if (deleteRoleResponse !== null) {
          setIsDataMutated(true);
          closeTransferModal();
          closeRoleRightModal();
        }
      }
    }

    setIsButtonSubmitted(false);
  };
  return (
    <Modal
      isOpen={state}
      onClosed={closeTransferModal}
      toggle={closeTransferModal}
      className="modal-dialog-centered modal-lg"
      style={{ width: "650px" }}
    >
      <ModalHeader
        className="bg-transparent"
        toggle={closeTransferModal}
      ></ModalHeader>

      {/* Modal Header text */}
      <div className="text-center mb-3  px-2">
        <h1>Employee Transfer</h1>
        <p>
          you cant't delete "{groupName}" as there are employee in this role,
          please transfer them to other role before deletion.
        </p>
      </div>

      {/* Modal Body */}
      <ModalBody className="px-3">
        {errorMsg && (
          <div>
            <Alert color="primary">
              <div className="alert-body font-small-2">
                <p>
                  <small className="mr-50">
                    <span className="font-weight-bold">Alert: </span> {errorMsg}
                  </small>
                </p>
              </div>
            </Alert>
          </div>
        )}

        {/* This is the employee List */}
        <div className={styles.staffListContainer}>
          {employeeList.map((data, i) => {
            return (
              <TransferEmployeeData
                setRole={(roleId) => {
                  setTransferedEmployees((employees) => {
                    employees[i].roleId = roleId;
                    return employees;
                  });
                }}
                key={i}
                name={data.name}
                email={data.email}
                groupName={groupName}
                employeeId={data._id}
                roleList={roleList}
                icon={icon}
              />
            );
          })}
        </div>

        {/* Bottom button */}
        <div className="d-flex justify-content-center mt-3 mb-2">
          {isButtonSubmitted ? (
            <Button disabled color="primary">
              Transfering...
              <Spinner size="sm" />
            </Button>
          ) : (
            <Button onClick={() => handleEmployeeTransfer()} color="primary">
              Transfer Employee
            </Button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TransferEmployeeModal;

import React, { useState } from "react";
import { Alert, Button, Modal, ModalBody, Spinner } from "reactstrap";
import styles from "./TransferSingleUserRole.module.css";
import Avatar from "@components/avatar";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import addStaffOnRoleApi from "@apicall/services/roles/addEmployeesOnRole";

const TransferSingleUserRole = ({
  state,
  closeTransferRoleModal,
  userData,
  roleOptions,
  setIsDataMutated,
}) => {
  const [selectedRole, setSelectedRole] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [isButtonSubmitted, setIsButtonSubmitted] = useState(false);

  // Function to handle cancle click
  const handleCancleClick = () => {
    closeTransferRoleModal();
    setSelectedRole();
  };

  // FUnction to handle role select
  const handleSelectRole = (option) => {
    setSelectedRole(option);
  };

  // Function to handle role transfer
  const handleRoleTransfer = async () => {
    if (isButtonSubmitted) return;
    setIsButtonSubmitted(true);
    if (!selectedRole) {
      setErrorMsg("Please select a role.");
      setIsButtonSubmitted(false);
      return;
    }

    const roleTransferResponse = await addStaffOnRoleApi({
      roleId: selectedRole.value,
      staffIds: [userData._id],
    });

    if (roleTransferResponse !== null) {
      setIsDataMutated(true);
      handleCancleClick();
    }

    setIsButtonSubmitted(false);
  };

  return (
    <Modal
      isOpen={state}
      onClosed={handleCancleClick}
      toggle={handleCancleClick}
      className="modal-dialog-centered modal-md"
    >
      <ModalBody className={styles.modalBody}>
        {/* User Image */}
        <div>
          <Avatar
            className="mr-1"
            img={
              userData.image
                ? userData.image
                : `https://ui-avatars.com/api/?name=${userData.name}%&background=abcdef`
            }
            size="xl"
          />
        </div>

        {/* Title */}
        <div className="mt-1">
          <h3 className="text-center">Transfer Role</h3>
        </div>

        {/* Message */}
        <div className="mt-1">
          <p className="text-center">
            Are you sure you eant to transfer the role of {userData.name}?
            Please Select the role that you want to assign.
          </p>
        </div>

        {errorMsg && (
          <div className="w-100">
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

        {/* Role Options */}
        <div className="w-100">
          <Select
            theme={selectThemeColors}
            value={selectedRole}
            placeholder="Select Role"
            isMulti={false}
            options={roleOptions}
            classNamePrefix="select"
            onChange={handleSelectRole}
          />
        </div>

        {/* Button */}
        <div className="mt-1 w-100">
          {isButtonSubmitted ? (
            <Button disabled className="w-100" color="primary">
              Transfering...
              <Spinner size="sm" />
            </Button>
          ) : (
            <Button
              onClick={() => handleRoleTransfer()}
              className="w-100"
              color="primary"
            >
              Transfer Role
            </Button>
          )}

          <Button
            onClick={() => handleCancleClick()}
            className="mt-1 w-100"
            color="transparent"
          >
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default TransferSingleUserRole;

import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import fetchRoleStructureApi from "@apicall/services/roles/roleStructureGet";
import { RoleRecustion } from "../addRoleModal/roleRecursion";

export const RoleUiTest = (props) => {
  const { open, setOpen } = props;
  const [roleStructure, setRoleStructure] = useState({});
  const toggleHandler = () => setOpen(false);
  // Function to get role structure
  const roleReponse = async () => {
    const _roleStructure = await fetchRoleStructureApi();

    setRoleStructure(_roleStructure);
  };

  useEffect(async () => {
    roleReponse();
  }, []);
  console.log(open);
  return (
    <Modal
      isOpen={open}
      onClosed={toggleHandler}
      toggle={toggleHandler}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={toggleHandler}
      ></ModalHeader>
      <ModalBody className="position-relative">
        {Object.entries(roleStructure).map((role) => {
          return (
            <RoleRecustion
              entries={role[1]}
              parentLink={role[0]}
              isHeading={true}
            />
          );
        })}
      </ModalBody>
    </Modal>
  );
};

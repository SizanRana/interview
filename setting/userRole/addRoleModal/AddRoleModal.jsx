import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import addNewRoleApi from "@apicall/services/roles/addNewRole";
import {
  Aperture,
  Codepen,
  Codesandbox,
  Coffee,
  Database,
  Edit,
  Flag,
  Globe,
  User,
} from "react-feather";
import styles from "./addRoleModal.module.css";
import cn from "classnames";
import RoleOptionList from "./RoleOptionList";

const iconList = (size = 20) => [
  {
    id: 1,
    component: <Aperture color="#027A48" size={size} />,
    name: "Aperture",
  },
  {
    id: 2,
    component: <Codepen color="#FDB022" size={size} />,
    name: "Codepen",
  },
  {
    id: 3,
    component: <Codesandbox color="#6941C6" size={size} />,
    name: "Codesandbox",
  },
  {
    id: 4,
    component: <Coffee color="#B42318" size={size} />,
    name: "Coffee",
  },
  {
    id: 5,
    component: <Database color="#6941C6" size={size} />,
    name: "Database",
  },
  {
    id: 6,
    component: <Edit color="#FDB022" size={size} />,
    name: "Edit",
  },
  {
    id: 7,
    component: <Flag color="#32D583" size={size} />,
    name: "Flag",
  },
  {
    id: 7,
    component: <Globe color="#F97066" size={size} />,
    name: "Globe",
  },
  {
    id: 8,
    component: <User color="#B54708" size={size} />,
    name: "User",
  },
];

const AddRoleModal = (props) => {
  const { open, setOpen, setIsDataMutated, roleStructure } = props;
  const toggleHandler = () => setOpen(false);
  const [roleName, setRoleName] = useState("");
  const [roleRemarks, setRoleRemarks] = useState("");
  const [roleIcon, setRoleIcon] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [roleData, setRoleData] = useState();

  const getRoleFromStructure = (structure) => {
    const result = {};
    Object.entries(structure)?.forEach((struct) => {
      switch (struct[1]._type) {
        case "switch":
          result[struct[0]] = false;
          break;
        case "checkbox":
          result[struct[0]] = { edit: false, view: false };
          break;
        default:
          delete struct[1]._name;
          result[struct[0]] = getRoleFromStructure(struct[1]);
          break;
      }
    });
    return result;
  };

  //   Function to get role structure
  const roleStructureResponse = async () => {
    const _roleData = getRoleFromStructure(
      JSON.parse(JSON.stringify(roleStructure)),
    );

    setRoleData(_roleData);
  };

  //   Once Run UseEffect
  useEffect(() => {
    roleStructureResponse();
  }, [roleStructure]);

  // Function to handle role save
  const handleRoleSave = async () => {
    setIsButtonClicked(true);
    const dataToSend = { ...roleData };

    dataToSend.name = roleName;
    if (roleRemarks !== "") {
      dataToSend.remarks = roleRemarks;
    }
    if (roleIcon !== "") {
      dataToSend.icon = roleIcon;
    }

    const roleResponse = await addNewRoleApi({ dataToSend });
    if (roleResponse === null) {
      setIsButtonClicked(false);
    } else if (roleResponse.status === 200) {
      setIsDataMutated(true);
      setOpen(false);
      setRoleData();
    }
    setIsButtonClicked(false);
  };

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
      <div className="text-center mb-3">
        <h1>Add New Role</h1>
        <p>Add New Role</p>
      </div>

      <ModalBody className={cn(styles.modalBody, "position-relative")}>
        {/* Name and Description input */}
        <Row tag="form" onSubmit={handleRoleSave}>
          <Col xs={12}>
            <Input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Role Name"
            />
          </Col>
          <Col xs={12} className="mt-2">
            <Input
              value={roleRemarks}
              onChange={(e) => setRoleRemarks(e.target.value)}
              placeholder="Remarks"
              type="textarea"
            />
          </Col>
        </Row>

        {/* Icon Options */}
        <Row>
          <Col xs={12} className="mt-2">
            <Label style={{ fontSize: "1rem" }}>Select Icon</Label>
            <div className="d-flex flex-wrap justify-content-start justify-content-lg-between gap-1">
              {iconList(25).map((item, index) => {
                return (
                  <div
                    onClick={() => setRoleIcon(item.name)}
                    key={index}
                    className={cn(
                      roleIcon === item.name &&
                        `${styles.selectedIcon} rounded`,
                      styles.iconWrapper,
                      "rounded cursor-pointer",
                    )}
                  >
                    {item.component}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs={12}>
            <div className="d-flex bg-light align-items-center px-1 py-1 rounded">
              <div className="me-auto">
                <span style={{ fontSize: "1.1rem" }}>Role Permission</span>
              </div>
              <div>
                <span className="fw-bolder user-select-none cursor-pointer">
                  Edit
                </span>
                <span className="ms-1 fw-bolder user-select-none cursor-pointer">
                  View
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Role Toggle Options */}
        <div>
          <RoleOptionList
            roleStructure={roleStructure}
            roleData={roleData}
            updateRoleData={(data) => {
              setRoleData(data);
            }}
          />
        </div>
      </ModalBody>
      <div className="py-2">
        <div className="d-flex justify-content-center">
          {isButtonClicked ? (
            <Button
              disabled
              color="primary px-3 py-1 fw-bold"
              style={{ fontSize: "1.3rem" }}
            >
              Saving...
              <Spinner size="sm" />
            </Button>
          ) : (
            <Button
              onClick={() => handleRoleSave()}
              color="primary px-3 py-1 fw-bold"
              style={{ fontSize: "1.3rem" }}
            >
              Save Role
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddRoleModal;

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
import styles from "./DuplicateRoleModal.module.css";
import cn from "classnames";
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
import RoleOptionList from "../../addRoleModal/RoleOptionList";
import addNewRoleApi from "@apicall/services/roles/addNewRole";

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
    name: "CodeSandbox",
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

const DuplicateRoleModal = ({
  state,
  closeDuplicateModal,
  data,
  icon,
  roleStructure,
  setIsDataMutated,
  closeRoleRightModal,
}) => {
  const [roleName, setRoleName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [rolesData, setRolesData] = useState({});
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    setRoleName(data?.name);
    setRemarks(data?.remarks);
    setSelectedIcon(icon);
    setRolesData(data?.role);
  }, [data]);

  //   Function to handle duplicate role
  const handleDuplicateRole = async () => {
    if (isButtonClicked) return;
    setIsButtonClicked(true);
    const dataToSend = { ...rolesData };

    dataToSend.name = roleName;
    if (remarks !== "") {
      dataToSend.remarks = remarks;
    }

    if (selectedIcon !== "") {
      dataToSend.icon = selectedIcon;
    }

    const roleResponse = await addNewRoleApi({ dataToSend });

    if (roleResponse !== null) {
      setIsDataMutated(true);
      closeDuplicateModal();
      closeRoleRightModal();
    }

    setIsButtonClicked(false);
  };

  return (
    <Modal
      isOpen={state}
      onClosed={closeDuplicateModal}
      toggle={closeDuplicateModal}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={closeDuplicateModal}
      ></ModalHeader>
      <div className="text-center mb-3">
        <h1>Duplicate Role</h1>
      </div>

      {/* Modal Body */}
      <ModalBody className={cn(styles.modalBody, "position-relative")}>
        <Row tag="form">
          <Col xs={12}>
            <Input
              value={roleName}
              onChange={(e) => {
                setRoleName(e.target.value);
              }}
              placeholder="Role Name"
            />
          </Col>
          <Col xs={12} className="mt-2">
            <Input
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Remarks"
              type="textarea"
            />
          </Col>
        </Row>

        {/* Role Icon */}
        <Row>
          <Col xs={12} className="mt-2">
            <Label style={{ fontSize: "1rem" }}>Select Icon</Label>
            <div className="d-flex flex-wrap justify-content-start justify-content-lg-between gap-1">
              {iconList(25).map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedIcon(item.name);
                    }}
                    key={index}
                    className={cn(
                      selectedIcon === item.name &&
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

        {/* Role Info */}
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

        {/* Role List */}
        <div className="ms-1">
          <RoleOptionList
            roleData={rolesData}
            roleStructure={roleStructure}
            updateRoleData={(data) => {
              setRolesData(data);
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
              onClick={() => handleDuplicateRole()}
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

export default DuplicateRoleModal;

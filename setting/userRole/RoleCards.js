import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, CardBody } from "reactstrap";
import * as Icon from "react-feather";
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";
import AddRoleModal from "./addRoleModal/AddRoleModal";
import RolesRightModal from "./rolesRightModal/RolesRightModal";
import { verifyPermission } from "@reusable/ability";
import styles from "./RoleCards.module.css";
import colorOptions from "./colorOption";

const RoleCards = ({
  defaultRoleList,
  customRoleList,
  roleStructure,
  setIsDataMutated,
  isDataMutated,
}) => {
  const [selectedRoleData, setSelectedRoleData] = useState({});
  const [showRoleRightModal, setShowRoleRightModal] = useState(false);
  const [isAddRoleModalOpened, setIsAddRoleModalOpened] = useState(false);

  // Function to close right modal
  const closeRoleRightModal = () => setShowRoleRightModal(false);

  // Function to handle edit click
  const handleEditClick = (data, isCustom) => {
    setSelectedRoleData({ data, isCustom });
    setShowRoleRightModal(true);
  };

  const InfoIcon = Icon["Info"];

  return (
    <Fragment>
      {/* Default Role */}
      <Row>
        {defaultRoleList?.map((item, index) => {
          const IconTag = Icon[item.icon];
          return (
            <Col key={index} xl={4} md={6}>
              <Card
                className={`cursor-pointer ${
                  item.isDisabled ? styles.disabledCatd : styles.roleCard
                }`}
                onClick={() => handleEditClick(item, false)}
              >
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <span>{`Total ${item?.employeeCount} users`}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                    <div className="role-heading">
                      <div className="d-flex items-center mb-0">
                        {item?.icon && (
                          <div>
                            <IconTag
                              size={18}
                              color={colorOptions[item.icon]}
                              className="me-1"
                            />
                          </div>
                        )}

                        <h4 className="fw-bolder">{item.name}</h4>
                      </div>

                      <div style={{ height: "15px" }} />
                    </div>

                    {item?.isDisabled && (
                      <Link className="role-edit-modal">
                        <small className="fw-bolder">Enable Role</small>
                      </Link>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        <Col xl={4} md={6}>
          {verifyPermission(["restaurant.userRole.edit"]) && (
            <Card className={`${styles.roleCard}`}>
              <Row>
                <Col sm={5}>
                  <div className="d-flex align-items-end justify-content-center h-100">
                    <img
                      className="img-fluid mt-2"
                      src={illustration}
                      alt="Image"
                      width={85}
                    />
                  </div>
                </Col>
                <Col sm={7}>
                  <CardBody className="text-sm-end text-center ps-sm-0">
                    <Button
                      color="primary"
                      className="text-nowrap mb-1"
                      onClick={() => setIsAddRoleModalOpened(true)}
                    >
                      Add New Role
                    </Button>
                    <p className="mb-0">Add a new role, if it does not exist</p>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>

      {customRoleList.length > 0 && (
        <Row>
          <div className="mt-3">
            <h3>Custom Role</h3>
            <p className="mb-2">
              A role provides access to predefined menus and features depending
              on the assigned
            </p>
          </div>
          {customRoleList?.map((item, index) => {
            let IconTag;
            if (item.icon) {
              IconTag = Icon[item.icon];
            }

            return (
              <Col key={index} xl={4} md={6}>
                <Card
                  className={`cursor-pointer ${
                    item.isDisabled ? styles.disabledCatd : styles.roleCard
                  }`}
                  onClick={() => handleEditClick(item, true)}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <span>{`Total ${item?.employeeCount} users`}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                      <div className="role-heading">
                        <div className="d-flex items-center mb-0">
                          {IconTag !== undefined && (
                            <div>
                              <IconTag
                                color={colorOptions[item.icon]}
                                size={18}
                                className="me-1"
                              />
                            </div>
                          )}

                          <h4 className="fw-bolder">{item?.name}</h4>
                        </div>
                        <Link className="role-edit-modal">
                          <small className="fw-bolder">Edit Role</small>
                        </Link>
                      </div>

                      {item?.isDisabled && (
                        <Link className="role-edit-modal">
                          <small className="fw-bolder">Enable Role</small>
                        </Link>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Right Modal */}
      <RolesRightModal
        state={showRoleRightModal}
        closeRoleRightModal={closeRoleRightModal}
        data={selectedRoleData}
        setIsDataMutated={setIsDataMutated}
        isDataMutated={isDataMutated}
        roleStructure={roleStructure}
      />

      {/* Add Role Modal */}
      <AddRoleModal
        open={isAddRoleModalOpened}
        setOpen={setIsAddRoleModalOpened}
        setIsDataMutated={setIsDataMutated}
        roleStructure={roleStructure}
      />
    </Fragment>
  );
};

export default RoleCards;

import React from "react";
import { Spinner } from "reactstrap";
import RoleOptionList from "../../addRoleModal/RoleOptionList";
import styles from "./RolesPermission.module.css";

const RolesPermission = ({ data, isDataLoading, roleStructure }) => {
  return (
    <div>
      <div>
        {/* Heading */}
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <p>Role Permission</p>
          </div>

          <div className={styles.editAndViewContainer}>
            <p>Edit</p>
            <p>View</p>
          </div>
        </div>

        {/* Lists */}
        <div className={styles.rolesListContainer}>
          {isDataLoading ? (
            <div className="d-flex items-center justify-content-center mt-2">
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <div>
              <RoleOptionList
                roleStructure={JSON.parse(JSON.stringify(roleStructure))}
                roleData={data?.role}
                isDisabled={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolesPermission;

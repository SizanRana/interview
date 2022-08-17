import React from "react";
import { Modal, ModalBody } from "reactstrap";
import styles from "./UserDetailRightModal.module.css";

const UserDetailRightModal = ({
  state,
  closeUserDetailRightModal,
  // selectedUserData,
}) => {
  const restaurantData = JSON.parse(
    localStorage.getItem("userData"),
  ).activeRestaurant;

  // console.log("This is the selected user data", selectedUserData);

  return (
    <Modal
      isOpen={state}
      toggle={closeUserDetailRightModal}
      className="sidebar-lg"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalBody className="mt-0 py-2">
        {/* Header */}
        <div>
          <h3>Profile</h3>
        </div>

        {/* User Profile */}
        <div className="mt-4">
          {/* User Image */}
          <div className={styles.userImageContainer}>
            {/* Profile Image */}
            <div className={styles.profileImageContaimer}>
              <img
                className={styles.backgroundImage}
                alt={restaurantData.name}
                src={restaurantData.displayImage}
              />
              <img
                className={styles.profileImage}
                src="https://ui-avatars.com/api/?name=SizanRana%&background=abcdef"
              />
            </div>
          </div>

          {/* User Details */}
          <div className="mt-5">
            {/* User Name */}
            <div>
              <h4 className="text-center">Sizan Rana</h4>
            </div>

            {/* User Position */}
            <div className="d-flex justify-content-center">
              <p className={`${styles.staffPosition}`}>Co-Owner</p>
            </div>

            {/* User Bio */}
            <div>
              <p className="text-center">
                FoodHuntter, Food Lover, Taste Explorer
              </p>
            </div>
          </div>

          {/* User Skills */}
          <div className="mt-3">
            <h4>Skills</h4>
            {/* Skills List */}
            <div className="mt-2">
              <p className={styles.userSkill}>Cooking</p>
            </div>
          </div>

          {/* User Experiece */}
          <div className="mt-3">
            <h4>Experiences</h4>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UserDetailRightModal;

import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import deleteRestaurantApi from "@apicall/services/restaurant/deleteRestaurantApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refetchUserData } from "@store/userDataSlice/userDataSlice";
import InputPasswordToggle from "@components/input-password-toggle";

const DeleteRestaurantModal = ({
  state,
  closeDeleteModal,
  restaurantName,
  restaurantId,
  userId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  // Function to close delete modal and clear state
  const closeAndClearModaState = () => {
    closeDeleteModal();
    setPassword("");
    setErrorMessage("");
  };

  //   UseEffect to clear error message
  useEffect(
    () => () => {
      setErrorMessage("");
    },
    [password],
  );

  //   Function to handle delete restaurant
  const deleteRestaurant = async (e) => {
    e.preventDefault();

    if (!password) {
      setErrorMessage("Please is required.");
      return;
    }

    const deleteResData = await deleteRestaurantApi({
      restaurantId,
      userId,
      password,
    });

    if (deleteResData) {
      dispatch(refetchUserData());
      closeDeleteModal();
      history.push("/");
    }
  };
  return (
    <Modal
      isOpen={state}
      toggle={() => closeAndClearModaState()}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={() => closeAndClearModaState()}>
        Delete Restaurant
      </ModalHeader>
      <ModalBody>
        Do you want to delete '{restaurantName}' restaurant ?
        <form>
          {errorMessage && (
            <div className="mt-1">
              <Alert color="primary">
                <div className="alert-body font-small-2">
                  <p>
                    <small className="mr-50">
                      <span className="font-weight-bold">Alert:</span>{" "}
                      {errorMessage}
                    </small>
                  </p>
                </div>
              </Alert>
            </div>
          )}

          <InputPasswordToggle
            className="input-group-merge mt-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="pt-2"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              color="primary"
              onClick={(e) => deleteRestaurant(e)}
            >
              Delete
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default DeleteRestaurantModal;

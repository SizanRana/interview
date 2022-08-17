import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import classnames from "classnames";
import DeleteRestaurantModal from "./deleteRestaurantModal/DeleteRestaurantModal";
import styles from "./DeleteRestaurant.module.css";

const defaultValues = {
  confirmCheckbox: false,
};

const DeleteRestaurant = ({ userData }) => {
  const [openRestaurantDeleteModal, setOpenRestaurantDeleteModal] =
    useState(false);

  // Function to close delete restaurant modal
  const closeDeleteModal = () => setOpenRestaurantDeleteModal(false);

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  //   Function to handle on submit
  const onSubmit = (data) => {
    if (data.confirmCheckbox === true) {
      setOpenRestaurantDeleteModal(true);
    } else {
      setError("confirmCheckbox", { type: "manual" });
    }
  };

  return (
    <Card>
      <h4>Delete Restaurant</h4>
      <div className={styles.deleteContainer}>
        <CardBody className="py-2 my-25">
          <Alert color="warning">
            <h4 className="alert-heading">
              Are you sure you want to delete your restaurant?
            </h4>
            <div className="alert-body fw-normal">
              Once you delete your account, there is no going back. Please be
              certain.
            </div>
          </Alert>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-check">
              <Controller
                control={control}
                name="confirmCheckbox"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="checkbox"
                    id="confirmCheckbox"
                    checked={field?.value}
                    invalid={errors.confirmCheckbox && true}
                  />
                )}
              />
              <Label
                for="confirmCheckbox"
                className={classnames("form-check-label", {
                  "text-danger": errors && errors.confirmCheckbox,
                })}
              >
                I want to delete my restaurant.
              </Label>
              {errors && errors.confirmCheckbox && (
                <FormFeedback>
                  Please confirm that you want to delete restaurant
                </FormFeedback>
              )}
            </div>

            <div className="mt-1">
              <Button color="danger">Delete Restaurant</Button>
            </div>
          </Form>
        </CardBody>
      </div>

      <DeleteRestaurantModal
        state={openRestaurantDeleteModal}
        closeDeleteModal={closeDeleteModal}
        restaurantName={userData.activeRestaurant?.name}
        restaurantId={userData.activeRestaurant?._id}
        userId={userData._id}
      />
    </Card>
  );
};

export default DeleteRestaurant;

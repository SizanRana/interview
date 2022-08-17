import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Label,
  Input,
  Col,
  Row,
  Spinner,
  Alert,
} from "reactstrap";
import getRestaurantDataApi from "@apicall/services/restaurant/getRestaurantDataApi";
import { imageCompressor } from "@reusable/imageCompresor/imageCompresor";
import updateRestaurantDataApi from "@apicall/services/restaurant/updateRestaurantData";
import { useDispatch, useSelector } from "react-redux";
import { refetchUserData } from "@store/userDataSlice/userDataSlice";
import { verifyPermission } from "@reusable/ability";
import styles from "./RestaurantInformation.module.css";

// Function to validate if any data has changed or not
function isAnyFieldUpdatetd({ previousData, newData }) {
  if (newData?.avatar) return true;
  if (previousData?.name !== newData?.restaurantName.trim()) return true;
  if (previousData?.contact !== newData?.phoneNumber.trim()) return true;
  if (previousData?.address !== newData?.address.trim()) return true;

  return false;
}

const RestaurantInformation = () => {
  const imgRef = useRef(null);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userDataSlice?.userData);
  const [avatar, setAvatar] = useState();
  const [initialRestaurantData, setInitialRestaurantData] = useState({});
  const [restaurantImage, setRestaurantImage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchRestaurantData = async () => {
    const restaurantDataResponse = await getRestaurantDataApi({
      userId: userData._id,
      restaurantId: userData.activeRestaurant?._id,
    });

    const restaurantData = restaurantDataResponse.restaurant;
    dispatch(refetchUserData());

    setInitialRestaurantData(restaurantData);
    setRestaurantName(restaurantData.name);
    setRestaurantImage(restaurantData.displayImage);
    setAddress(restaurantData.address);
    setEmail(restaurantData.email);
    setPhoneNumber(restaurantData.contact);
    setAvatar();
  };

  // Single run useEffect
  useEffect(() => {
    fetchRestaurantData();
    setAvatar();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [restaurantName, phoneNumber, address, avatar]);

  // Handle Image upload
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const compressedImg = await imageCompressor(imageFile);
    setAvatar(compressedImg);
  };

  // handle save changes
  const saveChanges = async () => {
    if (!restaurantName.trim()) {
      setErrorMessage("Restaurant name is required.");
      return;
    }

    const hasAnyFieldUpdated = isAnyFieldUpdatetd({
      previousData: initialRestaurantData,
      newData: { avatar, phoneNumber, restaurantName, address },
    });

    if (!hasAnyFieldUpdated) {
      setErrorMessage("Make changes or click cancel to discard changes.");
      return true;
    }

    setIsSubmitted(true);
    const modifications = {
      name: restaurantName,
      contact: phoneNumber,
      address,
    };

    const fd = new FormData();
    if (avatar) {
      fd.append("coverImage", avatar.file, avatar.name);
    }
    fd.append("modifications", JSON.stringify(modifications));

    const restaurantUpdateResponse = await updateRestaurantDataApi({
      userId: userData._id,
      restaurantId: userData.activeRestaurant?._id,
      updatedData: fd,
    });

    if (restaurantUpdateResponse) fetchRestaurantData();

    setIsSubmitted(false);
  };

  // handle discard changes
  const discardChanges = async () => {
    setRestaurantName(initialRestaurantData.name);
    setRestaurantImage(initialRestaurantData.displayImage);
    setAddress(initialRestaurantData.address);
    setEmail(initialRestaurantData.email);
    setPhoneNumber(initialRestaurantData.contact);
    setAvatar();
  };

  return (
    <Fragment>
      <Card>
        {/* Title */}
        <div className="mt-2">
          <h4>Restaurant Profile</h4>
          <p>You can edit restaurant profile by changing the data below.</p>
        </div>
        <div className="py-2 my-25">
          {errorMessage.trim() ? (
            <div className="mt-2">
              <Alert color="primary">
                <div className="alert-body font-small-2">
                  <p>
                    <small className="mr-50">
                      <span className="font-weight-bold">Alert: </span>
                      {errorMessage}
                    </small>
                  </p>
                </div>
              </Alert>
            </div>
          ) : null}

          {/* Profile Image */}
          <div className={styles.profilImageContainer}>
            <div className="d-flex">
              <div className="me-25">
                <img
                  className={styles.profileImage}
                  src={
                    avatar?.file
                      ? URL.createObjectURL(avatar?.file)
                      : restaurantImage
                      ? restaurantImage
                      : `https://ui-avatars.com/api/?name=${restaurantName}%&background=abcdef`
                  }
                  alt="Restaurant Image"
                  height="100"
                  width="100"
                />
              </div>
              <div className="mt-75 ms-1">
                {/* Title */}
                <div>
                  <h4>Profile Image</h4>
                  <p>Upload new image to change your restaurant profile.</p>
                </div>
                <div>
                  {verifyPermission(["restaurant.editProfile"]) && (
                    <div>
                      <Button
                        tag={Label}
                        className="mb-75 me-75"
                        size="sm"
                        color="primary"
                      >
                        Upload
                        <Input
                          innerRef={imgRef}
                          onChange={handleImageUpload}
                          type="file"
                          hidden
                          accept="image/*"
                        />
                      </Button>

                      <Button
                        className="mb-75"
                        color="secondary"
                        size="sm"
                        outline
                        onClick={() => {
                          setAvatar();
                          if (imgRef.current) imgRef.current.value = null;
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-50">
            <div>
              <h4>Restaurant Details</h4>
            </div>
            <div className={styles.restaurantDetailContainer}>
              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="firstName">
                    Restaurant Name
                  </Label>

                  <Input
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    id="restaurantname"
                    placeholder="Restaurant Name"
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="lastName">
                    Address
                  </Label>

                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="lastName"
                    placeholder="Address"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="emailInput">
                    E-mail
                  </Label>
                  <Input
                    value={email}
                    id="emailInput"
                    type="email"
                    name="email"
                    disabled
                    placeholder="Email"
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="company">
                    Phone Number
                  </Label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="company"
                    name="Phone Number"
                    placeholder="Phone Number"
                  />
                </Col>

                <Col className="mt-2" sm="12">
                  {isSubmitted ? (
                    <Button className="me-1" color="primary" disabled>
                      Saving...
                      <Spinner size="sm" />
                    </Button>
                  ) : (
                    <span>
                      {verifyPermission(["restaurant.editProfile"]) && (
                        <Button
                          onClick={(e) => saveChanges(e)}
                          className="me-1"
                          color="primary"
                        >
                          Save changes
                        </Button>
                      )}
                    </span>
                  )}

                  {verifyPermission(["restaurant.editProfile"]) && (
                    <Button
                      onClick={() => discardChanges()}
                      color="secondary"
                      outline
                    >
                      Discard
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default RestaurantInformation;

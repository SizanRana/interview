import React from "react";
import { Button } from "reactstrap";
import editRestaurantStatusApi from "@apicall/services/restaurantSetting/editRestaurantStatus";

const RestaurantStatus = ({ status, userData, setIsDataMutated }) => {
  // Function to handle restaurant status change
  const handleRestaurantStatusChange = async (value) => {
    if (status === value) return;
    const statusChangeResponse = await editRestaurantStatusApi({
      value,
      restaurantId: userData.activeRestaurant._id,
    });

    if (statusChangeResponse) {
      setIsDataMutated(true);
    }
  };
  return (
    <div className="mt-2">
      {/* Heading and subheading */}
      <div>
        <h4>Restaurant Status</h4>
        <p>
          A role provides access to predefined menus and features depending on
          the assigned
        </p>
      </div>

      {/* Restaurant Options */}
      <div>
        <Button
          onClick={() => handleRestaurantStatusChange(true)}
          style={{ backgroundColor: !status && "#f2f4f7" }}
          color={status ? "primary" : "#E2E2E2"}
        >
          Open
        </Button>
        <Button
          onClick={() => handleRestaurantStatusChange(false)}
          style={{ backgroundColor: status && "#f2f4f7" }}
          color={!status ? "primary" : "#E2E2E2"}
          className="ms-2"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default RestaurantStatus;

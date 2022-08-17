import React from "react";
import { Input } from "reactstrap";
import changeOrderConfirmation from "@apicall/services/restaurantSetting/changeOrderConfirmation";

const OrderConfirmation = ({ isActive, setIsDataMutated, userData }) => {
  const handleConfirmOrderStatusChange = async () => {
    const confirmationStatusResponse = await changeOrderConfirmation({
      value: !isActive,
      restaurantId: userData.activeRestaurant._id,
    });

    if (confirmationStatusResponse) {
      setIsDataMutated(true);
    }
  };
  return (
    <div>
      {/* Heading */}
      <div>
        <h4>Order Confirmation</h4>
      </div>

      {/* Subheading and switch */}
      <div className="d-flex gap-5">
        <p>A role provides access to predefined</p>
        <div className="form-switch form-check-primary">
          <Input
            className="cursor-pointer"
            type="switch"
            checked={isActive}
            onChange={() => handleConfirmOrderStatusChange()}
            style={{ height: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

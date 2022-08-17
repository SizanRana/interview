import React, { useEffect, useState } from "react";

import DigitalMenuSetting from "./digitalMenuSetting/DigitalMenuSetting";
import OrderConfirmation from "./orderConfirmation/OrderConfirmation";
import RestaurantStatus from "./restaurantStatus/RestaurantStatus";
import { useSelector } from "react-redux";
import getRestaurantConfiguration from "@apicall/services/restaurantSetting/getRestaurantConfiguration";

const RestaurantGeneral = () => {
  const userData = useSelector((state) => state?.userDataSlice?.userData);

  const [isRestaurantActive, setIsRestaurantActive] = useState();
  const [isOrderConfirmationActive, setIsOrderConfirmationActicve] = useState();
  const [isDataMutated, setIsDataMutated] = useState(false);

  // Function to get restaurant configuration
  const restaurantConfiguration = async () => {
    const configurationResponse = await getRestaurantConfiguration({
      restaurantId: userData.activeRestaurant._id,
    });

    if (configurationResponse) {
      setIsRestaurantActive(configurationResponse.isActive);
      setIsOrderConfirmationActicve(configurationResponse.confirmOrders);
    }
  };

  useEffect(() => {
    restaurantConfiguration();
  }, []);

  // update data on mutation
  useEffect(() => {
    if (!isDataMutated) return;

    restaurantConfiguration();
    setIsDataMutated(false);
  }, [isDataMutated]);

  return (
    <div className="mt-2">
      {/* Restaurant Status */}
      <div>
        <RestaurantStatus
          status={isRestaurantActive}
          userData={userData}
          setIsDataMutated={setIsDataMutated}
        />
      </div>

      {/* Order Confirmation */}
      <div className="mt-5">
        <OrderConfirmation
          isActive={isOrderConfirmationActive}
          userData={userData}
          setIsDataMutated={setIsDataMutated}
        />
      </div>

      {/* Digital Menu */}
      <div className="mt-5">
        <DigitalMenuSetting />
      </div>
    </div>
  );
};

export default RestaurantGeneral;

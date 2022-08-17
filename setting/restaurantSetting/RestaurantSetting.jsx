import React from "react";
import DeleteRestaurant from "./deleteRestaurant/DeleteRestaurant";
import RestaurantInformation from "./restaurantInformation/RestaurantInformation";
import { verifyPermission } from "@reusable/ability";

const RestaurantSetting = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div>
      <div>
        <RestaurantInformation />
      </div>

      {verifyPermission(["restaurant.editProfile"]) && (
        <div>
          <DeleteRestaurant userData={userData} />
        </div>
      )}
    </div>
  );
};

export default RestaurantSetting;

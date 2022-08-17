import React, { useState } from "react";
import BlankPageCard from "@reusable/blankPageCard/BlankPageCard";
import styles from "./Setting.module.css";
import { Nav, NavItem, NavLink } from "reactstrap";
import RestaurantSetting from "./restaurantSetting/RestaurantSetting";
import UserRole from "./userRole/index";
import Faq from "./faq/Faq";
import RestaurantGeneral from "./restaurantGeneral/RestaurantGeneral";

const setting = () => {
  const [active, setActive] = useState("general");

  const tabItems = [
    {
      name: "Profile",
      value: "profile",
    },
    {
      name: "General",
      value: "general",
    },
    {
      name: "User Role",
      value: "userRole",
    },
    {
      name: "F.A.Q",
      value: "faq",
    },
    {
      name: "About",
      value: "about",
    },
  ];

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const renderSelectedCobntent = () => {
    switch (active) {
      case "profile":
        return <RestaurantSetting />;
      case "general":
        return <RestaurantGeneral />;
      case "userRole":
        return <UserRole />;
      case "faq":
        return <Faq />;
    }
  };

  return (
    <BlankPageCard>
      <div className={styles.settingContainer}>
        <div className="border-bottom mt-2">
          <h4>Settings</h4>

          <div className={styles.navContainer}>
            <Nav tabs>
              {tabItems.map((data, i) => {
                return (
                  <NavItem>
                    <NavLink
                      key={i}
                      active={active === data.value}
                      onClick={() => {
                        toggle(data.value);
                      }}
                    >
                      {data.name}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </div>
        </div>

        {/* Render Content */}
        <div className={styles.renderContentContainer}>
          {renderSelectedCobntent()}
        </div>
      </div>
    </BlankPageCard>
  );
};

export default setting;

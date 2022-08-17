import React from "react";
import Activity from "../../../../activity/Activity";

const RolesActivity = ({ roleId }) => {
  return (
    <div>
      <Activity
        type="ROLE_ACTIVITY"
        from="role"
        isScrollable={true}
        userId={roleId}
      />
    </div>
  );
};

export default RolesActivity;

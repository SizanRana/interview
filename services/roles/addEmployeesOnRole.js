import { getApiResponse } from "@apicall";

const addStaffOnRoleApi = async ({ roleId = null, staffIds = null }) => {
  const result = await getApiResponse({
    url: `/role/${roleId}/staff`,
    myVersion: "2.0",
    ofRestaurant: true,
    method: "put",
    isAuthenticated: true,
    type: "application/json",
    data: { staffIds },
    ofRestaurant: true,
  });

  console.log(result);
  if (result.APIFailed) return null;
  return result;
};

export default addStaffOnRoleApi;

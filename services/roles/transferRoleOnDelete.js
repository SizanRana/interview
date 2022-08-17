import { getApiResponse } from "@apicall";

const transferRoleOnDeleteApi = async ({ roleId = null, employees = null }) => {
  const result = await getApiResponse({
    url: `/role/${roleId}/staff`,
    myVersion: "2.0",
    ofRestaurant: true,
    method: "patch",
    isAuthenticated: true,
    type: "application/json",
    data: { employees },
    ofRestaurant: true,
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default transferRoleOnDeleteApi;

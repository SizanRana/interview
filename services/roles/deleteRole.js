import { getApiResponse } from "@apicall";

const deleteRoleApi = async ({ roleId = null }) => {
  const result = await getApiResponse({
    url: `/role/${roleId}`,
    myVersion: "2.0",
    isAuthenticated: true,
    ofRestaurant: true,
    method: "delete",
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default deleteRoleApi;

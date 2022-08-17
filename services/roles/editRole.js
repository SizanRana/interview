import { getApiResponse } from "@apicall";

const editRoleApi = async ({ roledId = null, dataToSend = null }) => {
  const result = await getApiResponse({
    url: `/role/${roledId}`,
    myVersion: "2.0",
    ofRestaurant: true,
    method: "patch",
    isAuthenticated: true,
    type: "application/json",
    data: { ...dataToSend },
    ofRestaurant: true,
  });

  if (result.APIFailed) return null;
  return result;
};

export default editRoleApi;

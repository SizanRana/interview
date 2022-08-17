import { getApiResponse } from "@apicall";

const disableRoleAPi = async ({ roledId = null }) => {
  const result = await getApiResponse({
    url: `/role/${roledId}/disable`,
    myVersion: "2.0",
    ofRestaurant: true,
    method: "put",
    isAuthenticated: true,
    ofRestaurant: true,
  });

  if (result.APIFailed) return null;
  return result;
};

export default disableRoleAPi;

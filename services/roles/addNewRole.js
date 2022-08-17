import { getApiResponse } from "@apicall";

const addNewRoleApi = async ({ dataToSend = null }) => {
  const result = await getApiResponse({
    url: `/role`,
    myVersion: "2.0",
    ofRestaurant: true,
    method: "post",
    isAuthenticated: true,
    type: "application/json",
    data: { ...dataToSend },
    ofRestaurant: true,
  });

  console.log(result);
  if (result.APIFailed) return null;
  return result;
};

export default addNewRoleApi;

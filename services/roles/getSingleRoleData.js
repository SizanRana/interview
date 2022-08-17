import { getApiResponse } from "@apicall";

const fetchSingleRoleDataApi = async ({ id = null }) => {
  const result = await getApiResponse({
    url: `/role/${id}`,
    myVersion: "2.0",
    isAuthenticated: true,
    ofRestaurant: true,
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default fetchSingleRoleDataApi;

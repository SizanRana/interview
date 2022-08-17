import { getApiResponse } from "@apicall";

const fetchAllRolesApi = async () => {
  const result = await getApiResponse({
    url: `/role/`,
    myVersion: "2.0",
    isAuthenticated: true,
    ofRestaurant: true,
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default fetchAllRolesApi;

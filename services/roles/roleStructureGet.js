import { getApiResponse } from "@apicall";

const fetchRoleStructureApi = async () => {
  const result = await getApiResponse({
    url: `/role/structure`,
    myVersion: "2.0",
    isAuthenticated: true,
    ofRestaurant: true,
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default fetchRoleStructureApi;

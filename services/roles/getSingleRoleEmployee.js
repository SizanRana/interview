import { getApiResponse } from "@apicall";

const fetchSingleRoleEmployeeList = async ({ id = null }) => {
  const result = await getApiResponse({
    url: `/role/${id}/staff`,
    myVersion: "2.0",
    isAuthenticated: true,
    ofRestaurant: true,
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default fetchSingleRoleEmployeeList;

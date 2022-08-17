import { getApiResponse } from "@apicall";

const fetchAllPermissionListApi = async () => {
  const result = await getApiResponse({
    url: `/role/permissionList`,
    myVersion: "2.0",
    isAuthenticated: true,
    ofRestaurant: true,
  });
  if (result.APIFailed) return null;
  return result.data;
};

export default fetchAllPermissionListApi;

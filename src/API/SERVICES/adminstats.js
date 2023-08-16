import { adminAxios } from "../axiosInstance";
export const getdashBoard = async () => {
    try {
      const response = await adminAxios({
        url:"/getDashBoard",
        method:"get"
      });
  
      return response;
    } catch {}
  };
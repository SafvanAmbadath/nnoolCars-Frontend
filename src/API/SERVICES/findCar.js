import { userAxios,adminAxios } from "../axiosInstance";



  export const getDate = async () => {
    try {
      const response = await userAxios({
        url:"/getdate",
        method:"get"
      });
  
      return response;
    } catch (e) {}
  };

  export const getcar = async (date, location) => {
    try {
      const response = await userAxios({
        url:  `/findCar?date=${date}&location=${location}`,
        method:"get"
      }
      
      );
  
      return response;
    } catch (e) {}
  };


  export const getCarDetails = async (id, date, endDate, time) => {
    try {
      console.log("entered into api for details");
      const response = await userAxios({
        url:`/getcar?id=${id}&date=${date}&endDate=${endDate}&time=${time}`,
        method:"get"
      }
      );
  
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
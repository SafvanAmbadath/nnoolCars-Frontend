import { userAxios, adminAxios } from "../axiosInstance";

export const getAreas = async (location) => {
    try {
      const response = await userAxios({
        url:`/getareas?location=${location}`,
        method:"GET"
      });
  
      return response;
    } catch {}
  };

export const postLocation = async (state, city) => {
    try {
        const response = await adminAxios({
            url: "/postlocation",
            method: "POST",
            data: {
                state: state,
                city: city,
            },
        });

        return response;
    } catch {}
};

export const getLocations = async () => {
    try {
        const response = await adminAxios({
            url: "/findLocation",
            method: "get",
        });

        return response.data;
    } catch {}
};



export const getDeleteLocation = async (deleteId) => {
    const response = await adminAxios({
        url: `/locationDelete?id=${deleteId}`,
        method: "POST",
    });

    return response;
};

export const getLandingLocations = async () => {
    try {
        const response = await userAxios({
           url: ("/getlocations"),
           method:"get",
        })

        return response.data.city;
    } catch (err) {
        console.log("locations api"+err);
    }
};

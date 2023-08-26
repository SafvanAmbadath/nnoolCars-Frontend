import { adminAxios } from "../axiosInstance";
export const getUsersList = async () => {
    try {
        const response =await adminAxios({
            method: "GET",
            url: "/getUserDetails", 
        });
        return response;
    } catch (error) {}
};

export const postBlockUser = async (id) => {
    try {
        const response =await adminAxios({
            method: "PATCH",
            url: `blockUser/${id}`, 
        });
        return response;
    } catch (error) {}
};

export const postUnblockUser = async (id) => {
    try {
        const response =await adminAxios({
            method: "PATCH",
            url: `unblockUser/${id}`, 
        });
        return response;
    } catch (error) {}
};
import { adminAxios, userAxios } from "../axiosInstance";

export const postCarBook = async (data) => {
    try {
        const response = await userAxios({
            url: "/createOrder",
            method: "POST",
            data: data,
        });

        return response;
    } catch (err) {}
};
export const expandTime = async (data) => {
    try {
        const response = await userAxios({
            url: "/updateExpandDate",
            method: "PATCH",
            data,
        });

        return response;
    } catch {}
};

export const getOrder = async()=>{
    try{
        const response = await adminAxios({
            url:'/getorderData',
            method:"get"
        })
        return response
    }catch(e){

    }
}

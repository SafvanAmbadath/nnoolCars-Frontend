import { adminAxios, userAxios } from "../axiosInstance";

export const checkAcc = async (userId) => {
    try {
        const response = await userAxios({
            url: `/checkAcc?userId=${userId}`,
            method: "get",
            // headers:{'Authorization':`Bearer ${token}`},
            data: { userId },
        });

        return response;
    } catch {}
};
export const compliteOrderForPayment = async () => {
    try {
        const response = await adminAxios({
            url: "/getCompliteOrder",
            method: "GET",
        });

        return response;
    } catch (e) {}
};
export const getAccountdetails = async (userId) => {
    try {
        const response = await adminAxios({
            url: `/getAccountdetails?userId=${userId}`,
            method: "GET",
        });

        return response;
    } catch (e) {}
};
export const paymentComplete = async (orderId) => {
    try {
        const response = await adminAxios({
            url: "/updatePaymentStatus",
            method: "PATCH",

            data: { orderId },
        });

        return response;
    } catch {}
};

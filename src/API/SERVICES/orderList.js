import { userAxios } from "../axiosInstance";
export const getOrderForlist = async (id) => {
    try {
        const response = await userAxios({
            url: `/getOrderForUser?userId=${id}`,
            method: "get",
        });

        return response;
    } catch (e) {}
};
export const updateCancelOrder = async (startDate, orderId, amount) => {
    try {
        const response = await userAxios({
            url: "/cancelOrder",
            method: "PATCH",
            data: {
                startDate,
                orderId,
                amount,
            },
        });

        return response;
    } catch {}
};

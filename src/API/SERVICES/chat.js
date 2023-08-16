import { userAxios } from "../axiosInstance";

export const sendMessage = async (from, to, message) => {
    try {
        const response = await userAxios({
            url: "/sendMessage",
            method: "POST",

            data: {
                from,
                to,
                message,
            },
        });
        console.log(response);
    } catch (e) {}
};

export const createChat = async (id, userId) => {
    try {
        const response = await userAxios({
            url: "/createChat",
            method: "POST",

            data: {
                senderUserId: id,
                reciverId: userId,
            },
        });

        return response;
    } catch (e) {}
};

export const getChatList = async (userId) => {
    try {
        const response = await userAxios({
            url: `/getChatList?userId=${userId}`,
            method: "GET",
        });

        return response;
    } catch (e) {}
};

export const createMessage = async (conversationId, senderId, msg) => {
    try {
        const response = await userAxios({
            url: "/sentMessage",
            method: "POST",
            data: {
                conversationId,
                sender: senderId,
                text: msg,
            },
        });

        return response;
    } catch (e) {}
};

export const getOldMessages = async (converSation) => {
    try {
        const response = await userAxios({
            url: `/getOldMessage?converSation=${converSation}`,
            method: "GET",
        });

        return response;
    } catch (e) {}
};

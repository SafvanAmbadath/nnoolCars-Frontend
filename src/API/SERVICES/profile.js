import { userAxios, adminAxios } from "../axiosInstance";

export const checkprofile = async (userid) => {
    try {
        const response = await userAxios({
            url: `/checkprofile?userId=${userid}`,
            method: "GET",
        });

        return response;
    } catch {}
};
export const uploadprofile = async ( userId, drivingLicense, identitycard) => {
    try {
        const response = await userAxios({
            url: "/postProfile",
            method: "POST",
            data: {
                userId,
                drivingLicense,
                identitycard,
            },
        });

        return response;
    } catch {}
};

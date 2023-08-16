import { userAxios, adminAxios } from "../axiosInstance";

export const postAccountDetails = async (userId,accountNumber, branch, ifscCode, accoundHolder) => {
    try {
        const response = await userAxios({
            url: "/postAccountDetails?",
            method: "POST",

            data: {
                userId,
                accountNumber,
                branch,
                ifscCode,
                accoundHolder,
            },
        });
        return response;
    } catch (e) {}
};

export const findAccount = async () => {
    try {
        const response = await userAxios({
            url: `/getAccount`,
            method: "GET",
        });
        return response;
    } catch (e) {}
};

export const postRentCar = async (rentCarData) => {
    try {
        const response = await userAxios({
            method: "POST",
            url: "/rentCarData",
            data: rentCarData,
        });
        return response;
    } catch (error) {}
};

export const getHostCars = async (status) => {
    try {
        const response = await adminAxios({
            method: "get",
            url: `/getStatusData?status=${status}`,
        });
        return response.data.car;
    } catch (error) {}
};

export const getPendingHostCars = async () => {
    try {
        const response = await adminAxios({
            method: "get",
            url: "/hostdata",
        });
        return response.data.car;
    } catch (error) {}
};

export const getHostApprove = async (id) => {
    try {
        const response = await adminAxios({
            method: "get",
            url: `/approve?id=${id}`,
        });
        return response;
    } catch (error) {}
};

export const getHostDeny = async (id) => {
    try {
        const response = await adminAxios({
            method: "get",
            url: `/denied?id=${id}`,
        });
        return response;
    } catch (error) {}
};

export const getuserCar = async (id) => {
    try {
        const response = await userAxios({
            url: `/gethostList?userId=${id}`,
            method: "GET",
        });
        return response;
    } catch {}
};

export const UpdateCompleteOrder = async (orderId) => {
    try {
        const response = await userAxios({
            url: "/setCompleteOrder",
            method: "POST",
            data: { orderId },
        });

        return response;
    } catch (e) {}
};

// export const hostApprove = async (id, token) => {
//   try {
//     const response = await adminAxios.get(`/approve?id=${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response;
//   } catch (e) {}
// };

// export const hostDenied = async (id, token) => {
//   try {
//     const response = await adminAxios.get(`/denied`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//   } catch (e) {}
// };

// export const getapproveAndDenile = async (token, data) => {
//   try {
//     const response = await adminAxios.get(`/getStatusData?status=${data}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data.car;
//   } catch (e) {}
// };

// export const getHosttData = async (token) => {
//   try {
//     const response = await adminAxios
//       .get("/hostdata", { headers: { Authorization: `Bearer ${token}` } })
//       .catch((e) => console.log(e));

//     return response.data.car;
//   } catch {}
// };

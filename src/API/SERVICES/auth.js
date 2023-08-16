import { authAxios, userAxios,adminAxios } from "../axiosInstance";

export const postLogin = async (loginData) => {
    try {
        const response =await authAxios({
            method: "POST",
            url: "/",
            data: loginData,
        });
        return response;
    } catch (error) {}
};

export const postRegister = async (registerData) => {
    try {
        const response =await userAxios({
            method: "POST",
            url: "/",
            data: registerData,
        });
        return response;
    } catch (error) {}
};

export const postGoogleAuthentication = async (loginData) => {
    try {
        const response =await userAxios({
            method: "POST",
            url: "/googleAuthentication",
            data: loginData,
        });
        return response;
    } catch (error) {}
};

export const postAdminLogin = async (loginData) => {
    try {
        const response =await adminAxios({
            method: "POST",
            url: "/adminlogin",
            data: loginData,
        });
        return response;
    } catch (error) {}
};

export const getVerifyUser = async (id,token) => {
    try {
        const response =await userAxios({
            method: "GET",
            url: `/${id}/verify/${token}`,
            
        });
        return response;
    } catch (error) {}
};
export const toLogin = async (email) => {
    try {
        const response =await userAxios({
            method: "POST",
            url: "/toLogin",
            data: email,
        });
        return response;
    } catch (error) {}
};
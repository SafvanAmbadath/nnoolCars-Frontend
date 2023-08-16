import axios from "axios";
import { store } from "../REDUX-TOOLKIT/store";
import { setLogin } from "../REDUX-TOOLKIT/SLICE/userReducer";

//userAxios
export const userAxios = axios.create({
    baseURL: "http://localhost:4000/users/",
    headers: {
        "Content-Type": "application/json",
    },
});
// adding an interceptor to attach jwt token to the request headers
userAxios.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");
        const { token, id } = store.getState().userSlice;

        if (id) {
            config.headers["userId"] = id;
        }

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

userAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("error" + error);
        if (error.response.status === 403) {
            console.log("blocked");
            store.dispatch(
                setLogin({
                    id: null,
                    name: null,
                    token: null,
                    email: null,
                    number: null,
                })
            );
            return error.response;
        }
        return error
        // return Promise.reject(error);
    }
);

//adminAxios
export const adminAxios = axios.create({
    baseURL: "http://localhost:4000/admin/",
    headers: {
        "Content-Type": "application/json",
    },
});
adminAxios.interceptors.request.use(
    (config) => {
        const { token } = store.getState().adminSlice;
        console.log("instance" + token);

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log("hello");
        return Promise.reject(error);
    }
);

//authAxios
export const authAxios = axios.create({
    baseURL: "http://localhost:4000/auth/",
    headers: {
        "Content-Type": "application/json",
    },
});
authAxios.interceptors.request.use(
    (config) => {
        console.log("interceptor");
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("erroreh" + error);
        if (error.response.status === 403) {
            console.log("blocked");
            store.dispatch(
                setLogin({
                    id: null,
                    name: null,
                    token: null,
                    email: null,
                    number: null,
                })
            );
            return error;
        }
        console.log(error);
        return error;
        //   return Promise.reject(error);
    }
);

import React, { useState } from "react";
import AdminNavbar from "../../COMPONENTS/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { postAdminLogin } from "../../API/SERVICES/auth";
import { useDispatch } from "react-redux";
import { setLoginAdmin } from "../../REDUX-TOOLKIT/SLICE/adminReducer";

function Login() {
    const [data, setData] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitLogin = async (e) => {
        try {
            console.log("adminlogin");
            e.preventDefault();
            const res = await postAdminLogin(data);
            console.log(res);
    

            if (res.status === 200) {
                // const adminToken = res.data.adminToken;
                // // console.log(adminToken);
                // localStorage.setItem("adminToken", JSON.stringify(adminToken));
                // navigate("/adminhome");
                dispatch(
                    setLoginAdmin({
                        token: res.data.adminToken,
                        name: res.data.name,
                        email: res.data.email,
                    })
                );
                navigate("/adminhome");
            } else if (res.status === 204) {
                message.error("You are not an admin");
            }
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                message.error(err.response.data.message);
            }
        }
    };

    return (
        <div className="w-screen h-screen ">
            <AdminNavbar />
            <div className="flex justify-center">
                <div className=" lg:w-4/12 sm:w-2/5 w-4/5 h-28  flex flex-col  p-3 m-14">
                    <div className="w-full">
                        <h1 className="text-4xl font-semibold ">Login</h1>
                        <p className="text-xl  ">Welcome Back! Please login to your account</p>
                    </div>
                    <div className="w-full mt-8 justify-center">
                        <form onSubmit={submitLogin} className="lg:w-383 sm:w-383 w-full  flex flex-col justify-center  ">
                            <label htmlFor="" className="text-xl">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                className="w-full border-2 border-gray-400 pl-2 h-11 mt-1 rounded-xl"
                            />
                            <label htmlFor="" className="text-xl mt-5">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full border-2 pl-2 border-gray-400 h-11 mt-1 rounded-xl"
                            />

                            <button
                                type="submit"
                                className="w-full h-11 bg-yellow-500 rounded-xl mt-10 text-center font-semibold text-xl text-white"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

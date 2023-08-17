import React, { useState } from "react";
import Navbar from "../COMPONENTS/Navbar";
import { postLogin, postRegister, postGoogleAuthentication } from "../API/SERVICES/auth";

import { useNavigate } from "react-router-dom";
import styles from "./styles.modules.css";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useDispatch } from "react-redux";
import { setLogin } from "../REDUX-TOOLKIT/SLICE/userReducer";
import { message } from "antd";

function Login() {
    const [displayregister, setDisplayRegister] = useState(false);
    const [displaylogin, setDisplayLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [data, setdata] = useState("");
    const [logindata, setLoginData] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const signUpHandle = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandle = (e) => {
        setLoginData({ ...logindata, [e.target.name]: e.target.value });
    };

    const submitLogin = async (e) => {
        try {
            console.log("login");

            const res = await postLogin(logindata);
            console.log(res);
            if (res.response && res.response.status >= 400 && res.response.status <= 500) {
                setError(res.response.data.message);
                message.error(res.response.data.message)
            }else{
                dispatch(
                    setLogin({
                        user: "user",
                        id: res.data.user._id,
                        name: res.data.user.firstName,
                        token: res.data.data,
                        email: res.data.user.email,
                        number:res.data.user.phoneNumber
                    })
                );
                // localStorage.setItem("token", res.data);
    
                setIsLoggedIn(true);
                navigate("/");

            }

            
        } catch (error) {
            
            console.log("not login"+error);
            
        }
    };

    const submitSignup = async (e) => {
        try {
            console.log("signup");
    
            const { data: res } = await postRegister(data);
          
            setMsg(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    const emailverify = async (data) => {
        try {
            const res = await postGoogleAuthentication(data);
            // console.log(res);
            if (res.status === 200) {
                const result = res.data;
                dispatch(
                    setLogin({
                        user: "user",
                        id: result.id,
                        name: result.name,
                        token: result.token,
                        email: result.email,
                    })
                );
                setIsLoggedIn(true);

                navigate("/");
                // const details = {
                //     user: "user",
                //     id: result.id,
                //     name: result.name,
                //     token: result.token,
                //     email: result.email,
                //     number: result.number,
                // };

                // Object.entries(details).forEach(([key, value]) => {
                //     localStorage.setItem(key, value);
                // });
                // localStorage.setItem("token", res.data.token);

                //   const result = res.data;

                //   if (oldDate.location && oldDate.endDate) {
                //     navigate("/home");
                //   } else if (oldDate.location) {
                //     navigate("/place");
                //   } else {
                //     navigate("/");
                //   }
                // } else {
            }
        } catch {}
    };

    return (
        <div className="w-screen h-screen bg-LandingImage">
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="w-screen text-center items-center flex justify-center">
                <div className="bg-white rounded-lg mt-10 h-[500px] w-[470px] items-center p-7  ">
                    {error && <div className={styles.error_msg}>{error}</div>}
                    {msg && <div className={styles.success_msg}>{msg}</div>}
                    <div className="w-full flex">
                        <div className="w-1/2 mt-4">
                            <div
                                className="w-full text-center bg-slate-100 h-12 rounded-t-lg font-bold pt-2"
                                onClick={() => {
                                    setDisplayRegister(false);
                                    setDisplayLogin(true);
                                }}
                            >
                                Login
                            </div>
                            <div className={`w-full h-1 ${displaylogin && "bg-yellow-400"} `}></div>
                        </div>
                        <div className="w-1/2 pl-2 mt-4">
                            <div
                                className="w-full text-center bg-slate-100 h-12 rounded-t-lg font-bold pt-2 cursor-pointer"
                                onClick={() => {
                                    setDisplayLogin(false);
                                    setDisplayRegister(true);
                                }}
                            >
                                Register
                            </div>
                            <div className={`w-full h-1 ${displayregister && "bg-yellow-400"} `}></div>
                        </div>
                    </div>
                    {displaylogin && (
                        <>
                            <div className="h- justify-around ">
                                <input
                                    type="email"
                                    name="email"
                                    id=""
                                    className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                    onChange={loginHandle}
                                    placeholder="Enter Your Email"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id=""
                                    className="w-full h-12 bg-slate-100 mt-6  pl-4  "
                                    onChange={loginHandle}
                                    placeholder="Enter Your Password"
                                />
                            </div>
                            <div className="flex w-full justify-between mt-8">
                                <div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="rememberPassword"
                                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                        <label
                                            htmlFor="rememberPassword"
                                            className="ml-2 block text-sm font-bold leading-5 text-gray-900"
                                        >
                                            Remember password?
                                        </label>
                                    </div>
                                    {/* <h1 className="font-bold">Remember password?</h1> */}
                                </div>
                                {/* <h1 className="">Forgot password?</h1> */}
                            </div>
                            <div>
                                <div className="">
                                    {" "}
                                    <button
                                        className="w-full rounded-lg h-12  mt-6  pl-4 font-semibold bg-yellow-500"
                                        onClick={submitLogin}
                                    >
                                        Login with password
                                    </button>
                                </div>
                                <h1 className="w-full text-center">OR</h1>
                                {/* <div className=" -mt">
                                    <button className="w-full rounded-lg h-12 bg-slate-100 mt-  pl-4 font-semibold">
                                        Login with OTP
                                    </button>
                                </div> */}
                                <div className="h-28 items-center mt-2  ">
                                    <LoginSocialGoogle
                                        className="  w-400 items-center  text-white rounded-md h-16  mb-10"
                                        client_id="271994734148-prgm6lkk9kn4bmj1g2u17care9ff717g.apps.googleusercontent.com"
                                        scope="openid profile email"
                                        discoveryDocs="claims_supported"
                                        access_type="offline"
                                        onResolve={emailverify}
                                        onReject={(err) => {
                                            console.log(err);
                                        }}
                                    >
                                        <GoogleLoginButton className="bg-dark-purple w-400   text-white rounded-md h-  mb-10" />
                                    </LoginSocialGoogle>
                                </div>
                            </div>
                        </>
                    )}

                    {displayregister && (
                        <>
                            <div className="w-full flex">
                                <div className="w-1/2 mt-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="w-1/2 pl-2 mt-4">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-1/2 mt-">
                                    <select
                                        name="gender"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4"
                                        placeholder="Select Your Gender"
                                        onChange={signUpHandle}
                                    >
                                        <option value="" className="">
                                            Select Your Gender
                                        </option>
                                        <option value="male" className="">
                                            Male
                                        </option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div className="w-1/2 pl-2 ">
                                    <input
                                        type="email"
                                        name="email"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-1/2 mt-">
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="Phone Number"
                                    />
                                </div>
                                <div className="w-1/2 pl-2 ">
                                    <input
                                        type="date"
                                        name="dob"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="dd/mm/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-1/2 mt-">
                                    <input
                                        type="password"
                                        name="password"
                                        id=""
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="w-1/2 pl-2 ">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="w-full h-12 bg-slate-100 mt-6 pl-4  "
                                        onChange={signUpHandle}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-1/2 mt-">
                                    <button
                                        className="w-44 h-12 bg-yellow-500 rounded-md mt-6 pl-4 font-bold"
                                        onClick={submitSignup}
                                    >
                                        Create account{" "}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;

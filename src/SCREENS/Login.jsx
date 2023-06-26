import React, { useState } from "react";
import Navbar from "../COMPONENTS/Navbar";
// import { userAxios } from "../axiosLink/axios";
// import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.modules.css";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

function Login() {
    const [displayregister, setDisplayRegister] = useState(false);
    const [displaylogin, setDisplayLogin] = useState(true);

    const [data, setdata] = useState("");
    const [logindata, setLoginData] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");


    const signUpHandle = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandle = (e) => {
        setLoginData({ ...logindata, [e.target.name]: e.target.value });
    };

    // console.log(data);

    // const submitLogin = async () => {
    //     if (logindata.email && logindata.password) {
    //         const res = await userAxios({
    //             url: "/login",
    //             method: "post",
    //             data: logindata,
    //         });
    //         // console.log(res, "login");

    //         if (res.status === 201) {
    //             navigate("/home");
    //         } else {
    //             const msg = res.data.msg;
    //             message.error(msg);
    //         }
    //     } else {
    //         message.error("fill columns");
    //     }
    // };
    const submitLogin = async (e) => {
        try {
            const url = "http://localhost:4000/api/auth";
            const { data: res } = await axios.post(url, logindata);
            localStorage.setItem("token", res.data);
            window.location = "/home";
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    // const submitSignup =async ()=>{

    //   if(data.password && data.firstName && data.lastName && data.email && data.phoneNumber && data.password && data.dob){
    //       if(data.password === data.confirmPassword){

    //           const res  = await userAxios({
    //                 url:'/signup',
    //                 method:'post',
    //                 data:data

    //           })
    //           // console.log(res,'lllllllllll');
    //           if(res.status === 201){
    //               navigate('/home')
    //           }else{
    //               setmsg(res.data.msg)
    //           }

    //       }else{
    //           message.error('Password incorrect')

    //       }
    // console.log(msg);

    //   }else{
    //     message.error('fill columns')

    // }

    // }
    const submitSignup = async (e) => {
        try {
            console.log("signup");
            const url = "http://localhost:4000/api/users";
            const { data: res } = await axios.post(url, data);
            // navigate("/login");
            // console.log(res.message);
            setMsg(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    const emailverify = async(data)=>{
        try {
            console.log("google login");
            console.log(data);
            const url="http://localhost:4000/api/users/googleAuthentication"
            // console.log(url);
            const res = await axios.post(url,data)
            console.log(res);
            if (res.status === 200) {
                console.log("status true");
            localStorage.setItem("token", res.data.token);
            window.location="/home"

            //   const result = res.data;
            //   dispatch(
            //     setLogin({
            //       ...oldDate,
            //       user: "user",
            //       id: result.id,
            //       name: result.name,
            //       token: result.token,
            //       email: result.email,
            //       number: result.number,
            //     })
            //   );
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
        
    }

    return (
        <div className="w-screen h-screen bg-LandingImage">
            <Navbar />
            <div className="w-full text-center items-center flex justify-center">
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
                                    <h1 className="font-bold">Remember password?</h1>
                                </div>
                                <h1 className="">Forgot password?</h1>
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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../REDUX-TOOLKIT/SLICE/userReducer";
import { useDispatch } from "react-redux";
import { toLogin } from "../../API/SERVICES/auth";
import{ message} from "antd"

function HostNumberVF({ open, setOpen, children }) {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { name } = useSelector((state) => state.userSlice);
   

    const hostverify = async (e) => {
      try{
        if(!name){
          navigate("/login")
        }
//         console.log(email);

//         console.log("hostVerify");
//         e.preventDefault();
// ;let Email=JSON.parse({email})
//         const res = await toLogin(Email);
//         console.log(email);
        if (res.status === 404) {
          message.error("User with given email not Exist!")
          navigate("/signup");
        } else {
          message.success("An Email sent to your account please verify")
           
        }

      }catch(err){
        console.log(err);
      }
      
    };

    if (!open) return null;
    return (
        <>
            <div
                className="fixed top-0 bottom-0 bg-black rounded z-5 0 right-0 left-0 opacity-80"
                onClick={() => setOpen(false)}
            />
            <div className="fixed z-50 p-3  bg-white lg:right-350px top-60 left-20 right-20 bottom-56 rounded-2xl lg:left-350px border-2 border-stone-600 shadow-2xl">
                <h1 className="sm:text-2xl font-bold text-black text-xl">Please enter your phone Email for Login</h1>
                <div>
                    <form className=" flex flex-col justify-between " onSubmit={hostverify}>
                        <div className="pt-5 flex justify-center">
                            {/* <input type="number" className="  placeholder:text-2xl border rounded-2xl h-16 w-1/5  outline-none focus:outline-dark-purple" placeholder="+91 " ></input> */}

                            <input
                                type="email"
                                className="placeholder:text-2xl border text-black text-2xl rounded-2xl h-16 w-3/5 ml-5 outline-none focus:outline-dark-purple"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className="m-4 mt-12 flex justify-center">
                            <button className="bg-green-600 w-400  text-white rounded-md h-16" type="submit">
                                CONTINUE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {children}
        </>
    );
}

export default HostNumberVF;

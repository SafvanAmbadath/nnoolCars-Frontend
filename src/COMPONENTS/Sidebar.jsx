import React from "react";
import { motion } from "framer-motion";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../REDUX-TOOLKIT/SLICE/userReducer";
import { HiOutlineLogout } from "react-icons/hi";
import { BsBookFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

function SideBarModal({ open, setOpen, location, name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, email } = useSelector((state) => state.userSlice);

  if (!open) return null;

  const loginPage = () => {
    navigate("/login");
  };
  const userLogout = () => {
    dispatch(
      setLogout({
        id: null,
        name: null,
        token: null,
        email: null,
       
      })
    );
    navigate("/");
  };
  return (
    <>
      <div
        className="fixed top-0 bottom-0 bg-black rounded  right-0 left-0 opacity-80 z-50"
        onClick={() => setOpen(false)}
      />
      <div className="fixed z-50   bg-white  top-0 left-0 lg:right-3/4 right-80 bottom-0 border-2 border-stone-600 shadow-2xl ">
        <motion.div className="bg-white  w-full p-1  h-screen absolute">
          <div className="flex  justify-items-center w-full h-14 bg-yellow-500   duration-75">
            <AiOutlineUser className="pt-3 text-4xl text-white" />
            <motion.button
              // onClick={loginPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={loginPage}
              className=" text-white text-right ml-1  "
              href=""
            >
              {token ? email : "Login/Signup"}
            </motion.button>
          </div>
          <div className="flex pt-6 justify-between duration-75 relative">
            <div className="flex">
              <BiCurrentLocation className="text-black text-2xl ml-1 " />
              <button
                onClick={() =>
                  navigate("/")
                }
                className=" text-black text-right ml-4  "
                href=""
              >
                Change City
              </button>
            </div>
            <h1 className=" font-bold text-green-600 mr-1 ">{location}</h1>
          </div>

          <div className="flex pt-6 justify-between duration-75 relative">
            <div className="flex">
              <BsBookFill className="text-black text-2xl ml-1 " />
              <button
                onClick={() => navigate("/listorderforuser")}
                className=" text-black text-right ml-4  "
                href=""
              >
                My Bookings
              </button>
            </div>
            <h1 className=" font-bold text-dark-purple mr-1 ">{}</h1>
          </div>
          <div className="flex pt-6 justify-between duration-75 relative">
            <div className="flex">
              <ImProfile className="text-black text-2xl ml-1 " />
              <button
                onClick={() => navigate("/uploadproof")}
                className=" text-black text-right ml-4  "
                href=""
              >
                Proof verification
              </button>
            </div>
            {/* <h1 className=" font-bold text-green-600 mr-1 ">
                {location }
              </h1> */}
          </div>

          {name && (
            <div className="flex pt-6 justify-items-center duration-75 relative">
              <HiOutlineLogout className="text-black text-2xl ml-1.5" />
              <button
                onClick={userLogout}
                className=" text-black text-right ml-4  "
                href=""
              >
                Logout
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default SideBarModal;

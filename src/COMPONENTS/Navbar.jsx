import { AiOutlineMenu } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../REDUX-TOOLKIT/SLICE/userReducer";
import SideBarModal from "./Sidebar";

const Navbar = ({ hide }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { name, email, location } = useSelector((state) => state.userSlice);

    const [open, setOpen] = useState(false);

    const userLogout = () => {
        dispatch(
            setLogout({
                id: null,
                name: null,
                token: null,
                email: null,
                number: null,
            })
        );
    };

    return (
        <div>
            <SideBarModal open={open} setOpen={setOpen} location={location} name={name} />
            {/* {open ? (
        <>
        
        <motion.div  className="bg-white  w-72  h-screen absolute">
          <BiLeftArrowAlt onClick={()=>{setOpen(false)}} className="bg-white text-dark-purple  text-3xl rounded-full absolute -right-4 top-3 border border-dark-purple" />
         <div className="flex  justify-items-center w-full h-14 bg-dark-purple   duration-75">
          <AiOutlineUser className="pt-3 text-4xl" />
          <motion.button 
          // onClick={loginPage}
               whileHover={{scale:1.1}}
               whileTap={{scale:0.9}}
               onClick={loginPage}
                className=" text-white text-right ml-4  "
                href=""
              >
                Login/Signup
              </motion.button>
              
         </div>
         <div className="flex pt-6 justify-between duration-75 relative">
          <div className="flex">

         <BiCurrentLocation className="text-black text-2xl ml-5"/>
          <button onClick={loginPage}
                className=" text-black text-right ml-4  "
                href=""
              >
               
                Change City
              </button>
          </div>
              <h1 className=" font-bold text-dark-purple mr-1 ">
                {location }
              </h1>
         </div>
      { name && <div className="flex pt-6 justify-items-center duration-75 relative">
         <BiCurrentLocation className="text-black text-2xl ml-5"/>
          <button onClick={userLogout}
                className=" text-black text-right ml-4  "
                href=""
              >
                Logout
              </button>
         </div>}
        </motion.div>
        </>
      ) : (
        <div></div>
      )} */}

            <div className="w-full h-20 bg-black  flex justify-between text-white p-0 md:p-4  items-center  ">
                <div className="md:flex gap- ">
                    <div className="p-5 text-3xl pt-14 md:pt-5 drop-shadow-lg font-bold text-white ">
                        <div className=" ">
                            {/* {open ? ('') : (<AiOutlineMenu className="sm:text-white text-black" onClick={()=>{setOpen(true)}}/>)} */}
                            <AiOutlineMenu
                                className="sm:text-yellow-500 text-white cursor-pointer"
                                onClick={() => {
                                    setOpen(true);
                                }}
                            />
                        </div>
                        <div></div>
                    </div>
                    <div className="flex mt-1">
                        <h1
                            className=" invisible md:visible text-yellow-500 font-bold text-2xl text-center pt-3 cursor-pointer "
                            onClick={() => navigate("/home")}
                        >
                            nnoolCars
                        </h1>
                    </div>
                </div>
                <div className="">
                    <ul className="md:flex gap-10  uppercase md:p-6  ">
                        <li>
                            <button
                                className="text-black text-right  md:mt-0 bg-white mt-6  h-12 bg-white-50 border text-xl  sm:h-12 border-gray-300  
                 text- rounded-3xl  focus:border-blue-500 -pt-1  p-2.5 md:before:content-['Become_a_'] drop-shadow-xl 
             "
                                onClick={() => {
                                    navigate("/rent");
                                }}
                            >
                                {" "}
                                Host{" "}
                            </button>
                        </li>
                        <li>
                            {name ? (
                                <p className=" text-yellow-500 font-semibold text-right md:mt-3 pt-0  invisible md:visible">{name}</p>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className=" text-white text-right md:mt-3 pt-0  invisible md:visible"
                                    href=""
                                >
                                    Login/Signup
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            {/* <AnimatePresence mode='wait'
       initial={false}

      

       onExitComplete ={()=> null}

        >
           {modalopen && <ModalLogin modalopen={modalopen} handleClose={closeModal} /> }
       </AnimatePresence> */}
        </div>
    );
};

export default Navbar;

// import React, { useState } from "react";
// import logo from "../COMPONENTS/images/logo5.png";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import SideBarModal from "./Sidebar";

// function Navbar({ isLoggedIn }) {
//     const navigate = useNavigate();
//     const { name, email, location } = useSelector((state) => state.userSlice);
//     const [open,setOpen]=useState(false)

//     return (
//         <div className="w-screen bg-white h-24 flex">
//             <SideBarModal
//         open={open}
//         setOpen={setOpen}
//         location={location}
//         name={name}
//       />
//             <img src={logo} alt="" className="w-60 h-20 ml-4" onClick={() => navigate("/")} />
//             <div className="flex justify-between w-full">
//                 <div className="w-full flex justify-between">
//                     <div className="flex mt-6 justify-between ">
//                         <h1
//                             className="text-lg  ml-10 font-semibold text-black cursor-pointer"
//                             onClick={() => navigate("/")}
//                         >
//                             Home
//                         </h1>
//                         <h1 className="text-lg ml-10 font-semibold text-black cursor-pointer">About</h1>

//                         <h1 className="text-lg ml-10  font-semibold text-black cursor-pointer">Contact</h1>
//                         <h1 className="text-lg ml-10 font-semibold text-black cursor-pointer">Blog</h1>
//                     </div>
//                 </div>
//                 <button
//                     className="rounded-full shadow-xl w-60 border-2 mt-4 h-11 font-bold"
//                     onClick={() => navigate("/rent")}
//                 >
//                     Rent your car
//                 </button>
//                 <div className="flex p-4 items-center  ">
//                     {/* <Link
//                         className="bg-yellow-500 px-4 py-3 text-black font-semibold rounded-md ml-4 -mt-2 inline-block whitespace-nowrap"
//                         to="/login"
//                     >
//                         Login / SignUp
//                     </Link> */}

//                     {name ? (
//                         <p className=" text-black font-bold text-right md:mt-1 pt-0  invisible md:visible">{name}</p>
//                     ) : (
//                         <Link
//                             to="/login"
//                             className="bg-yellow-500 px-4 py-3 text-black font-semibold rounded-md ml-4 -mt-2 inline-block whitespace-nowrap invisible md:visible"
//                             href=""
//                         >
//                             Login/Signup
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;

{
    /* <Link
                                className="bg-yellow-500 p-2 text-black font-semibold rounded-md ml-4 -mt-2 h-11  w-20 text-center "
                                to="/login"
                            >
                                Login / SignUp
                            </Link> */
}

{
    /* <Link className='bg-yellow-500 px-4 py-2 text-black font-semibold rounded-md ml-4 -mt-2 inline-block' to='/login' >Login / SignUp</Link> */
}

{
    /* <button className="bg-green-500 p-2 text-white rounded-md ml-4 -mt-2 h-11 w-20 text-center ">
                                SignUp
                            </button> */
}

{
    /* <button className="bg-red-500 p-2 text-white rounded-md ml-4 -mt-2 h-11 w-20 text-center ">
                            logout
                        </button> */
}

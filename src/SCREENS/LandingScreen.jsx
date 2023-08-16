import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../REDUX-TOOLKIT/SLICE/userReducer";
import moment from "moment";
import { message } from "antd";
import PlaceSet from "../COMPONENTS/Modal/PlaceSet";
import DateSet from "../COMPONENTS/Modal/DateSet";
import { getAreas, getDate } from "../API/SERVICES/Location";
import { getLandingLocations } from "../API/SERVICES/Location";
import "react-datetime/css/react-datetime.css";

import React from "react";
import logo from "../COMPONENTS/images/logo5.png";
import { BiLocationPlus } from "react-icons/bi";
import { BiCalendar } from "react-icons/bi";

import { Link } from "react-router-dom";

function LandingScreen() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [touchPlace, setTouch] = useState(false);
    const [touchDate, setDateTouch] = useState(false);
    const [sutable, setSutable] = useState([]);
    const { location,name } = useSelector((state) => state.userSlice);

    const [selectedDate, setSelectedDate] = useState();
    const [endDate, setEndDate] = useState();
    const [city, setCity] = useState("");
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState(false);
    const [locations, setLocations] = useState([]);
    const reduxstate = useSelector((state) => state.userSlice);

    useEffect(() => {
        setLoader(true);
        getLandingLocations().then((res) => {
            console.log(res)
            setLoader(false);
            setLocations(res);
        });
    }, []);

    // useEffect(() => {
    //   getDate().then((res) => {
    //     setSelectedDate(res.date);
    //   });
    // }, []);

    useEffect(() => {
        getAreas(location).then((res) => {
            if (res.status === 201) {
                console.log( res);
                setSutable(res.data.cars);
                setState(true);
            } else {
                setMessage(res.data.message);
            }
        });
    }, [ city, ]);

    const placeData = (location) => {
        dispatch(
            setLogin({
                ...reduxstate,
                location: location,
            })
        );
    };

    const findCar = () => {
        if (endDate) {
            navigate("/home",{state:{city}});
        } else {
            message.error("please chose your trip date");
        }
    };

    return (
        <div>
            <div className="w-full h-[1000px] bg-LandingImage">
                <div>
                    <div className="flex">
                        <div className="w-56 h-56  rounded-full bg-yellow-500 -ml-10 -mt-10 z-50">
                            <img src={logo} className="m-16 z-50 "></img>
                        </div>
                        <div className="w-56 h-56  rounded-full bg-yellow-500 -ml-20 -mt-32 "></div>
                        <div className="w-full">
                            <div className=" flex justify-center w-full">
                                <h1 className=" text-2xl text-yellow-500 p-3">
                                    Helpdesk : +91 790 253 0000 / +91 811 187 2366
                                </h1>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="flex mt-3 justify-between">
                                    <h1 className="text-lg  ml-10 font-semibold text-white">Home</h1>
                                    <h1 className="text-lg ml-10 font-semibold text-white">About</h1>

                                    <h1 className="text-lg ml-10  font-semibold text-white">Contact</h1>
                                    <h1 className="text-lg ml-10 font-semibold text-white">Blog</h1>
                                </div>
                                <div className="flex p-4">
                                    <Link
                                        className="bg-yellow-500 p-2 text-black font-semibold rounded-md ml-4 -mt-2 "
                                        to="/login"
                                    >{name?name:"Login / SignUp"}
                                      
                                    </Link>
                                    {/* <Link className='bg-green-500 p-2 text-white rounded-md ml-4 -mt-2 'to="/login" >SignUp</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full justify-center">
                        <h1 className="text-center text-3xl mt-10 font-semibold text-white ">
                            Welcome to nnoolCars,now joy of driving is nothing, but nnoolCars
                        </h1>
                        <h1 className="text-center mt-5 text-white">
                            Whether you're traveling for business or leisure, we have a wide selection of vehicles to fit
                            your needs and budget for every use
                        </h1>
                        <h1 className="text-yellow-500 font-semibold text-center text-4xl mt-5">
                            #DRIVE_IT_LIKE_YOU_OWN_IT
                        </h1>
                        <div className="w-full text-center">

                    <select
                        placeholder="Select Location"
                        onChange={(e) => {
                            setState(!state);
                            placeData(e.target.value);
                        }}
                        className="w-4/12 pl-4 mt-2 text-2xl  text-gray-700 border h-12 rounded-2xl outline-none focus:outline-dark-purple"
                    >
                        <option value="">--Select your Location--</option>
                        {locations?.map((data, index) => (
                            <option value={data.city} key={index}>
                                {data.city}
                            </option>
                        ))}
                    </select>
                        </div>

                    </div>

                    {/* <input
                        className="placeholder:text-2xl  w-4/12 mt-6 sm:mt-4 h-8 bg-white-50 border sm:w-600 sm:h-20 border-gray-300  text-sm rounded-3xl  focus:border-blue-500  p-2.5 "
                        type="text"
                        placeholder="Select Location"
                        onClick={(e) => {
                            e.preventDefault();
                            setState(!state);
                        }}
                    ></input>

                    {state ? (
                        <div className="w-4/12  sm:w-600     mx-auto  bg-white  rounded-lg border-stone-300 border-2 p-2 ">
                            {locations?.map((data, index) => (
                                <button
                                    className="text-left pl-8 cursor-pointer   w-full h-12 font-bold bg-white hover:bg-slate-100 pt-1 "
                                    value={data.city}
                                    onClick={() => placeData(data.city)}
                                    key={index}
                                >
                                    {data.city}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="sm:h-52 h-28"></div>
                    )} */}

                    <div className="px-28 ">
                        <div className="bg-white rounded-lg h-44 w-full mt-24">
                            <div className="px-10 w-full text-center pt-7">
                                <div className="border-2 h-24 border-gray-500 rounded-lg text-center flex cursor-pointer ">
                                    <div
                                        className="border-r-2 border-gray-500 w-2/6 cursor-pointer"
                                        onMouseOver={() => {
                                            setTouch(true);
                                        }}
                                    >
                                        <div className="flex justify-center">
                                            <h1 className="text-black text-sm font-bold pt-2">Pickup Point</h1>
                                            <h1 className="text-red-500 text-2xl ml-2">*</h1>
                                        </div>
                                        <div className="px-8">
                                            <div className="w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 ">
                                                <BiLocationPlus className="text-xl text-black" />
                                                <h1 className="pl-2 text-sm">{city ? city : "Select Pickup point"}</h1>
                                            </div>
                                        </div>
                                        <PlaceSet
                                            open={touchPlace}
                                            setCity={setCity}
                                            setOpen={setTouch}
                                            sutable={sutable}
                                            location={location}
                                            setOpenDate={setDateTouch}
                                        />
                                    </div>

                                    <div
                                        className="border-r-2 border-gray-500 w-2/6 cursor-pointer"
                                        onMouseOver={() => {
                                            setDateTouch(true);
                                        }}
                                    >
                                        <div className="flex justify-center">
                                            <h1 className="text-black text-sm font-bold pt-2">Pickup Date & Time</h1>
                                            <h1 className="text-red-500 text-2xl ml-2">*</h1>
                                        </div>
                                        <div className="px-8">
                                            <div className="w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 ">
                                                <BiCalendar className="text-xl text-black" />
                                                <h1 className="pl-2 text-sm">
                                                    {selectedDate
                                                        ? moment(selectedDate).format("yyyy-MM-DD HH:mm")
                                                        : "Select Pickup Date"}
                                                </h1>
                                            </div>
                                        </div>
                                        <DateSet
                                            open={touchDate}
                                            setOpen={setDateTouch}
                                            endDate={endDate}
                                            setEndDate={setEndDate}
                                            selectedDate={selectedDate}
                                            setSelectedDate={setSelectedDate}
                                        />
                                    </div>

                                    <div className="border-r-2 rounded-lg flex  w-4/6">
                                        <div className=" border-gray-500 w-3/6">
                                            <div className="flex justify-center">
                                                <h1 className="text-black text-sm font-bold pt-2">Dropoff Point</h1>
                                                <h1 className="text-red-500 text-2xl ml-2">*</h1>
                                            </div>
                                            <div className="px-8">
                                                <div className="w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 ">
                                                    <BiLocationPlus className="text-xl text-black" />
                                                    <h1 className="pl-2 text-sm">{city ? city : "Select Dropoff point"}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" border-gray-500 w-3/6">
                                            <div className="flex justify-center">
                                                <h1 className="text-black text-sm font-bold pt-2">Dropoff Date & Time</h1>
                                                <h1 className="text-red-500 text-2xl ml-2">*</h1>
                                            </div>
                                            <div className="px-8">
                                                <div className="w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 ">
                                                    <BiCalendar className="text-xl text-black" />
                                                    <h1 className="pl-2 text-sm">
                                                        {endDate
                                                            ? moment(endDate).format("yyyy-MM-DD HH:mm")
                                                            : "Select Dropoff Date"}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 w-full text-center items-center  ">
                                    <button
                                        className="bg-yellow-500 p-2 rounded-full mt-5 w-24 text-black  font-semibold -"
                                        onClick={findCar}
                                    >
                                        search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingScreen;

// import React from 'react';
// import logo from '../COMPONENTS/images/logo5.png';
// import { BiLocationPlus } from 'react-icons/bi';
// import { BiCalendar } from 'react-icons/bi';
// import { Link } from 'react-router-dom';

// function LandingScreen() {
//   return (
//     <div>
//       <div className='w-full h-[1000px] bg-LandingImage'>
//         <div className='container mx-auto'>
//           <div className='flex flex-col md:flex-row md:justify-between items-center'>
//             <div className='w-56 h-56 rounded-full bg-yellow-500 -mt-10 z-50'>
//               <img src={logo} className='m-16 z-50' alt='Logo' />
//             </div>
//             <div className='w-56 h-56 rounded-full bg-yellow-500 -mt-32'></div>
//             <div className='w-full'>
//               <div className='flex justify-center md:justify-end'>
//                 <h1 className='text-2xl text-yellow-500 p-3'>
//                   Helpdesk : +91 790 253 0000 / +91 799 613 1318
//                 </h1>
//               </div>
//               <div className='w-full flex flex-col md:flex-row md:justify-between'>
//                 <div className='flex mt-3 justify-center md:justify-start'>
//                   <h1 className='text-lg ml-0 md:ml-10 font-semibold text-white'>
//                     Home
//                   </h1>
//                   <h1 className='text-lg ml-0 md:ml-10 font-semibold text-white'>
//                     About
//                   </h1>
//                   <h1 className='text-lg ml-0 md:ml-10 font-semibold text-white'>
//                     Contact
//                   </h1>
//                   <h1 className='text-lg ml-0 md:ml-10 font-semibold text-white'>
//                     Blog
//                   </h1>
//                 </div>
//                 <div className='flex p-4'>
//                   <Link
//                     className='bg-yellow-500 p-2 text-black font-semibold rounded-md ml-4 -mt-2'
//                     to='/login'
//                   >
//                     Login / SignUp
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className='w-full justify-center'>
//             <h1 className='text-center text-3xl mt-10 font-semibold text-white '>
//               Welcome to nnoolCars, now joy of driving is nothing, but nnoolCars
//             </h1>
//             <h1 className='text-center mt-5 text-white'>
//               Whether you're traveling for business or leisure, we have a wide
//               selection of vehicles to fit your needs and budget for every use
//             </h1>
//             <h1 className='text-yellow-500 font-semibold text-center text-4xl mt-5'>
//               #DRIVE_IT_LIKE_YOU_OWN_IT
//             </h1>
//           </div>
//           <div className='px-4 md:px-28'>
//             <div className='bg-white rounded-lg h-44 w-full md:w-auto mt-24'>
//               <div className='px-10 w-full text-center pt-7'>
//                 <div className='border-2 h-24 border-gray-500 rounded-lg text-center md:flex md:items-center'>

//                   <div className='border-r-0 md:border-r-2 border-gray-500 w-full md:w-2/6'>
//                     <div className='flex justify-center'>
//                       <h1 className='text-black text-xl font-semibold pt-2'>
//                         Pickup Point
//                       </h1>
//                       <h1 className='text-red-500 text-2xl ml-2'>*</h1>
//                     </div>
//                     <div className='px-8'>
//                       <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
//                         <BiLocationPlus className='text-xl text-black' />
//                         <h1 className='pl-2 text-sm'>Select Pickup point</h1>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='border-r-0 md:border-r-2 border-gray-500 w-full md:w-2/6'>
//                     <div className='flex justify-center'>
//                       <h1 className='text-black text-xl font-semibold pt-2'>
//                         Pickup date & Time
//                       </h1>
//                       <h1 className='text-red-500 text-2xl ml-2'>*</h1>
//                     </div>
//                     <div className='px-8'>
//                       <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
//                         <BiCalendar className='text-xl text-black' />
//                         <h1 className='pl-2 text-sm'>Select pickup Date</h1>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='border-r-0 md:border-r-2 border-gray-500 w-full md:w-2/6'>
//                     <div className='flex justify-center'>
//                       <h1 className='text-black text-xl font-semibold pt-2'>
//                         Dropoff Point
//                       </h1>
//                       <h1 className='text-red-500 text-2xl ml-2'>*</h1>
//                     </div>
//                     <div className='px-8'>
//                       <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
//                         <BiLocationPlus className='text-xl text-black' />
//                         <h1 className='pl-2 text-sm'>Select Dropoff point</h1>
//                       </div>
//                     </div>
//                   </div>
//                   <div className='border-r-0 md:border-r-2 border-gray-500 w-full md:w-2/6'>
//                     <div className='flex justify-center'>
//                       <h1 className='text-black text-xl font-semibold pt-2'>
//                         Dropoff date & Time
//                       </h1>
//                       <h1 className='text-red-500 text-2xl ml-2'>*</h1>
//                     </div>
//                     <div className='px-8'>
//                       <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
//                         <BiCalendar className='text-xl text-black' />
//                         <h1 className='pl-2 text-sm'>Select Dropoff Date</h1>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className='p-3 w-full text-center items-center  '>
//                   <button className='bg-yellow-500 p-2 rounded-full mt-5 w-24 text-black font-bold'>
//                     SEARCH
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingScreen;

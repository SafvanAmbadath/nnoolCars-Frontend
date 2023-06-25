import React from "react";
import Navbar from "../COMPONENTS/Navbar";

function HomeScreen() {
    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="w-screen h-screen flex ">
                <div className="w-2/12 h-full bg-slate-50 ">
                    <div className="w-full flex justify-between p-2">
                        <h1 className="text-xl ">Filters</h1>
                        <h1 className="text-yellow-500 font-bold text-xl">Reset All</h1>
                    </div>
                    <div className="mx-5 mt-3">
                        <hr className="h-3 text-black" />
                    </div>
                    <div>
                        <div className="pl-2">
                            <h1 className="text-lg text-black">Segment</h1>
                        </div>
                        <div className="w-full p-2 flex">
                            <div className="w-[65px] h-10 bg-slate-200 rounded-lg border-2 border-gray-300 ">Hatch</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300 ">Sedan</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300">Compact Suv</div>
                        </div>
                        <div className="w-full p-2 flex">
                            <div className="w-[65px] h-10 bg-slate-200 rounded-lg border-2 border-gray-300 ">Suv</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300 ">Muv</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300">Luxury</div>
                        </div>
                    </div>
                    <div>
                        <div className="pl-2 mt-6">
                            <h1 className="text-lg text-black">Fuel</h1>
                        </div>
                        <div className="w-full p-2 flex">
                            <div className="w-[65px] h-10 bg-slate-200 rounded-lg border-2 border-gray-300 ">Petrol</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300 ">Diesal</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300">Electric</div>
                        </div>
                    </div>

                    <div>
                        <div className="pl-2 mt-6">
                            <h1 className="text-lg text-black">Brand</h1>
                        </div>
                        <div className="w-full p-2 flex">
                            <div className="w-[65px] h-10 bg-slate-200 rounded-lg border-2 border-gray-300 ">Tata</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300 ">Maruti</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300">Toyota</div>
                        </div>
                        <div className="w-full p-2 flex">
                            <div className="w-[65px] h-10 bg-slate-200 rounded-lg border-2 border-gray-300 ">Nissan</div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300 "></div>
                            <div className="w-[65px] h-10 ml-1 bg-slate-200 rounded-lg border-2 border-gray-300"></div>
                        </div>

                        <div className="w-full p-2 flex">
                            <div className="w-[65px] h-10 bg-slate-200 rounded-lg border-2 border-gray-300 "></div>
                        </div>
                    </div>
                </div>
                <div className="w-9/12 h-44 shadow-xl  ml-12 mt-5">
                    <div className="w-3/12 h-full  bg-yellow-500 ">
                        <div className=" flex-row justify-center h-full  ">
                            <h1 className="text-xl font-semibold text-center pt-16">Total Duration</h1>
                            <h1 className="text-lg  text-center">1 Day, 4 Hours</h1>
                        </div>
                    </div>
                    <div className="w-2/12  h-full ">
                        <h1>Pickup City</h1>
                    </div>
                    <div className="w-2/12  h-full"></div>
                    <div className="w-3/12  h-full"></div>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;

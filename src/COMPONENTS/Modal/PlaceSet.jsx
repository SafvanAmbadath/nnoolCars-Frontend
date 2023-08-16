import React from "react";
import { GrMapLocation } from "react-icons/gr";

function PlaceSet({ open, setOpen, sutable, location, setOpenDate, setCity }) {
  if (!open) return null;

  const locationPick = (id) => {
    setCity(id.neighbourhood);
    localStorage.setItem("sutableLocation", id.neighbourhood);
    setOpen(false);
    setOpenDate(true);
  };

  return (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 "
        onClick={() => {
          setOpen(false);
        }}
      />
      <div className="fixed  lg:left-64 lg:right-64 md:left-20 md:right-20 left-10 right-10   sm:top-72 bottom-5 top-64  bg-white  rounded-2xl border-stone-600 shadow-3xl ">
        <div className=" ">
          <div className="w-9/12  flex h-12 border-slate-400 border-2 m-2 ">
            <div className="rounded-full h-6 w-6 bg-green-200 m-3 mt-3 ">
              <div className="rounded-full h-3 w-3 bg-green-600  relative top-1.5 left-1.5"></div>
            </div>
            <div>
              <h1 className="mt-3">{location}</h1>
            </div>
            <div>
              <input
                type="text"
                className="w-6/6 mt-2 ml-2 h-8 bg-slate-100 outline-none focus:outline-white"
                placeholder="Select your starting point"
              />
            </div>
          </div>
          <div>
            <h1 className="m-2 font-bold">SUGGESTED LOCATIONS</h1>
            {sutable.map((data, index) => (
              <div
                className="flex p-2 bg-slate-100"
                onClick={() => locationPick(data)}
              >
                <GrMapLocation className="ml-3 mt-2 text-3xl text-black" />

                <div className="ml-3">
                  <h1 className="font-semibold text-lg">
                    {data.city},<span className="ml-3">{data.state}</span>
                  </h1>
                  <p>{data.neighbourhood}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceSet;

import React from "react";
import { AiOutlineUser } from "react-icons/ai";

function Chatlist({ Open, setOpenlist, chatlist, setChatData, children }) {
  const closeWindow = () => {
    setOpenlist(!Open);
  };

  if (!Open) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0  bg-black  opacity-80"
        id="container"
        onClick={closeWindow}
      />
      <div className="fixed z-50   bg-white  top-0 left-0 w-72 bottom-0 border-2 border-stone-600 shadow-2xl ">
        {chatlist.map((data, index) => (
          <div
            className="flex bg-gray-100 hover:bg-slate-400 w-full h-16 "
            onClick={(e) => {
              e.preventDefault();
              setChatData(data);
              closeWindow();
            }}
          >
            <div className="p-2 w-12 h-12 rounded-full bg-slate-50 m-2 ">
              <AiOutlineUser className="text-3xl" />
            </div>
            <h1 className="text-xl text-black font-bold p-4">
              {data.memdersData[0]?.name}
            </h1>
          </div>
        ))}
      </div>
      {children}
    </>
  );
}

export default Chatlist;

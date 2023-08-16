import React from "react";

function SuccessModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed top-0 bottom-0 bg-white rounded  right-0 left-0 opacity-80"
        onClick={() => setOpen(false)}
      />
      <div className="fixed  bg-white   bg-particle   top-20 left-40  right-40 bottom-20  border-2 rounded-2xl  shadow-2xl justify-center">
        <div className="h-full w-full text-center font-bold justify-center">
          <h1 className="text-4.563rem text-green-600 ">CONGRATULATIONS</h1>
        </div>
      </div>
    </>
  );
}

export default SuccessModal;

import React from "react";

function PaySummary({ open, setOpen, children, Package, amount }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed top-0 bottom-0 bg-black rounded z-5 0 right-0 left-0 opacity-80"
        onClick={() => setOpen(false)}
      />

      <div className="fixed z-50 p-3  bg-white lg:right-1/3 top-44 left- right-20 bottom-44 rounded-2xl lg:left-1/3 border-2 border-stone-600 shadow-2xl">
        <h1 className="text-2xl text-black m-3">₹{amount}</h1>

        <div className="flex justify-between m-2 text-lg mt-4">
          <h1>{`Trip Fare (Unlimited KMs without Fuel)`}</h1>
          <h1>₹{amount - Package}</h1>
        </div>
        <hr className="mt-3" />
        <div className="flex justify-between m-2 text-lg mt-4">
          <h1>Damage Protection Fee</h1>
          <h1>₹{Package}</h1>
        </div>
        <hr className="mt-3" />
        <div className="flex justify-between m-2 text-lg mt-4">
          <h1>Convenience Fee</h1>
          <h1>₹99</h1>
        </div>
        <hr className="mt-3" />
        <div className="flex justify-between m-2 text-lg mt-4 font-bold">
          <h1>Total fare</h1>
          <h1>₹{amount}</h1>
        </div>
        <hr className="mt-3" />
        <div className="flex justify-between m-2 text-lg mt-4">
          <h1>Refundable deposit</h1>
          <h1>₹0</h1>
        </div>
        <hr className="mt-3" />
        <div className="flex justify-between m-2 text-lg mt-4 font-bold">
          <h1>Final fare</h1>
          <h1>₹{amount}</h1>
        </div>
        <hr className="mt-3" />
        <div className="text-center mt-2 ">
          <button className="items-center rounded-lg bg-green-600 text-center w-64 h-12 text-white">
            PROCEED TO PAY ₹{amount}
          </button>
        </div>
      </div>
    </>
  );
}

export default PaySummary;

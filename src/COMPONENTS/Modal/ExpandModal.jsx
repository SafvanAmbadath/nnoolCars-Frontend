import React from 'react'
import moment from 'moment'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ExpandModal({open , setOpen , amount , startDate, orderData,token , userId,createdAt}) {

    const [slider, setSlider] = useState(24);
    const navigate =useNavigate()

  if(!open) return null 
 
  const handleChange = (event) => { 
    setSlider(event.target.value);
  };

  const expandHandle = ()=>{
    
    navigate(`/expandCheckout/${orderData}`,{state:{slider,amount:amount*slider*30/100}})


  }

  return (
    <>
     <div className='fixed top-0 bottom-0 bg-black rounded z-5 0 right-0 left-0 opacity-30' onClick={()=>setOpen(false)} />

<div className="fixed z-50 p-3  bg-white lg:right-1/3 top-40 left-20 right-20 bottom-40 rounded-2xl lg:left-1/3   shadow-2xl">
<h1 className='text-2xl text-black m-3'>₹{amount}</h1>

<div className='flex justify-between m-2 text-lg mt-4'>
    <h1> 30% extra per 1 hours</h1>
    <h1>₹{amount*30/100}</h1>
</div>
<hr className='mt-3' />
<div className='flex justify-between m-2 text-lg mt-4'>
    <div className='w-11/12'>

<span className="relative text-lg top-1"> How many hours </span>
              <div className="relative flex items-center justify-center  mt-12 slidervalue bg-green-600 ">
                <span className="absolute w-16 h-6 text-center text-white rounded-xl bg-green-600 ">
                  {slider}
                </span>
                <div className="relative w-5"></div>
              </div>
<div className="relative flex items-center w-full justify-center mt-3 field bg-green-600 text-white">
                <div className="valueleft ">0</div>
                <input
                  type="range"
                  min={0}
                  max={24}
                  className="relative flex items-center justify-center w-4/5 pl-4 text-gray-700 lg:w-383 field "
                  value={slider}
                  onChange={handleChange}
                  step="1"
                />

                <div className="valueRight ">24</div>
              </div>
    </div>
</div>
<hr className='mt-3' />

<hr className='mt-3' />
<div className='flex justify-between m-2 text-lg mt-4'>
<h1>Amount</h1>
    <h1>{amount*slider*30/100}</h1>

</div>
<div className='text-center mt-6'>

<button className='items-center rounded-lg bg-red-600 text-center w-64 h-12 text-white' onClick={expandHandle}>Expand</button>
</div>
     
</div>
    </>
  )
}

export default ExpandModal

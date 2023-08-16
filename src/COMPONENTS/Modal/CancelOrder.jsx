import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { updateCancelOrder } from '../../API/SERVICES/orderList'

function CancelOrder({open , setOpen , amount , startDate, orderData,token , userId,createdAt}) {
    useEffect(()=>{

    },[])
    const [message,setMessage]= useState('')

    

    if(!open) return null 

    const handleCancel = async()=>{
      const res  = await updateCancelOrder(createdAt,orderData,amount)
      if(res.status === 201){
          setMessage(res.data.message)
          setOpen(false)

      }

    }


  return (
    <>
     <div className='fixed top-0 bottom-0 bg-black rounded z-5 0 right-0 left-0 opacity-30' onClick={()=>setOpen(false)} />

<div className="fixed z-50 p-3  bg-white lg:right-1/3 top-44 left-20 right-20 bottom-44 rounded-2xl lg:left-1/3   shadow-2xl">
<h1 className='text-2xl text-black m-3'>₹{amount}</h1>

<div className='flex justify-between m-2 text-lg mt-4'>
    <h1>30 minute before full amount return</h1>
    <h1>₹{amount}</h1>
</div>
<hr className='mt-3' />
<div className='flex justify-between m-2 text-lg mt-4'>
    <h1>1 houre  before half amount return</h1>
    <h1>₹{amount /2}</h1>
</div>
<hr className='mt-3' />
<div className='flex justify-between m-2 text-lg mt-4'>
    <h1>After 1 houre</h1>
    <h1>₹0</h1>
</div>
<hr className='mt-3' />
<div className='flex justify-between m-2 text-lg mt-4'>
<h1>Booking Date</h1>
    <h1>{moment(createdAt).format('DD,MMM YYYY , hh : mm A')}</h1>

</div>
<div className='text-center mt-8'>

<button className='items-center rounded-lg bg-red-600 text-center w-64 h-12 text-white' onClick={handleCancel}>Cancel</button>
</div>
     
</div>
    </>
   
  )
}

export default CancelOrder

import Navbar from '../COMPONENTS/Navbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOrderForlist } from '../API/SERVICES/orderList'
import {AiOutlineUser} from 'react-icons/ai'
import car from "../COMPONENTS/images/images (3).jpeg"
import moment from 'moment'
import CancelOrder from '../COMPONENTS/Modal/CancelOrder'
import ExpandModal from '../COMPONENTS/Modal/ExpandModal'
import { useNavigate } from 'react-router-dom'
// import { createChat } from 'Api/chat'
import {FcCancel} from 'react-icons/fc'
import {BiExpandAlt} from 'react-icons/bi'
import Loader from '../COMPONENTS/Loader/loader'
import { createChat } from '../API/SERVICES/chat'




function OrdersListScreen() {
  const {token,id} = useSelector((state)=>state.userSlice)
  const [complite, setComplite] = useState(false)
  const [live, setLive] = useState(true)
  const [loader,setloader] = useState(false)

  const [cancel, setCancel] = useState(false)
  const [pending,setPending] =useState([])
  const [compliteOrders,setCompliteOrders] = useState([])
  const [cancelOrder,setCancelOrder] = useState([])
  const [openModal,setOpenModal] = useState(false)
  const [openExpandModal,setOpenExpandModal] = useState(false)
  const date = new Date()

  const [cancelIndex,setCancelIndex] = useState(null)
  const navigate = useNavigate()
  


  const getChat =async (userId)=>{
    console.log("ownerId"+userId)
    const res = await createChat(id,userId)
    if(res.status === 200){

      navigate(`/chat/${userId}` )
    }
  }



  useEffect(()=>{
    setloader(true)
    console.log(id);
     getOrderForlist(id).then((res)=>{
    setloader(false)

console.log("bookings");
        console.log(res);
        const orders= res?.data?.orders
        const liveOrder = orders.filter(order => order.orderStatus.includes('pending'))
        const compliteOrder = orders.filter(order => order.orderStatus.includes('complete'))
        const cancelOrder = orders.filter(order => order.orderStatus.includes('cancel'))
        setCancelOrder(cancelOrder)
        setCompliteOrders(compliteOrder)
        setPending(liveOrder)
     
     })
  },[openModal])
  useEffect(()=>{
     
  },[openModal])

  const handleComplete = async ()=>{
    // const res = await completeOrder()
  }

  return (
    <div className='w-full  h-screen bg-g '>
        <Navbar />
      <div className=' lg:mx-14 '>


   
        <div className='flex w-full '>
      
          <div className='rounded-2xl border-2 text-gray-700 border-yellow-300 w-full h-full bg-white m-5 '>
            <div className='w-full h-14 '>
              <h1 className='text-center font-semibold text-3xl'>MY BOOKING</h1>

            </div>
          <div className='w-full h-14 bg-black flex'>
            <div className={`w-1/3 h-full border-b-8 cursor-pointer ${live && 'border-yellow-600'}  `} onClick={()=>{setCancel(false); setComplite(false);setLive(true)}}>
              <h1 className='lg:text-xl text-lg  text-center text-yellow-500 md:m-4  mt-4 '>LIVE & UPCOMING </h1>
            </div>
            <div className={`w-1/3 h-full border-b-8 cursor-pointer ${complite && 'border-yellow-600'} `}>
            <h1 className='lg:text-xl text-lg text-center text-yellow-500 m-4' onClick={()=>{setLive(false);setCancel(false); setComplite(true)}}>COMPLETED </h1>

            </div>
            <div className={`w-1/3 h-full border-b-8 cursor-pointer ${cancel && 'border-yellow-600'} `}  onClick={()=>{setLive(false);setComplite(false);setCancel(true); }}>
              <h1 className='lg:text-xl text-lg text-center text-yellow-500 m-4'>CANCELLED </h1>

            </div>

          </div>
          { cancel &&
cancelOrder.map((data,index)=>(
<div className='flex w-full h-40 border-2'>
                <div className='w-1/4  h-full border-r-2 border-yellow-200'>
                <img src={data.carData.imageCar[0].filesUploaded[0].url} alt="" className='w-48 h-36 items-center text-center' />
 
              </div>
              <div className='w-1/4 h-full border-r-2 border-yellow-200 p-5'>
                <h1 className='text-2xl'>{data.carData.brand.toLowerCase()}</h1>
  
              </div>
             <div className='h-4/5 w-2/4'>
               <div className='w-full h-10 '>
                   <h1 className='items-center  text-center pt-3 text-xl'>SHEDULED PICKUP & DROPOFF</h1>
                   <div className='flex justify-between'>
                     <div className='w-2/6 p-6'>
                       <h1 className='text-xl '>{moment(data.startDate).format('h : mm A ')}</h1>
                       <h1 className='m'>{moment(data.startDate).format('DD MMM, YYYY')}</h1>
 
                     </div>
                     <div className='w-2/6 flex text-center '>
                       <h1 className='text-xl m-5'>_</h1>
                         <div className='w-8 h-8 rounded-full bg-slate-800 mt-7 text-white '>
                           <h1 className='mt-1'>TO</h1>
 
                         </div>
                       <h1 className='text-xl m-5 '>_</h1>            
                     </div>
                     <div className='w-2/6 p-6 '>
                     <h1 className='text-xl text-end '>{moment(data.endDate).format('h : mm A')}</h1>
                       <h1 className='m text-end'>{moment(data.startDate).format('DD MMM, YYYY')}</h1>
                     </div>
 
                   </div>
               </div>
               <div>
 
               </div>
 
             </div>
           
 
             </div>
))
             

          }
          
{ complite &&
compliteOrders.map((data,index)=>(
<div className='flex w-full h-40 border-2'>
                <div className='w-1/4  h-full border-r-2 border-yellow-200'>
                <img src={data.carData.imageCar[0].filesUploaded[0].url} alt="" className='w-48 h-36 items-center text-center' />
 
              </div>
              <div className='w-1/4 h-full border-r-2 border-yellow-200 p-5'>
                <h1 className='text-2xl'>{data.carData.brand.toLowerCase()}</h1>
  
              </div>
             <div className='h-4/5 w-2/4'>
               <div className='w-full h-10 '>
                   <h1 className='items-center  text-center pt-3 text-xl'>SHEDULED PICKUP & DROPOFF</h1>
                   <div className='flex justify-between'>
                     <div className='w-2/6 p-6'>
                       <h1 className='text-xl '>{moment(data.startDate).format('h : mm A ')}</h1>
                       <h1 className='m'>{moment(data.startDate).format('DD MMM, YYYY')}</h1>
 
                     </div>
                     <div className='w-2/6 flex text-center '>
                       <h1 className='text-xl m-5'>_</h1>
                         <div className='w-8 h-8 rounded-full bg-slate-800 mt-7 text-white '>
                           <h1 className='mt-1'>TO</h1>
 
                         </div>
                       <h1 className='text-xl m-5 '>_</h1>            
                     </div>
                     <div className='w-2/6 p-6 '>
                     <h1 className='text-xl text-end '>{moment(data.endDtae).format('h:mm A')}</h1>
                       <h1 className='m text-end'>{moment(data.startDate).format('DD MMM, YYYY')}</h1>
                     </div>
 
                   </div>
               </div>
               <div>
 
               </div>
 
             </div>
           
 
             </div>
))
             

          }
          
           {live &&
           pending.map((data,index)=>(
            
            <div className='border-8 border-yellow-200 '>

            
            <div className='flex w-full h-40 justify-between '>
            <div className='h-4/5 md:w-2/4 w-3/5'>
              <div className='w-full h-10 mt-1 '>
                  <h1 className='items-center  text-center pt-1 text-xl'>SHEDULED PICKUP & DROPOFF</h1>
                  <div className='flex justify-between'>
                    <div className='w-5/12 lg:p-6 md:pt-6 pl-1 pt-2'>
                      <h1 className='md:text-xl text-lg '>{moment(data.startDate).format('h:mm A') }</h1>
                      <h1 className='m'>{moment(data.startDate).format('DD MMM, YYYY') }</h1>

                    </div>
                    <div className='w-1/12 flex text-center justify-center '>
                   
                        <div className='w-8 h-8 rounded-full bg-slate-800 mt-7 text-white '>
                          <h1 className='mt-1'>TO</h1>

                        </div>
                   
                    </div>
                    <div className='w-5/2 lg:p-6 md:pt-6 pr-1 pt-2 items-end '>
                    <h1 className='md:text-xl text-lg text-end '>{moment(data.endDate).format('h:mm A') }</h1>
                      <h1 className='m text-end'>{moment(data.endDate).format('DD MMM , YYYY') }</h1>
                    </div>

                  </div>
              </div>
              <div>

              </div>
              
            </div>
            <div className='flex flex-col justify-end  '>
              <div className='flex text-red-500  text-lg h-10 mt-1 rounded-sm md:p-2 text-end cursor-pointer hover:text-red-800 text-md'>
             <FcCancel className='md:mt-1 mt-2  text-2xl'/>
            <button className='ml-1' onClick={() => {setCancelIndex(index); setOpenExpandModal(true);}}>Expand order</button>
             <ExpandModal  open={openExpandModal} setOpen={setOpenExpandModal} startDate={pending[cancelIndex]?.startDate} createdAt={pending[cancelIndex]?.createdAt} amount={pending[cancelIndex]?.amount} orderData={pending[cancelIndex]?._id} userId={id} token={token} />
              </div>
              <div className='flex justify-between text-red-500  h-10  rounded-sm md:p-2 text-end cursor-pointer hover:text-red-800 text-md'>
             <BiExpandAlt className='md:mt-1 mt-2  text-2xl '/>

             <button className='ml-1' onClick={() => {setCancelIndex(index); setOpenModal(true);}}>Cancel order</button>
              <CancelOrder  open={openModal} setOpen={setOpenModal} startDate={pending[cancelIndex]?.startDate} createdAt={pending[cancelIndex]?.createdAt} amount={pending[cancelIndex]?.amount} orderData={pending[cancelIndex]?._id} userId={id} token={token} />

              </div>

            </div>
            
            {/* <div className='w-1/4  h-full border-l-2 border-gray-200 flex justify-center'>
           

            </div>
            <div className='w-1/4 h-full border-l-2 border-gray-200 flex justify-end '>

            </div> */}

            </div>
            <div className='w-full h-full border-2 '>
                 <div className='flex justify-between m-3'>
                    <h1 className='text-xl font-semibold'  >YOUR CAR OWNER DETAILS</h1>
                    <div className=' '>
                    
                    </div>

                 </div>
                 <div className='w-full h-full flex'>
                  <div className='w-7/12'>
                    <div className=' m-4 font- '>
                      <h1 className='font-bold' >Car Number :<span className='font-semibold'> {data.carData.carNumber.toUpperCase()}</span></h1>
                      <h1 className='font-bold' >Number : <span className='font-semibold'>{data.carData.sNumber}</span></h1>
                      <h1 className='font-bold' >City :<span className='font-semibold'>{data.carData.city.toLowerCase()}</span> </h1>
                      <h1 className='font-bold' >Location :<span className='font-semibold'>{data.carData.neighbourhood.toLowerCase()} </span></h1>

                    </div>
                    <div className=' justify-between m-4'>

                        <h1 className='font-bold'>From : <span className='font-semibold'>{data.carData.city.toLowerCase()}</span></h1>
                        <h1 className='font-bold'>Car : <span className='font-semibold'>{data.carData.brand.toLowerCase()}</span></h1>
                        
                    </div>
                    <div className='justify-between m-5 flex'>
                      <div className='p-2 text-2xl flex'>
                        <h1 className='text-xl font-semibold'>Payment Amount : </h1>
                        <h1 className='text-xl font-semibold'>{data.amount}</h1>
                      </div>


                    </div>
                  </div>
                  
                  <div className='w-5/12 h-48 border-2 '>
                    <div className='flex m-5 bg-yellow-200'>
                      {/* <img src={car} alt="" className='w-12 h-12 bg-cover m-1' /> */}
                      <h1 className='text-lg font-bold m-3 text-black'>{data.carData.carNumber.toUpperCase()} OWNER</h1>
                    </div>
                    <div className='m-5'>

                    <button className='w-full h-14 bg-yellow-600 rounded-md text-white font-bold ' onClick={()=>getChat(data.carData.owner)} >Chat with owner</button>
                    </div>

                  </div>

                 </div>
                 {/* <div className='w-full flex justify-end mb-4'>
                  {new Date(data.endDate) < date  ?  <button className='text-white hover:bg-green-900 font-bold  bg-green-600 p-3 w-32 rounded-xl mr-6 ' onClick={handleComplete} >Complite</button> : <button className='text-white font-bold  bg-green-200 p-3 w-32 rounded-xl mr-6  '>Complite</button> }

                 </div> */}
                 
            </div>
            </div>)
           )
          }

          </div>

        </div>
      </div>

      {loader ?   <Loader loader={loader} /> : null}
         
      
    </div>
  )
}

export default OrdersListScreen

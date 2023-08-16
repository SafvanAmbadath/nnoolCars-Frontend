import React, { useEffect, useState } from 'react'
import Navbar from '../COMPONENTS/Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import { checkprofile } from '../API/SERVICES/profile'
import { useSelector } from 'react-redux'
import Loader from '../COMPONENTS/Loader/loader'



function OrderVerify() {

  const [profile,setProfile] = useState(false)
  const [loader,setloader] = useState(false)

  const {id} =useSelector((state)=>state.userSlice)

  useEffect(()=>{
    setloader(true)
   
    checkprofile(id).then((res)=>{
      setloader(false)
    
      if(res.status === 201){
        setProfile(true)
         
      }
    })
  },[])

  const  getorderlist =()=>{
    console.log("orderlist");
    if(profile){

      navigate('/listorderforuser')
    }
    }
  

  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-slate-100'>
      <Navbar />
      <div className='lg:flex    m-5'>
        
          <div className='lg:w-1/2 w-full h-56 justify-end '>
            <div className='p-3 w-full h-52 bg-login  bg-cover bg-center rounded-x'>
              <div className=' border-2 border-red-700 rounded-lg bg-slate-100 h-24 mt-24  ' >
                <h1 className={`${ profile ? 'text-green-600' : 'text-red-600' }  text-lg pl-2 pt-2 font-bold`} onClick={()=>navigate('/uploadproof')}>{`${profile ? 'Update your proof' :'Proof verify pending'} `}</h1>
                <div className='flex justify-between '>
                   <p className='pl-2 font-semibold '>{` ${profile ? 'Proof already exists! ' : 'Your booking will be pending if your profile verification is pending '}`} </p>
                   <button className={`m-2 p-1 text-lg w-56  rounded-xl text-white ${profile ? 'bg-green-600' : 'bg-green-200' } `} onClick={getorderlist} >Your car details </button>
                </div>

              </div>

            </div>
         
          </div>
          <div className='lg:w-1/2 w-full h-44'>
            <div className='w-full pl-2 pr-2 h-56'>
              <div className='w-full h-20 bg-slate-400 shadow-xl'>
                  <h1 className='font-semibold text-xl p-5'>Pick up process</h1>
              </div>
              <div className='w-full h-20 bg-white border-2 mt-2 shadow-xl flex p-3'>
                <div className='w-6 h-6  rounded-full border-2 border-black '>
                   <p className='ml-2 -mt-0.5 font-semibold'>1</p>
                </div>
                <div className='ml-2'>
                  <h1 className='pl-2 text-black font-bold'>Payment completed</h1>
                  <p className='ml-2 '>successfuly paid </p>
                </div>
                

              </div>
              <div className='w-full h-20 bg-white border-2 mt-2 shadow-xl flex p-3'>
              <div className='w-6 h-6  rounded-full border-2 border-gray-400 '>
                   <p className='ml-1.5 -mt-0.5 font-semibold text-gray-400'>2</p>
                </div>
                <div className='ml-2'>
                  <h1 className='pl-2 text-gray-400 font-bold -mt-1'>Your deliver agent</h1>
                  <p className='ml-2 text-gray-400'>we will share the pickup address after  </p>
                </div>
              </div>
              <div className='w-full h-20 bg-white border-2 mt-2 shadow-xl flex p-3'>
              <div className='w-6 h-6  rounded-full border-2 border-gray-400 '>
                   <p className='ml-1.5 -mt-0.5 font-semibold text-gray-400'>3</p>
                </div>
                <div className='ml-2'>
                  <h1 className='pl-2 text-gray-400 font-bold -mt-1 '>Inspect and go</h1>
                  <p className='ml-2 text-gray-400'>look for dents and scratches, unlock  the car and start your trip   </p>
                </div>
</div>

            </div>


          </div>

        
        <div>
          <div>

          </div>
          <div>

          </div>

        </div>
      </div>
      {loader ?   <Loader loader={loader} /> : null}
      
    </div>
  )
}

export default OrderVerify

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {FaRegClock} from 'react-icons/fa'
// import HostNavbar from 'components/HostNavbar';
import RentNavbar from "../COMPONENTS/RentNavbar"

import { checkAcc } from '../API/SERVICES/paymentForOrder';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import Loader from '../COMPONENTS/Loader/loader';


function HostVerifyScreen() {
    
  const [bankAcc,setAcc]  = useState(false)
    const Navigate = useNavigate();
    const [loader,setLoader]=useState(false)

    const {id} = useSelector((state)=>state.userSlice)
//     const token=localStorage.getItem('token')
// const id=localStorage.getItem('id')

    console.log(id);
    useEffect(()=>{
      setLoader(true)
       checkAcc(id).then((res)=>{
        console.log(res);
        setLoader(false)
          
          if(res.status === 201){
            setAcc(true)
          }
       })
    },[])

    const gotoCarlist =()=>{
      if(bankAcc){
        Navigate('/hostUserCarList')
      }else{
        message.error('fill bank account')
      } 
    }
  
  return (
    <>
    <RentNavbar />

    <div className="flex flex-col items-center justify-center h-full bg-gray-100">

    <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center space-y-6">
      <div className="text-5xl text-blue-500">
        <FaRegClock />
      </div>
      <h1 className="text-3xl font-bold text-center">
        We Are Verifying your Data
        Profile Under Verification
      </h1>
      <p className="text-lg text-center">
        Thank you for submitting your profile! We are currently reviewing it
        and will notify you once it has been verified.
      </p>
      <p className="text-lg text-center">
        In the meantime, please ensure that your profile information is up to
        date and accurate.
      </p>
      <h1 className="text-3xl font-bold text-center">
       
       Account & Profile Under Verification
      </h1>
      <div>
      <button
        onClick={()=>Navigate('/bankDetail')}
        className="bg-yellow-500 hover:bg-gray-500 text-dark font-bold py-2 px-4 rounded"
      >
        Check bank Account
      </button>
      <button
        onClick={gotoCarlist}
        className={`${bankAcc ? 'bg-yellow-500' : ' bg-gray-500'} hover:bg-gray-500 ml-2 text-dark font-bold py-2 px-4 rounded`}
      >
        Your Cars
      </button>
   
      </div>
     
    </div>
{loader ?   <Loader loader={loader} /> : null}

  </div>
  </>
  )
}

export default HostVerifyScreen

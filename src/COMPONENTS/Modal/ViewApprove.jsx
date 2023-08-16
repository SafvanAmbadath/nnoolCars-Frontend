import React from 'react'
// import { hostApprove,hostDenied } from 'Api/hostVerify';
import {getHostApprove,getHostDeny} from "../../API/SERVICES/hostVerify"

function ViewApprove({children, open ,imageRC, setOpen,carnumber,carData ,token}) {
  if(!open) return null
  


  console.log(carData);

  const approve = async()=>{
    console.log(carData._id);
     const res = await getHostApprove(carData._id)
     console.log(res);
     setOpen(false)
  }
  const denied = async()=>{
     const res = await getHostDeny(carData._id)
     console.log(res);
  }
  return (
    <>
    <div className='fixed top-0 left-0 right-0 bottom-0 opacity-20 bg-black ' onClick={()=>setOpen(false)} />
    <div className='fixed top-10 left-40 right-20 bottom-10 bg-white '>
     
                <h1 className='text-3xl mb-2 text-center mt-5'>{carData.carNumber.toUpperCase()}</h1>
       <div className='flex '>
       <div className="w-1/2 ml-5 mt-3 h-32 bg-blue-50 ">
            <div className="flex-col w-full px-1 py-1 bg-blue-100 shadow-md h-36 ">
            <img src={ carData.imageRC[0].filesUploaded[0].url} 
                  alt="imageUploded" 
                  className="object-cover w-full h-32 " />
                
            <h1 className='text-xl'>Car RC </h1>
            </div>
          </div>
          <div className="w-1/2 m-8 mt-3 h-32 bg-blue-50">
                <p></p>
            <div className="flex-col w-full px-1 py-1 bg-blue-100 shadow-md h-36 ">
            <img src={ carData.imageIC[0].filesUploaded[0].url} 
                  alt="imageUploded" 
                  className="object-cover w-full h-32 " />
            <h1 className='text-xl'>ID proof</h1>
                
            </div>
          </div>
       </div>
            <div className='m-4'>
              <li>
                <span>Email :<span>{carData.email}</span></span>
              </li>
              <li>
                <span>Number :<span>{carData.sNumber}</span></span>
              </li>
              <li>
                <span>State :<span>{carData.state}</span></span>
              </li>
              <li>
                <span>City :<span>{carData.city}</span></span>
              </li>
              <li>
                <span>Brand :<span>{carData.brand}</span></span>
              </li>
              <li>
                <span>fuel :<span>{carData.fual}</span></span>
              </li>
              <li>
                <span>Brand :<span>{carData.year}</span></span>
              </li>
              <li>
                <span>carNumber :<span>{carData.carNumber.toUpperCase()}</span></span>
              </li>
            </div>
            <div className='text-center mt-10'>
             {carData?.status ===  'Denial' && (<button onClick={approve} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br 
              focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
               >Approve</button>)}
             
            {carData?.status ===  'Approved' && (<button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 
              focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-3'onClick={denied} >Deny</button>)}
            </div>
            
            <div className='text-center mt-10'>
            {carData?.status ===  'pending' && (<button onClick={approve} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br 
              focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
               >Approve</button>)}
             
            {carData?.status ===  'pending' && (<button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 
              focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-3'onClick={denied} >Deny</button>)}
            </div> 
            <div>

            </div>
       
    </div>
    

      
    </>
  )
}

export default ViewApprove

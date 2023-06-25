
import React from 'react'
import logo from '../COMPONENTS/images/logo.png'
import {BiLocationPlus} from 'react-icons/bi'
import { Link } from 'react-router-dom'


function LandingScreen() {
  return (
    <div>
        <div className='w-screen h-[1000px] bg-LandingImage'>
          <div>
            <div className='flex'>

               <div className='w-56 h-56  rounded-full bg-yellow-500 -ml-10 -mt-10 z-50'>
                <img src={logo} className='m-16 z-50 '></img>
              

               </div>
               <div className='w-56 h-56  rounded-full bg-yellow-500 -ml-20 -mt-32 '>

               </div>
               <div className='w-full'>
                <div className=' flex justify-center w-full'>
                   <h1 className=' text-2xl text-yellow-500 p-3'>
Helpdesk : +91 790 253 0000 / +91 799 613 1318</h1>
                </div>
                <div className='w-full flex justify-between'>
                  <div className='flex mt-3 justify-between'>
                      <h1 className='text-lg  ml-10 font-semibold text-white'>HOME</h1>
                      <h1 className='text-lg ml-10 font-semibold text-white'>About Us</h1>
                      

                      <h1 className='text-lg ml-10  font-semibold text-white'>Contact Us</h1>
                      <h1 className='text-lg ml-10 font-semibold text-white'>Blog</h1>


                  </div>
                  <div className='flex p-4'>
                    <Link className='bg-yellow-500 p-2 text-white rounded-md ml-4 -mt-2 ' to='/login' >Login</Link>
                    <Link className='bg-green-500 p-2 text-white rounded-md ml-4 -mt-2 'to="/login" >SignUp</Link>



                  </div>

                </div>
               </div>
            </div>
            
            <div className='w-screen justify-center'>
              <h1 className='text-center text-3xl mt-10 font-semibold text-white '>Welcome to nnoolCars,now joy of driving is nothing, but nnoolCars</h1>
              <h1 className='text-center mt-5 text-white'>Whether you're traveling for business or leisure, we have a wide selection of vehicles to fit your needs and budget for every use</h1>
              <h1 className='text-yellow-500 font-semibold text-center text-4xl mt-5'>#DRIVE_IT_LIKE_YOU_OWN_IT</h1>

            </div>
            <div className='px-28 '>
            <div className='bg-white rounded-lg h-44 w-full mt-40'>
              <div className='px-10 w-full text-center pt-7'>
                <div className='border-2 h-24 border-gray-500 rounded-lg text-center flex  '>
                  <div className='border-r-2 border-gray-500 w-2/6'>
                    <div className='flex justify-center'>
                      <h1 className='text-black text-xl font-semibold pt-2'>Pickup Point</h1>
                      <h1 className='text-red-500 text-2xl ml-2'>*</h1>
                    </div>
                    <div className='px-8'>
                        <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
                          <BiLocationPlus className='text-xl text-black' />
                          <h1 className='pl-2'>Pickup point</h1>

                        </div>
                    </div>

                  </div>
                  <div className='border-r-2 border-gray-500 w-2/6'>
                  <div className='flex justify-center'>
                      <h1 className='text-black text-xl font-semibold pt-2'>Pickup Point</h1>
                      <h1 className='text-red-500 text-2xl ml-2'>*</h1>
                    </div>
                    <div className='px-8'>
                        <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
                          <BiLocationPlus className='text-xl text-black' />
                          <h1 className='pl-2'>Pickup point</h1>

                        </div>
                    </div>
                  </div>
                  <div className='border-r-2 rounded-lg flex  w-4/6'>
                  <div className=' border-gray-500 w-3/6'>
                  <div className='flex justify-center'>
                      <h1 className='text-black text-xl font-semibold pt-2'>Pickup Point</h1>
                      <h1 className='text-red-500 text-2xl ml-2'>*</h1>
                    </div>
                    <div className='px-8'>
                        <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
                          <BiLocationPlus className='text-xl text-black' />
                          <h1 className='pl-2'>Pickup point</h1>

                        </div>
                    </div>
                  </div>
                  <div className=' border-gray-500 w-3/6'>
                  <div className='flex justify-center'>
                      <h1 className='text-black text-xl font-semibold pt-2'>Pickup Point</h1>
                      <h1 className='text-red-500 text-2xl ml-2'>*</h1>
                    </div>
                    <div className='px-8'>
                        <div className='w-full shadow-md rounded-lg mt-2 h-10 shadow-current flex p-2 '>
                          <BiLocationPlus className='text-xl text-black' />
                          <h1 className='pl-2'>Pickup point</h1>

                        </div>
                    </div>
                  </div>

                  </div>

                </div>
                <div className='p-3 w-full text-center items-center  '>

                <button className='bg-yellow-500 p-2 rounded-full mt-5 w-24 text-black  font-semibold -'>search</button>
                </div>

              </div>

             </div>
            </div>
          </div>
            
        </div>

    </div>
  )
}

export default LandingScreen
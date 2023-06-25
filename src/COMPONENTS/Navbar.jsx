import React, { useState } from 'react'
import logo from '../COMPONENTS/images/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate()
  return (
    <div className='w-screen bg-white h-24 flex'>
      <img src={logo} alt="" className='w-60 h-20 ml-4' />
      <div className='flex justify-between w-full'>

      <div className='w-full flex justify-between'>
                  <div className='flex mt-6 justify-between ' >
                      <h1 className='text-lg  ml-10 font-semibold text-black '>HOME</h1>
                      <h1 className='text-lg ml-10 font-semibold text-black '>About Us</h1>
                      

                      <h1 className='text-lg ml-10  font-semibold text-black '>Contact Us</h1>
                      <h1 className='text-lg ml-10 font-semibold text-black '>Blog</h1>


                  </div>
     </div>
     <button className='rounded-full shadow-xl w-60 border-2 mt-4 h-11 font-bold' onClick={()=>navigate('/rentLanding')}>Rent your car</button>
     <div className='flex p-4 mt-2'>
                    <Link className='bg-yellow-500 p-2 text-white rounded-md ml-4 -mt-2 h-11  w-20 text-center ' to='/login' >Login</Link>
                    <button className='bg-green-500 p-2 text-white rounded-md ml-4 -mt-2 h-11 w-20 text-center ' >SignUp</button>



                  </div>
      </div>


        

    </div>
  )
}

export default Navbar
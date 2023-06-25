import React, { useState } from 'react'
import AdminNavbar from "../COMPONENTS/AdminNavbar"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { loginAdmin } from 'Api/adminLogin'
// import { useDispatch } from 'react-redux'
// import { setLoginAdmin } from 'redux-toolkit/slice/adminReducer'



function Login() {
    const [data, setData] = useState('')
    // const dispatch = useDispatch()
    const navigate =useNavigate()
    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }


    const submitLogin = async (e) => {
        // e.preventDefault()
        // const res = await loginAdmin(data)

        // const result = res.data
        // if(result.admin){
        //     dispatch(setLoginAdmin({
        //         token:result.token,
        //         name:result.name,
        //         email:result.email
        //     }))
        //     navigate('/adminhome')
        // }else{

        // }
        try{
            console.log("adminlogin submitted");
        e.preventDefault()
        const url="http://localhost:4000/api/admin/adminlogin"

        const res = await axios.post(url,data)
        const adminToken = res.data.adminToken;
        
          localStorage.setItem("adminToken", JSON.stringify(adminToken));
          window.location="/adminhome"
        }catch(error){}
        
    }
   return (
    <div className='w-screen h-screen '>
      <AdminNavbar />
      <div className='flex justify-center'>

      <div className=' lg:w-4/12 sm:w-2/5 w-4/5 h-28  flex flex-col  p-3 m-14'>
        <div className='w-full'>
            <h1 className='text-4xl font-semibold '>Login</h1>
            <p className='text-xl  '>Welcome Back! Please login to your account</p>
        </div>
        <div className='w-full mt-8 justify-center'>
            <form onSubmit={submitLogin} className='lg:w-383 sm:w-383 w-full  flex flex-col justify-center  ' >
                <label htmlFor="" className='text-xl'>Username</label>
                    <input type="text" name='email' onChange={handleChange} className='w-full border-2 border-gray-400 pl-2 h-11 mt-1 rounded-xl' />
                <label htmlFor="" className='text-xl mt-5'>Password</label>
                    <input type="text" name='password' onChange={handleChange} className='w-full border-2 pl-2 border-gray-400 h-11 mt-1 rounded-xl' />

                <button type='submit' className='w-full h-11 bg-orange-400 rounded-xl mt-10 text-center font-semibold text-xl text-white'>Login</button>
            </form>

        </div>
      </div>
      </div>
    </div>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State, City } from "country-state-city";
import {postLocation, getLocations,getDeleteLocation } from '../../API/SERVICES/Location';

// import { getLocations } from 'Api/LocationAdd'
// import { createLocation } from 'Api/LocationAdd';
// import { deleteLocation } from 'Api/LocationAdd';

import AdminSidebar from '../../COMPONENTS/AdminSidebar';
import AdminNavbar from '../../COMPONENTS/AdminNavbar';
import moment from 'moment';

function AddLocation() {
    const {token} = useSelector((state)=>state.adminSlice)
    const statesName = State.getStatesOfCountry('IN') 
    const [state,setState]=useState()
    const [city,setCity]=useState()
    const [oldCity,setOldCity] = useState([])
    const [oldState,setOldState]=useState([])
    const [availableCity,setAvailableCity]=useState([])
    const [addAndSee,setAddAndSee] = useState(false)
    const [message , setMessage]=useState('')
    const [deleteRe,setDeleteRe] = useState(false)
    
    
    useEffect(()=>{
        getLocations().then((res)=>{
            setOldCity(res.hostcityAndStateCode)
            setOldState(res.hostcityAndStateCode)
            setAvailableCity(res.oldLocation)
            
        })
    },[addAndSee,deleteRe])
    const Locationhandle =async (e)=>{
        
        const res= await getDeleteLocation(e.target.value)
       
        if(res.status === 201){
            setDeleteRe(true)
        }
        
    }
    const submitLocation =async (e)=>{
        e.preventDefault()
        
        const res = await postLocation(state,city)
       
        if(res.status === 200){
            setAddAndSee(false)
        }else{
            setMessage(res.message)
        }

    }

    const stateHandle =(e)=>{
        e.preventDefault();
        setState(e.target.value)
      }
      const cityHandle= (e)=>{
        e.preventDefault();
        setCity(e.target.value)
      } 
    let cityState = City.getCitiesOfState('IN',state)


  return (
<>

<AdminNavbar />

      <div className='flex'>
        <AdminSidebar />

 
       <div className='w-full'>

       
      <div className=" w- fixed flex ">
      <select name="" id="" onChange={stateHandle}  className="w-40   pl-4 mt-1    text-xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple">
                    <option value="">Available City </option>
                    
                   {  
                    oldCity.map((states,index )=>
                    (<option key={index} value={states._id.city} >{states._id.city}</option>)
                    )
                   }
                  </select>
                  <select name="" id="" onChange={cityHandle}  className="w-40  ml-3  pl-4 mt-1 text-xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple">
                    <option value="">Available State</option>
                    
                   {  
                    oldState.map((states,index )=>
                    (<option key={index} value={states._id.state} >{states._id.state}</option>)
                    )
                   }
                  </select>
      
      </div>
  
    <div className='flex flex-col '>
        <div className='flex  mt-20'>
            <button className={`border-b-4 ${addAndSee ? '' : 'border-yellow-600' }  pl-3 pr-3 text-lg font-bold`} onClick={()=>setAddAndSee(false)} >See Your Location </button>
            <button className={`border-b-4  ${addAndSee ? 'border-yellow-600' : ''} pl-3 pr-3 text-lg font-bold`} onClick={()=>setAddAndSee(true)} >Add Location</button>
        </div>
              

   {addAndSee ? (<div className='lg:w-1/2 sm    h-28 flex flex-col p-3 m-14'>
        <div className='w-full'>
            <h1 className='text-3xl font-semibold '>Create A New Location</h1>        
        </div>
        <div className='w-full mt-8 justify-center'>
            <form  className='lg:w-383 sm:w-383 w-full  flex flex-col justify-center  ' >
             
                    <div className="flex flex-col mt-3">
                  <label>State *</label>
                  <select name="" id="" onChange={stateHandle}  className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple">
                    <option value="">--Select your state--</option>
                    
                   {  
                    statesName.map((states,index )=>
                    (<option key={index} value={states.isoCode} >{states.name}</option>)
                    )
                   }
                  </select>
                  { state &&   <div className="flex flex-col mt-3">
                  <label>City *</label>
                  <select name="" id="" onChange={cityHandle} className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple">
                    <option value=""> --Select your City-- </option>
                 
                   {  
                  
                    cityState.map((citys,index )=>
                    
                    (<option key={index}  >{citys.name}</option>)
                    )
                   }
                  </select>
        
                </div>}
                   <div>
                    {message && <h1>{message}</h1>}
                   </div>
                </div>
                <button type='submit' className='w-full h-11  bg-orange-400 rounded-xl mt-10 text-center font-semibold text-xl text-white' onClick={submitLocation}>Upload</button>
            </form>

        </div>
      </div>) :
     (<div className='overflow-auto rounded-lg shadow '>
        <table className='w-full'>
            <thead className='bg-yellow-100 border-b-2 border-yellow-300'>
                <tr className=''>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>NO.</th>

                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>State</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>City</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Time</th>

                </tr>

            </thead>
            <tbody>
            { availableCity.map((data,index)=>
                (
                <tr >
                
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{index+1}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{data.state}</td>
           
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{data.city}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap' >{moment(data.createdAt).format('DD / MM / YYYY')}</td>
                    <td>
                    <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 
              focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-3' value={data._id} onClick={Locationhandle} >Delete</button>
                    </td>
                    <td>

                    </td>
    
                </tr>
                 )
            ) }
               
            </tbody>

        </table>
        </div>)}
    </div>
    </div>
    </div>

    </>
  )
}

export default AddLocation


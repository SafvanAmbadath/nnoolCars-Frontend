import React,{useEffect, useRef, useState} from 'react'
import Navbar from '../COMPONENTS/Navbar';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { PickerOverlay } from "filestack-react";
import {SiVerizon} from 'react-icons/si'
import SuccessModal from '../COMPONENTS/Modal/SuccessModal';

import { useSelector } from 'react-redux';
import { uploadprofile } from '../API/SERVICES/profile';



function UploadproofScreen() {

  const [options,selectOption]=useState()
  const [isPicker, setIsPicker] = useState(false);
  const [isPickerIc,setIsPickerIc] = useState(false)
  const [openModal,setOpenModal] =useState(false)
  const [ImageIc,setImageIc] = useState('')
  const [imageLc,setImageLc] = useState('')
  const  [hashPhoto,setHashPhoto]= useState(false)
  const [openVideo,setOpenVideo] = useState(false)
  const [message,setMessage]= useState('')
  const [snap,setSnap] = useState()
  const videoRef = useRef(null)
  const photoRef =useRef(null)
  const {token,id} = useSelector((state)=>state.userSlice)


  const getVideo =()=>{
    setOpenVideo(true)
    navigator.mediaDevices.
    getUserMedia({
        video:{width:1920, height:1080}
    }).then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
    })
    .catch((err)=>{
        
    })
  }

  const takePhoto=()=>{
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;
    
    photo.width = width;
    photo.height = height; 

    let ctz = photo.getContext('2d');
    ctz.drawImage(video,0,0,width,height)
    setHashPhoto(true)
  }

  const closePhoto =()=>{
    let photo = photoRef.current
    let ctz = photo.getContext('2d')
    
    ctz.clearRect(0,0,photo.width, photo.height)
    const dataUrl = photo.toDataURL()
    
    setSnap(dataUrl)

    setHashPhoto(false)
  }
   

  const handleProfileData = async ()=>{
    if(ImageIc && ImageIc){    

        
      const res = await uploadprofile(id,imageLc,ImageIc)
    
      if(res.status === 201){

        navigate('/listorderforuser')  
      }
        
    }else{
 
     
    }
  }



  
    
    const navigate = useNavigate()

    const fileStackActive = (e) => {
        e.preventDefault();
        if (isPicker) {
          setIsPicker(false);
        } else {
          setIsPicker(true);
        }
      };
    const fileStackActiveIc = (e)=>{
        e.preventDefault();
        if (isPickerIc) {
          setIsPickerIc(false);
        } else {
          setIsPickerIc(true);
        }
    }

  return (
    <>
    <Navbar />

  <div className="flex justify-center">

  <AiOutlineArrowLeft className="ml-1 mt-5 text-2xl" onClick={()=>{navigate('/verifyOrder')}} />
         <div className=' md:mx-20  my:5 md:my-10  bg-red width-full justify-start w-full md:w-2/4 p-4'>
         <div className='flex flex-col'>
                  <h1 className='font-semibold text-2xl'>Add your licence and ID proof</h1>

             

        <div className='flex flex-row '>
            <div className='flex justify-between w-full md:w-2/3 mt-7'>
            <h1 className='text-xl hover:text-green-600 cursor-pointer' onClick={fileStackActive}>Driver's license</h1>
            {isPicker && (
                    <PickerOverlay
                      apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                      onSuccess={(res) => {
                        console.log(res);
                        setImageLc(res);
                        console.log(imageLc);
                        setIsPicker(false);
                      }}
                      onError={(res) => alert(res)}
                      pickerOptions={{
                        maxFiles: 1,
                        // errorsTimeout : 2000,
                        // maxSize : 1 * 1000 * 1000
                      }}
                    />
                  )}
            <div className={`right-0 rounded-full border border-black-700 w-5 h-5 mt-[10px] `} onClick={()=>selectOption("DrivingLicense")}>
               {/* {options === "DrivingLicense" && <div className='rounded-full w-3 h-3 bg-black justify-center' ></div>} */}
            { imageLc  &&   <SiVerizon className='text-xl text-green-600' />}
            </div>
            </div>
           
            </div>     
            <hr className='text-gray-400 mt-5 md:w-2/3'></hr>

            <div className='flex flex-row '>
            <div className='flex justify-between w-full md:w-2/3 mt-7'>
            <h1 className='text-xl hover:text-green-600 cursor-pointer'onClick={fileStackActiveIc} >Any Identity card</h1>
            {isPickerIc && (
                    <PickerOverlay
                      apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                      onSuccess={(res) => {
                        console.log(res);
                        setImageIc(res);
                        console.log(ImageIc);
                        setIsPickerIc(false);
                      }}
                      onError={(res) => alert(res)}
                      pickerOptions={{
                        maxFiles: 1,
                        // errorsTimeout : 2000,
                        // maxSize : 1 * 1000 * 1000
                      }}
                    />
                  )}
            <div className={`right-0 rounded-full border-2 border-black-700 w-5 h-5 mt-[10px] ${options === "Passport" && "border-4 border-green-600"}`} onClick={()=>selectOption("Passport")}>
               {/* {options === "DrivingLicense" && <div className='rounded-full w-3 h-3 bg-black justify-center' ></div>} */}
               { ImageIc  &&   <SiVerizon className='text-xl text-green-600' />}
            </div>
            </div>
           
            </div>  
            <hr className='text-gray-400 mt-5 md:w-2/3'></hr>

            <div className='flex flex-row '>
            <div className='flex justify-between w-full md:w-2/3 mt-7'>
                <div>

            {/* <h1 className='text-xl ' onClick={getVideo}>Take Photo</h1> */}
        {/* {  openVideo &&  <>
                <video src="" ref={videoRef}></video>
                <button className='p-3' onClick={takePhoto}>Snap!</button>
                <div className={'result' + (hashPhoto ? 'hashPhoto' : '')}>
            <canvas ref={photoRef}></canvas>
            <button onClick={closePhoto}>close</button>

                </div>
                </>} */}
                </div>

            {/* <div className={`right-0 rounded-full border-2 border-black-700 w-5 h-5 mt-[10px] ${options === "Identitycard" && "border-4 border-green-600"}`} onClick={()=>selectOption("Identitycard")}>
               {options === "DrivingLicense" && <div className='rounded-full w-3 h-3 bg-black justify-center' ></div>}

            </div> */}
            </div>
           
            </div> 
            {/* <hr className='text-gray-400 mt-5 md:w-2/3'></hr>  */}

            <div className='bg-gray-200 w-full md:w-2/3 mt-5 rounded-md'>
            <h1 className='mx-4 my-3 text-sm'>
            󰀘
    Your ID will be handled according to our <span className='font-semibold  underline'>Privacy Policy</span> and won’t be shared with your Host or guests.
            </h1>

         
         </div>
         <hr className='w-full mt-4'></hr>
        <div className='flex right-0 justify-end mx-2 '>
               <button className='bg-green-600 rounded-md justify-end mt-3'><h1 className='text-white mx-3 my-2.5' onClick={handleProfileData} >Continue</h1></button>
               <SuccessModal open={openModal} seetOpen={setOpenModal} />
            </div>
         </div>
         </div>
         </div>
        

  
    </>
  )
}

export default UploadproofScreen

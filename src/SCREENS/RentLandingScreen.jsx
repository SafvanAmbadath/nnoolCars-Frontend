import { React, useState } from "react";
import bones from "../COMPONENTS/images/bonus (1).svg";
import { BiLeftArrowAlt } from "react-icons/bi";
import RentNavbar from "../COMPONENTS/RentNavbar";
import { useNavigate } from "react-router-dom";
import image from "../COMPONENTS/images/c305b40c67077b3849c25a445c6191d8.png"
import { motion } from "framer-motion";

function RentLandingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [sliders, setSlider] = useState(15);
    const [amount, setAmount] = useState(500);
    const navigate = useNavigate();
    const slider = [
        { url: "bg-Landingimage", title: "Share your car and earn upto 5000 Rs" },
        { url: "bg-LandingImage", title: "Share your car and earn upto 5000 Rs" },
        { url: "bg-homepage", title: "Share your car and save the environment" },
        { url: "bg-loginImg", title: "Share your car and save the environment" },
        {
            url: "bg-Landingimage",
            title: "Share your car and save the environment",
        },
        {
            url: "bg-Landingimage",
            title: "Share your car and save the environment",
        },
    ];
    const goToPrevious = () => {
        const isfirstIndex = currentIndex === 0;
        const newIndex = isfirstIndex ? slider.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const handleChange = (event) => {
        setSlider(event.target.value);
    };
    const goToNext = () => {
        const isfirstSlice = currentIndex === slider.length - 1;
        const nextIndex = isfirstSlice ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    return (
      <motion.div
      className="  w-full h-screen flex-col"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      // onclick={onclick}
    >
            <div className="h-5/6">
                <RentNavbar />
              
                {/* <div className="w-full  h-16 absolute sticky  bottom-2 left-0 bg-green-600 visible lg:invisible rounded-2xl  " onClick={()=>{navigate('/host/form')}}>
        <h1 className="text-white text-2xl text-center m-3">START EARNING</h1>
      </div> */}
            </div>

            <div className=" m-0   ">
                <div className="lg:h-4/5  w-full flex flex-row justify-around text-center absolute lg:top-12 top-0">
                    <div className="lg:invisible lg:relative absolute">
    <div className="w-350 h-2/3 bg-white border-stone-600 shadow-3xl invisible lg:visible mt-6 rounded-2xl">
        <div className="lg:w-full lg:mt-16 sm:w-full h-full w-full p-3 sm:mt-72 mt-6 bg-white border-stone-600 shadow-3xl rounded-2xl lg:">
            <h1 className="text-xl font-semibold text-left">
                How much could you earn by sharing your car?
            </h1>
            <h1 className="text-left text-lg mt-2">Sharing days</h1>
            <div className="flex justify-between m-2 text-lg mt-4">
                <div className="w-11/12">
                    <span className="text-lg top-1 font-semibold text-left"> How many days </span>
                    <div className="relative flex items-center justify-center mt-12 slidervalue bg-green-600 ">
                        <span className="absolute w-16 h-6 text-center text-black rounded-xl bg-600">
                            {sliders} days
                        </span>
                        <div className="relative w-5"></div>
                    </div>
                    <div className="relative flex items-center w-full justify-center mt-3 field bg-600 text-white">
                        <div className="valueleft text-black">0</div>
                        <input
                            type="range"
                            min={0}
                            max={30}
                            className="relative flex items-center justify-center w-4/5 pl-4 text-gray-700 placeholder-gray-800 lg:w-383 field"
                            value={sliders}
                            onChange={handleChange}
                            step="1"
                        />

                        <div className="valueRight text-black">30</div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-lg text-xl mt-4">Potential monthly earning</h1>
                <h1 className="text-3xl mt-4">
                    {amount * sliders} - {amount * sliders + 100 * sliders}{" "}
                </h1>
                {/* <p className="text-sm">
                    The exact earning will depend on your rating and demand on the platform.
                </p> */}
            </div>
        </div>
    </div>
    <div className="w-350 h-32 bg-white border-stone-600 shadow-3xl invisible lg:visible mt-6 rounded-2xl flex justify-around">
        <div>
            <img src={bones} alt="" className="mt-3" />
        </div>
        <div className="p-2">
            <h1 className="text-xl">Earn referral</h1>
            <h1 className="text-4xl">2000Rs</h1>
        </div>
    </div>
</div>

                    <div
                        className={`${slider[currentIndex].url}
        
        lg:w-2/3 sm:w-4/5 h-2/3 lg:0 w-11/12 sm:m-0 m-2 lg:h-full rounded-lg bg-center bg-cover flex flex-col `}
                    >
                        <div className="     ">
                            <div
                                onClick={goToNext}
                                className="  rounded-full  text-4xl text-white shadow-lg ml-2 mb-0   absolute top-1/2  "
                            >
                                <BiLeftArrowAlt className="w-16 h-16   " />
                            </div>

                            <div
                                onClick={goToPrevious}
                                className="  rounded-full     ml-2 text-4xl text-white shadow-lg  mr-2 absolute top-1/2 right-16  rotate-180 text- "
                            >
                                <BiLeftArrowAlt className="w-16 h-16  " />
                            </div>
                        </div>
                        {/* <div className="text-black flex justify-center absolute bottom-3 left- ">
          {slider.map((slider, slideIndex) => (
            <div
              key={slideIndex}
              className="  cursor-pointer  text-4.563rem "
              onClick={() => goToSlide(slideIndex)}
            >
              <p className="">.</p>
            </div>
          ))}
        </div> */}
                        <div className="w-3/5 ml-16 h-96 bg-white bg-opacity-70 relative top-1/3 lg:p-5 sm:p-0  lg:visible invisible">
                            <h3 className="lg:text-2xl text-start visible lg:mt-0 sm:mt-44 mt-32 lg:text-black text-white font-sans text-xl  ">
                                Sharing is earning
                            </h3>
                            <h1 className="lg:text-4xl font-bold text-start visible lg:text-black text-white text-2xl drop-shadow-lg shadow-black">
                                {slider[currentIndex].title}
                            </h1>
                            <button
                                onClick={() => {
                                    navigate("/rent/form");
                                }}
                                className="  bg-yellow-500 hover:bg-black transition-colors hover:text-yellow-400 w-56 h-14 mt-5 bottom-2   font-semibold rounded p-2 items-center lg:visible invisible lg:sticky absolute "
                            >
                                START EARNING
                            </button>
                        </div>
                        <div className="lg:w-2/3 sm:w-4/5 h-full w-11/12 p-3 sm:mt-72 mt-60 bg-white border-stone-600 shadow-3xl   rounded-2xl lg:invisible visible lg:absolute absolute  ">
                            <h1 className="text-xl text-start font-semibold">How much could you earn by share your car?</h1>
                            <h1 className="text-start text-lg mt-2">Sharing days</h1>
                            <div className="flex justify-between m-2 text-lg mt-4">
                                <div className="w-11/12">
                                    <span className="relative text-lg top-1 font-semibold text-start"> How many days </span>
                                    <div className="relative flex items-center justify-center  mt-12 slidervalue bg-green-600 ">
                                        <span className="absolute w-16 h-6 text-center text-black rounded-xl bg--600 ">
                                            {sliders} days
                                        </span>
                                        <div className="relative w-5"></div>
                                    </div>
                                    <div className="relative flex items-center w-full justify-center mt-3 field bg-yellow-300 text-white">
                                        <div className="valueleft text-black ">0</div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={30}
                                            className="relative flex items-center justify-center w-4/5 pl-4 text-amber-300 placeholder-amber-200 lg:w-383 field bg-yellow-500"
                                            value={sliders}
                                            onChange={handleChange}
                                            step="1"
                                        />

                                        <div className="valueRight text-black">30</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className=" text-lg text-xl mt-4">Potential monthly earning</h1>

                                <h1 className="text-3xl mt-4">
                                    {amount * sliders} - {amount * sliders + 100 * sliders}{" "}
                                </h1>

                                <h1>The exact earning will depend on your rating, and demand on the platform</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full  lg:px-28 px-4 md:pt-14 pt-12 mt-4 ">
                    <div>
                        <h1 className="text-xl text-gray-500">How to earn money with nnoolCars</h1>
                        <h1>
                            {" "}
                            nnoolCars Rent Car is a program where car owners in Pune can earn money by sharing their car
                            with other individuals. nnoolCars host ensures a safe and seamless earning journey for you and
                            your car
                        </h1>
                        <img src={image} alt="fvsdfgsdfsgdfg" className="h-5/6" />
                    </div>
                </div>
            </div>
            <div className="w-full  h-16 absolute sticky  bottom-2 left-0 bg-green-600 visible lg:invisible rounded-2xl  ">
                <h1 className="text-white text-2xl text-center pt-3 m-3 ">START EARNING</h1>
            </div>
        </motion.div>
    );
}

export default RentLandingScreen;

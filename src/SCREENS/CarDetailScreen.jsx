import React, { useEffect, useState } from "react";
import moment from "moment";
import { message } from "antd";
import { json, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../COMPONENTS/Loader/loader"

import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlinePercentage } from "react-icons/ai";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

// import image from "../../public/suzuki-swift.jpeg";
import { getCarDetails } from "../API/SERVICES/findCar";
import Navbar from "../COMPONENTS/Navbar";
import PaySummary from "../COMPONENTS/Modal/PaySummary"
// import HostNumberVF from "../COMPONENTS/Modal/HostNumberVF"


function CarDetailsScreen() {
  
  const { carData } = useParams();
  const [car, setCar] = useState("");
  const { time, date, endDate } = useSelector((state) => state.userSlice);
  const [amount, setAmount] = useState("");
  const [Summary, setSummary] = useState(false);
  const [loader, setLoader] = useState(false);

  const [Package, setPackage] = useState(239);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberModal, setNumberModal] = useState(false);

  const [carImg, setCarImg] = useState([]);
  const { token } = useSelector((state) => state.userSlice);

  console.log(carData);
  const getCheckout = () => {

    if (token) {
      navigate(`/checkout/${carData}`, {
        state: { amount: amount + Package + 99, Package },
      });
    } else {
      // setNumberModal(true);
      navigate("/login")
    }
    
  };

  const navigate = useNavigate();
  useEffect(() => {
    try{
    setLoader(true);
    console.log("entered");
    getCarDetails(carData, date, endDate, time).then((res) => {
      setLoader(false);

      setCar(res.car);
      setAmount(res.amount);
      setCarImg(res.car.imageCar[0].filesUploaded);
    });
  }catch(e){
    console.log(e);

  }
  }, []);
  const selectProtection = (data) => {
    setPackage(data);
  };

  const goToPrevious = () => {
    const isfirstIndex = currentIndex === 0;
    const newIndex = isfirstIndex ? carImg.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isfirstSlice = currentIndex === carImg.length - 1;
    const nextIndex = isfirstSlice ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="w-">
      <Navbar />
      <div className="bg-yellow-100 lg:flex  justify-center">
        <div className="lg:w-8/12 w-full h-200rem whitespace-nowrap overflow-auto scrollbar-hide ">
          <div className="flex ml-">
            <AiOutlineArrowLeft
              className="ml-5 mt-5 text-xl"
              onClick={() => {
                navigate("/home");
              }}
            />
            <h1 className="ml-2 text-xl p-4">Back</h1>
          </div>

          <div className="flex justify-between ">
            <div className="w-full h-4/12  sm:ml-10 ml-0  overflow  ">
              <div className="w-full sm:h-80 h-60  bg-white rounded-xl  border-2 border-yellow-300 items-center flex justify-center justify-around">
                <div
                  className="sm:w-16 sm:h-16 w-10 h-10 rounded-full bg-yellow-500"
                  onClick={goToPrevious}
                >
                  <BsArrowLeft className="text-white sm:text-3xl text-xl font-semibold sm:m-4 m-2.5" />
                </div>
                <img
                  src={carImg && carImg[currentIndex]?.url}
                  alt=""
                  className="sm:h-72 h-52"
                />

                {/* {  carImg.map((data,index)=> ( */}
                <div className="sm:w-16 sm:h-16 w-10 h-10 rounded-full bg-yellow-500">
                  <BsArrowLeft
                    className="text-white sm:text-3xl text-xl font-semibold sm:m-4 m-2.5 -scale-x-90"
                    onClick={goToNext}
                  />
                </div>
                {/* ))} */}
              </div>
              <div className="w-full h- bg-white rounded-xl  border-2 border-yellow-300 mt-12  ">
                <div className="flex justify-between w-full">
                  <div className="p-2">
                    <h1 className="ml-3 mr-3 text-2xl">
                      {car.brand} {car.year}
                    </h1>
                    <p className="text-gray-500 ml-3">
                      {car.fuel} , {car.carNumber}. , {car.transmission}
                    </p>
                  </div>
                  <div className="flex w-64">
                    <div>
                      <HiOutlineUserCircle className="text-4xl mt-5" />
                    </div>
                    <div className="p-3 mr-3">
                      <h1 className="text-lg">
                        {car.owner?.name} is a nnoolCar
                      </h1>
                      <h1 className="text-sm ">nnoolCars since Feb'23</h1>
                    </div>
                  </div>
                </div>
                <hr className="mt-2" />
                <div className="m-5 ">
                  <h1 className="text-xl mt-2 font-semibold">About the car</h1>
                  <p className="mt-1">{car.description}</p>
                  <div className="rounded-xl  border-2 border-yellow-300 mt-12 h-32 flex justify-between">
                    <div className="p-5">
                      <h1 className="font-semibold text-xl">
                        {moment(date).format("DD MMM, YYYY")}
                      </h1>
                      <h1 className="text-lg">
                        {endDate ? moment(date).format("h:mm A") : time}
                      </h1>
                    </div>
                    <div className="p-5">
                      <h1 className="text-right text-xl">
                        {endDate
                          ? moment(endDate, "DD-MM-YYYY").format("DD MMM, YYYY")
                          : moment(date, "DD-MM-YYYY")
                              .add("days", 1)
                              .format("DD MMM, YYYY")}
                      </h1>
                      <h1 className="text-end text-lg">
                        {endDate ? moment(endDate).format("h:mm A") : time}
                      </h1>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:w-96 w- h-full justify-center rounded-xl border-2 border-yellow-300 sm:ml-12 m-2  sm:mt-16  ">
          <div className="w-full h-full bg-yellow-200 rounded-xl p-4 ">
            <h1 className="text-xl ">Wallet and offer</h1>
            <div className="flex mt-2">
              <AiOutlinePercentage className="text-green-600 text-xl" />
              <h1 className="ml-3">Apply coupon</h1>
            </div>
            <div>
              <div className="rounded-xl  border-2 border-yellow-300 mt-5 h-86 w-full p-3 font-semibold">
                <h1 className="text-lg">Damage Protection Package</h1>
                <p className="text-sm text-green-600 underline">
                  how to does it work
                </p>

                <div className="flex mt-4 justify-between ">
                  <div className="rounded-full w-5 h-5 border-2 border-gray-700 m-2">
                    <p className="-mt-1 ml-0.5"> A</p>
                  </div>
                  <div className="pl-2 md:w-full  w-4/5">
                    <h1 className="text-lg">{`Basic (₹199)`}</h1>
                    <p className="text-sm">
                      You pay up to INR 3499 in case of any damage
                    </p>
                    <h1 className="text-lg text-green-600">Most Opted</h1>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-black border-2 mt-3  "
                    value="239"
                    onClick={() => selectProtection(199)}
                  >
                    {Package === 199 && (
                      <div className="rounded-full bg-green-600 w-3 h-3 m-0.5"></div>
                    )}
                  </div>
                </div>
                <div className="flex mt-4 justify-between">
                  <div className="rounded-full w-5 h-5 border-2 border-gray-700 m-2">
                    <p className="-mt-1 ml-0.5"> B</p>
                  </div>
                  <div className="pl-2 md:w-full  w-4/5">
                    <h1 className="text-lg">{`Standard (₹239)`}</h1>
                    <p className="text-sm">
                      You pay up to INR 999 in case of any damage
                    </p>
                    <h1 className="text-lg text-green-600">Most Opted</h1>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-black border-2 mt-3"
                    value="239"
                    onClick={() => selectProtection(239)}
                  >
                    {Package === 239 && (
                      <div className="rounded-full bg-green-600 w-3 h-3 m-0.5"></div>
                    )}
                  </div>
                </div>
                <div className="flex mt-4 justify-between">
                  <div className="rounded-full w-5 h-5 border-2 border-gray-700 m-2">
                    <p className="-mt-1 ml-0.5"> C</p>
                  </div>
                  <div className="pl-2 md:w-full  w-4/5">
                    <h1 className="text-lg">Peace of Mind (₹309)</h1>
                    <p className="text-sm">
                      You pay up to INR 99 in case of any damage
                    </p>
                    <h1 className="text-lg text-green-600">value for money</h1>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-black border-2 mt-3"
                    value="309"
                    onClick={() => selectProtection(309)}
                  >
                    {Package === 309 && (
                      <div className="rounded-full bg-green-600 w-3 h-3 m-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl  rounded-xl h- w-full h-36 mt-6">
            <h1 className="p-3">Please review the final fare</h1>
            <div className="flex justify-between -mt-2">
              <h1 className="text-2xl font-semibold ml-3">
                ₹{amount + Package + 99}
              </h1>
              <div className="flex m-2 " onClick={() => setSummary(true)}>
                <HiOutlineDocumentDuplicate className="text-2xl m-1 text-green-600" />
                <h1 className="text-lg">Fire Summary</h1>
              </div>
              <PaySummary
                open={Summary}
                setOpen={setSummary}
                amount={amount + Package + 99}
                Package={Package}
              />
            </div>
            <div className="text-center -mt-2 ">
              <button
                className="items-center rounded-lg bg-green-600 text-center w-64 h-12 text-white"
                onClick={getCheckout}
              >
                PROCEED TO PAY ₹{amount + Package + 99}
              </button>
              {/* <HostNumberVF />

              <HostNumberVF
                open={numberModal}
                onclose={() => setNumberModal(false)}
                setOpen={setNumberModal}
              ></HostNumberVF> */}
            </div>
          </div>
        </div>
      </div>

      {loader ? <Loader loader={loader} /> : null}
    </div>
  );
}

export default CarDetailsScreen;

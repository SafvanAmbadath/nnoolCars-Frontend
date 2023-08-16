import React, { useState } from "react";
import { message } from "antd";

import RentNavbar from "../COMPONENTS/RentNavbar";
import { PickerOverlay } from "filestack-react";
import CarDetailsForm from "../COMPONENTS/Modal/CardetailsForm";

function ProofDetails() {
    const [isPicker, setIsPicker] = useState(false);
    const [isPickerIC, setIsPickerIC] = useState(false);
    const [imageIC, setimageIC] = useState("");
    const [imageRC, setimageRC] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [slider, setSlider] = useState(500000);
    const [carNumber, setCarNumber] = useState(null);

    const fileStackActiveRC = (e) => {
        e.preventDefault();

        if (isPicker) {
            setIsPicker(false);
        } else {
            setIsPicker(true);
        }
    };
    const fileStackActiveIC = (e) => {
        e.preventDefault();

        if (isPickerIC) {
            setIsPickerIC(false);
        } else {
            setIsPickerIC(true);
        }
    };

    const filestackClientID = process.env.REACT_APP_FILESTACK_API_KEY;

    const number = localStorage.getItem("number");
    const email = localStorage.getItem("email");

    const handleChange = (event) => {
        setSlider(event.target.value);
    };

    const rcVerify = async (e) => {
        const image = imageRC.filesUploaded[0];
        const validTypes = ["image/jpeg", "image/png", "image/gif"];

        if (validTypes.includes(image.mimetype)) {
            console.log("Image is valid");
            if (imageRC && imageIC && carNumber) {
                setIsOpen(true);
            } else {
                message.error("fill full details");
            }
        } else {
            message.error("Invalid image type");
        }
    };

    return (
        <div className="flex flex-col">
            <RentNavbar />

            <div className="container mx-auto">
                <div className="w-full h-32 bg-yellow-300 ">
                    <h1 className="text-xl font-bold">nnoolCars Rent Car</h1>
                    <p className="text-sm lg:text-lg">
                        Share few more details and move one step closer to EARNING up to ₹50,000 per month. Get up to 5000
                        bonus on successful sign-up to the program
                    </p>
                </div>
                <div className="flex flex-row pt-3">
                    <div className="w-1/2 mt-3 ml-8">
                        <input
                            type="number"
                            name="number"
                            className="w-4/5 h-16 pl-4 mt-1 text-2xl text-gray-700 border outline-none lg:w-383 rounded-2xl focus:outline-dark-purple"
                            value={number}
                            placeholder="Phone number"
                        ></input>
                        <input
                            type="text"
                            name="carName"
                            className="w-4/5 h-16 pl-4 mt-12 text-2xl uppercase  text-gray-700 border outline-none lg:w-383 rounded-2xl focus:outline-dark-purple"
                            placeholder="Car Number*"
                            onChange={(e) => setCarNumber(e.target.value)}
                        ></input>
                    </div>
                    <div className="w-1/2 mt-3">
                        <input
                            type="email"
                            name="email"
                            className="w-4/5 h-16 pl-4 mt-1 text-2xl text-gray-700 border outline-none lg:w-383 rounded-2xl focus:outline-dark-purple"
                            value={email}
                            placeholder="Email"
                        ></input>
                        <div>
                            <span className="relative text-lg top-16"> Car KM driven </span>
                            <div className="relative flex items-center justify-center mt-12 slidervalue bg-dark-purple ">
                                <span className="absolute w-16 h-6 text-center text-black font-semibold rounded-xl bg-yellow-500 ">
                                    {slider}
                                </span>
                                <div className="relative w-5"></div>
                            </div>
                            <div className="relative flex items-center justify-center mt-3 field ">
                                <div className="valueleft ">0</div>
                                <input
                                    type="range"
                                    min={0}
                                    max={1000000}
                                    className="relative flex items-center justify-center w-4/5 pl-4 text-gray-700 lg:w-383 field "
                                    value={slider}
                                    onChange={handleChange}
                                    step="1"
                                />

                                <div className="valueRight ">1000000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <form action="" className="flex flex-row pt-3 ">
                    <div className="w-1/2 m-8 mt-3 h-52 bg-blue-50">
                        <div className="flex-col w-full px-1 py-1 bg-yellow-200 shadow-md h-36 ">
                            {imageRC ? (
                                <img
                                    src={imageRC && imageRC.filesUploaded[0].url}
                                    alt="imageUploded"
                                    className="object-cover w-full h-full "
                                />
                            ) : (
                                <button
                                    className="w-full h-full text-lg font-bold border-2 rounded-md  border-yellow-500"
                                    onClick={fileStackActiveRC}
                                >
                                    Upload your RC
                                </button>
                            )}
                        </div>
                        <input
                            type="text"
                            name="title"
                            className="w-full h-12 pl-4 mt-1 text-2xl text-gray-700 border outline-none rounded-2xl focus:outline-dark-purple"
                            placeholder="Image Title"
                        ></input>
                        <div>
                            {isPicker && (
                                <PickerOverlay
                                    apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                                    onSuccess={(res) => {
                                        console.log(res);
                                        setimageRC(res);
                                        console.log(imageRC);
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
                        </div>
                    </div>
                    <div className="w-1/2 m-8 mt-3 h-52 bg-blue-50">
                        <div className="flex-col w-full px-1 py-1 bg-yellow-200 shadow-md h-36 ">
                            {imageIC ? (
                                <img
                                    src={imageIC && imageIC.filesUploaded[0].url}
                                    alt="imageUploded"
                                    className="object-cover w-full h-full "
                                />
                            ) : (
                                <button
                                    className="w-full h-full text-lg font-bold border-2 rounded-md  border-yellow-500"
                                    type="submit"
                                    onClick={fileStackActiveIC}
                                >
                                    Upload your Aadhaar or (any identity proof)
                                </button>
                            )}
                        </div>
                        <input
                            type="text"
                            name="password"
                            className="w-full h-12 pl-4 mt-1 text-2xl text-gray-700 border outline-none rounded-2xl focus:outline-dark-purple"
                            placeholder="Image Title"
                        ></input>

                        {/* fileStrack */}
                        <div className="relative mt-3 ">
                            {isPickerIC && (
                                <PickerOverlay
                                    apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                                    onSuccess={(res) => {
                                        console.log(res);
                                        setimageIC(res);
                                        console.log(imageIC);
                                        setIsPickerIC(false);
                                    }}
                                    onError={(res) => alert(res)}
                                    pickerOptions={{
                                        maxFiles: 1,
                                        // errorsTimeout : 2000,
                                        // maxSize : 1 * 1000 * 1000
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </form>
                <div className="flex justify-center ">
                    <button
                        className="items-center h-16 text-center text-black font-bold rounded-md bg-yellow-500 w-64 "
                        placeholder="Enter number"
                        onClick={rcVerify}
                    >
                        CONTINUE
                    </button>
                    <CarDetailsForm
                        open={isOpen}
                        onclose={() => setIsOpen(false)}
                        setopen={setIsOpen}
                        imageRC={imageRC}
                        imageIC={imageIC}
                        km={slider}
                        carNumber={carNumber}
                        email={email}
                    >
                        <h1>hello bro</h1>
                    </CarDetailsForm>
                </div>
            </div>
        </div>
    );
}

export default ProofDetails;

import React, { useState, useRef } from "react";
import { PickerOverlay } from "filestack-react";
import { State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { postRentCar } from "../../API/SERVICES/hostVerify";
import { useSelector } from "react-redux";
import { message } from "antd";

function CarDetailsForm({ open, children, onclose, setopen, imageRC, imageIC, carNumber, km, email }) {
    // const car = carNames.all
    const statesName = State.getStatesOfCountry("IN");
    const [list, setList] = useState(false);
    const [imageCar, setImageCar] = useState("");
    const [isPickerCar, setIsPickerCar] = useState(false);
    const [fuel, setFuel] = useState("");
    const [noOwner, setNoOwner] = useState("");
    const [transmission, setTransmission] = useState("");
    const [state, setState] = useState("");
    const [brand, setBrand] = useState("");
    const [city, setCity] = useState("");
    const hostFormRef = useRef();
    const navigate = useNavigate();

    const { token, id } = useSelector((state) => state.userSlice);
    // const token = localStorage.getItem("token");
    // const id = localStorage.getItem("id");

    const stateHandle = (e) => {
        e.preventDefault();
        setState(e.target.value);
    };
    const brandHandle = (e) => {
        e.preventDefault();
        setBrand(e.target.value);
    };
    const cityHandle = (e) => {
        e.preventDefault();
        setCity(e.target.value);
    };
    let cityState = City.getCitiesOfState("IN", state);

    const fileStackActive = (e) => {
        e.preventDefault();
        if (isPickerCar) {
            setIsPickerCar(false);
        } else {
            setIsPickerCar(true);
        }
    };

    const seeCurrentList = (e) => {
        e.preventDefault();
        setList(true);
    };
    const seeNewList = (e) => {
        e.preventDefault();
        setList(false);
    };
    const brands = [
        { name: "Maruti" },
        { name: "Tata" },
        { name: "Toyota" },
        { name: "BMW" },
        { name: "Hyundai" },
        { name: "Mahindra" },
        { name: "Mercedes" },
        { name: "Audi" },
        { name: "Honda" },
    ];
    const carRegister = async (e) => {
        e.preventDefault();
        const year = hostFormRef.current.year.value;
        const description = hostFormRef.current.description.value;
        // const brand = hostFormRef.current.brand.value;
        const features = hostFormRef.current.features.value;
        const price = hostFormRef.current.price.value;
        const neighbourhood = hostFormRef.current.neighbourhood.value;
        const sNumber = hostFormRef.current.sNumber.value;

        if (
            year &&
            fuel &&
            noOwner &&
            description &&
            transmission &&
            brand &&
            features &&
            price &&
            state &&
            city &&
            neighbourhood &&
            sNumber
        ) {
            const data = {
                year,
                fuel,
                description,
                noOwner,
                transmission,
                brand,
                features,
                price,
                state,
                city,
                neighbourhood,
                sNumber,
                imageRC,
                imageIC,
                km,
                carNumber,
                imageCar,
                email,
                id,
            };

            //  const url="http://localhost:4000/api/users/rentCarData"
            //  console.log("posting car data");
            const res = await postRentCar(data);
            console.log(res);

            if (res.status === 201) {
                message.success("Car posted,Admin will review")
                navigate("/hostVerify");
            }
        } else {
            message.error("fill full details");
        }
    };

    if (!open) return null;

    return (
        <>
            <div
                className=" fixed top-0 left-0 right-0 bottom-0  bg-black opacity-80 z-50 "
                onClick={() => setopen(false)}
            />
            <div className=" fixed top-10 lg:left-24 left-10 right-10 lg:right-24 bottom-10 bg-white z-50 overflow-auto  ">
                <div className="container  mx-auto">
                    <div className="w-full h-20 bg-yellow-300 ">
                        <h1 className="text-xl font-bold">Fill your car details</h1>
                        <p className="lg:text-lg text-sm">
                            Share few more details and move one step closer to EARNING up to ₹50,000 per month. Get up to
                            5000 bonus on successful sign-up to the program 🚘 💵 🥳
                        </p>
                    </div>
                    <form action="" ref={hostFormRef}>
                        <div className="flex sm:flex-row flex-col pt-3">
                            <div className="sm:w-1/2 w-4/5 mt-3 ml-8">
                                <div>
                                    <span>Year*</span>
                                    <input
                                        type="number"
                                        name="year"
                                        className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                        placeholder="Year"
                                    ></input>
                                </div>
                                <br />
                                <span className="">Fuel *</span>
                                <div className='w-full   pl-4    text-lg text-gray-700  h-12   focus:outline-dark-purple"'>
                                    <button
                                        className={`w-3/12 -2 ${
                                            fuel == "Petrol" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFuel("Petrol");
                                        }}
                                    >
                                        Petrol
                                    </button>
                                    <button
                                        className={`w-3/12 m-3 ${
                                            fuel == "Diesel" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFuel("Diesel");
                                        }}
                                    >
                                        Diesel
                                    </button>
                                    <button
                                        className={`w-3/12 ${
                                            fuel == "Electric" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFuel("Electric");
                                        }}
                                    >
                                        Electric
                                    </button>
                                    {console.log(fuel)}
                                </div>
                                <br />
                                <span>No. of Owners *</span>
                                <div className='w-full   pl-4   text-lg text-gray-700  h-12   focus:outline-dark-purple"'>
                                    <button
                                        className={`w-2/12 m-2 ${
                                            noOwner == "1st" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setNoOwner("1st");
                                        }}
                                    >
                                        1st
                                    </button>
                                    <button
                                        className={`w-2/12 m-2 ${
                                            noOwner == "2nd" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setNoOwner("2nd");
                                        }}
                                    >
                                        2nd
                                    </button>
                                    <button
                                        className={`w-2/12 m-2 ${
                                            noOwner == "3rd" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setNoOwner("3rd");
                                        }}
                                    >
                                        3rd
                                    </button>
                                    <button
                                        className={`w-2/12 m-2 ${
                                            noOwner == "4+" ? "bg-yellow-500" : "bg-slate-950"
                                        } rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setNoOwner("4+");
                                        }}
                                    >
                                        4+
                                    </button>
                                </div>
                                <br />
                                <span>Description *</span>
                                <input
                                    type="text"
                                    name="description"
                                    className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-24 rounded-2xl   outline-none focus:outline-dark-purple"
                                    placeholder="Description"
                                ></input>
                            </div>
                            <div className="sm:w-1/2 w-4/5 mt-3 ml-8">
                                <span>Transmission *</span>
                                <div className='w-full   pl-4 mt-1    text-lg text-gray-700  h-12   focus:outline-dark-purple"'>
                                    <button
                                        className={`w-3/12 -2 ${
                                            transmission == "Automatic" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setTransmission("Automatic");
                                        }}
                                    >
                                        Automatic
                                    </button>
                                    <button
                                        className={`w-3/12 m-3 ${
                                            transmission == "Manual" ? "bg-yellow-500" : "bg-slate-950"
                                        }  rounded-lg text-white`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setTransmission("Manual");
                                        }}
                                    >
                                        Manual
                                    </button>
                                </div>
                                <br />
                                <div>
                                    <span className="">Brand *</span>
                                    {/* <input
                                        type="text"
                                        name="brand"
                                        className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                        placeholder="Brand"
                                    ></input> */}
                                    <select
                                        name="brand"
                                        id=""
                                        onChange={brandHandle}
                                        className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                    >
                                        <option value="">--Select your Brand--</option>

                                        {brands.map((brand, index) => (
                                            <option key={index} value={brand.name}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <br />
                                <span>Ad title *</span>
                                <input
                                    type="text"
                                    name="features"
                                    className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                    placeholder="Ad title *"
                                ></input>
                                <p className="text-sm">
                                    Mention the key features of your item (e.g. brand, model, age, type)
                                </p>
                                <br />
                                <span>Set a price</span>
                                <input
                                    type="number"
                                    name="price"
                                    className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                    placeholder="Price"
                                ></input>
                            </div>
                        </div>
                        <div className="container  mx-auto mt-4">
                            <span className="w-full">CONFIRM YOUR LOCATION</span>
                            <div className=" flex flex-row">
                                <button
                                    className={` w-1/2 mt-3  ${list ? "" : "border-b-8 border-zinc-900"}`}
                                    onClick={seeNewList}
                                >
                                    LIST
                                </button>
                                <button
                                    className={`w-1/2 mt-3 ${list && "border-b-8 border-zinc-900"} `}
                                    onClick={seeCurrentList}
                                >
                                    CURRENT LOCATION
                                </button>
                            </div>
                        </div>
                        {list ? (
                            <div className="container  mx-auto w-full h-full flex flex-col">
                                <div className="w-full bg-slate-300 h-12 rounded-md p-3 flex flex-row justify-between  ">
                                    <span>State </span>
                                    <span>Kerala</span>
                                </div>
                                <div className="w-full mt-2 bg-slate-300 h-12 rounded-md p-3 flex flex-row justify-between ">
                                    <span>City</span>
                                    <span>Calicut</span>
                                </div>
                                <div className="w-full mt-2 bg-slate-300 h-12 rounded-md p-3 flex flex-row justify-between ">
                                    <span>Neighbourhood</span>
                                    <span>Nadakavu</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col container  mx-auto">
                                <div className="flex flex-col mt-3">
                                    <label>State *</label>
                                    <select
                                        name=""
                                        id=""
                                        onChange={stateHandle}
                                        className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                    >
                                        <option value="">--Select your state--</option>

                                        {statesName.map((states, index) => (
                                            <option key={index} value={states.isoCode}>
                                                {states.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {state && (
                                    <div className="flex flex-col mt-3">
                                        <label>City *</label>
                                        <select
                                            name=""
                                            id=""
                                            onChange={cityHandle}
                                            className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                        >
                                            <option value="">--Select your City--</option>
                                            {console.log(cityState)}
                                            {cityState.map((citys, index) => (
                                                <option key={index}>{citys.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {city && (
                                    <div
                                        className="
                mt-3"
                                    >
                                        <span>Neighbourhood *</span>
                                        <input
                                            type="text"
                                            name="neighbourhood"
                                            className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                            placeholder="Neighbourhood"
                                        ></input>
                                    </div>
                                )}
                            </div>
                        )}
                        <br />
                        <div className="flex flex-col container  mx-auto ">
                            <span className="font-bold">UPLOAD UP TO 10 PHOTOS</span>
                            <div className="w-full h-36 shadow-md flex-col bg-yellow-300 py-1 px-1  ">
                                {imageCar ? (
                                    <img
                                        src={imageCar && imageCar.filesUploaded[0].url}
                                        alt="imageUploded"
                                        className="h-full w-full object-cover "
                                    />
                                ) : (
                                    <button
                                        className=" w-full border-2 h-full rounded-md border-dark-purple text-lg font-bold"
                                        type="submit"
                                        onClick={fileStackActive}
                                    >
                                        Upload Car Image
                                    </button>
                                )}
                                <div className="mt-3 relative  ">
                                    {isPickerCar && (
                                        <PickerOverlay
                                            apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                                            onSuccess={(res) => {
                                                console.log(res);
                                                setImageCar(res);
                                                console.log(imageCar);
                                                setIsPickerCar(false);
                                            }}
                                            onError={(res) => alert(res)}
                                            pickerOptions={{
                                                maxFiles: 10,
                                                // errorsTimeout : 2000,
                                                // maxSize : 1 * 1000 * 1000
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col container  mx-auto mt-4">
                            <h1 className="text-xl font-bold">Let's verify your account</h1>
                            <p>We will send you a confirmation code by sms on the next step.</p>
                            <br />
                            <span>Mobile Phone Number *</span>
                            <input
                                type="number"
                                name="sNumber"
                                className="w-full   pl-4 mt-1    text-2xl text-gray-700 border h-12 rounded-2xl   outline-none focus:outline-dark-purple"
                                placeholder="Number"
                            ></input>
                        </div>
                        <div className="container  flex justify-center mt-4 p-3">
                            <button
                                className="bg-yellow-500 w-64    text-black font-bold rounded-md h-16   text-center items-center "
                                placeholder="Enter number"
                                onClick={carRegister}
                            >
                                Post Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CarDetailsForm;

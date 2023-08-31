import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { message } from "antd";

import Navbar from "../COMPONENTS/Navbar"
import scan from "../COMPONENTS/images/download.png"
import car from "../COMPONENTS/images/images (3).jpeg";

import { postCarBook } from "../API/SERVICES/bookingCar";

import moment from "moment";
import Loader from "../COMPONENTS/Loader/loader";

function CheckoutScreen() {
  const { carId } = useParams();
  const [upi, setUpi] = useState(true);
  const [wallet, setWallet] = useState(false);
  const [netBank, setNetBank] = useState(false);

  const [creditCard, setCreditCard] = useState(false);
  // const [message, setMessage] = useState("");
  const { state } = useLocation();
  const { id, token, endDate, date, time } = useSelector(
    (state) => state.userSlice
  );
  const cancelDate = moment().add(30, "minutes");
  const navigate = useNavigate();

  const completePayment = async (upi) => {
    try{
    console.log("payment...");
    const data = {
      amount: state.amount,
      protectionPackage: state.Package,
      paymentMethod: upi,
      userData: id,
      carData: carId,
      endDate,
      date,
      time,
    };
    console.log("before booking")
    
     await postCarBook(data).then((res)=>{
       console.log(res);
       console.log("helohi");
       if(res.status === 202) {
        console.log("booked done");
        message.success("Car booked successfully")
        navigate("/verifyOrder");
      } else {
        message.error(res.data.message);
      }

    })
   

    
  }catch(err){}
  };

  return (
    <div className="w-">
    <div className="bg-yellow-100 w-full h-full">
      <Navbar />
      <h1 className="m-3 text-2xl font-semibold md:pl-10 ">
        Select a Payment method
      </h1>
      <div className="lg:flex justify-center md:px-10 h-full">
        <div className="lg:w-4/6 h-full flex border-r-2 justify-top w-full ">
          <div className="w-full h-full  bg-white items-top rounded-xl shadow-xl  border-2 border-yellow-300 flex">
            <div className="w-6/12 h-[400px] border-r-2 p-3 pt-3">
              <h1 className="text-xl bg-yellow-200 mt-3">
                OTHER PAYMENT METHODS
              </h1>
              <div className="p-2 flex-wrap">
                <div
                  className="flex"
                  onClick={() => {
                    setWallet(false);
                    setCreditCard(false);
                    setUpi(true);
                  }}
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaklEQVR4nO2Xu49NURTGf94SIRidRzTeCTMejVehGFFIKLRKxRQoKBRcGgohhMZ/IKYyU00hJnGRUFCMR6cYIhKRmAwJgytb1o6TNWefdfYZEZL1JTvnfud+37fOvmeffdcBh8PhcDgcDofD4fh30A10MsZ18W0S/tTI17oyvrvmtc
                             4A+lJfnsycyEXxnVA8Ba0r4yPATCNnLtBfVW9IgvcaQVoXeW9NX6/B+yoyFgPtqnphlp+AL8C8iqA5ohsFZssYr+HTuhTvAB+AJSUZK4GXoknW25OxpCaAfQ18YdxRPs076vmL2Ay8LcmZhAsZFzNe+DXOZ07klPJpPiTHb8BG+S4soTEZD5RvEh6LYBvVeCS6Zcq31fBpXRUflM/DwGHgK/AO2GLV6wK+y9oM21oKi+SXirroew9Mr/BpncXXyMXHu/gKWF2n3qHM5dGvfLeMu6F1Fg+4JudGCnffrHc
                             jYxJvCssv+o6kghM6iyO71m1gIb9Rt57jv8Co3M6lhu610kVeZ4SHuSxnGnBAzh+cyiTWSegzQ7de6SKvO54ncjZIO7IWeDiViRyV4CuG7lhNXSr/aoIfB34Al+X8KhpiQAL2/yGd5RtQfLDQEoXj6QZz+NVKf5SQBRm6yOsuK+2bqMh50WQiO8V8L1MXeZ0ROtiW8rWF7yrRX2oykbNiPmPozomupXythvVaKje2KjeNNiiJ+xKwPVMXX3p2ZNZrK1/ocu9Kkzos70HZmK+aNmuE9npWwRd5br2xQs4TYLkcQ7PaCCsKb2vW+CzbL7Lbd
                             GT3yYH29cgfYnehYXQ4HA6Hw+Fw8PfxEyWmf5sEmp4DAAAAAElFTkSuQmCC"
                    alt=""
                    className="w-12 h-12 mt-2"
                  />

                  <div className="p-2">
                    <h1 className="text-xl">UPI</h1>
                    <p className="text-sm ">Google Pay, PhonePe, BHIM UPI</p>
                  </div>
                </div>
                <hr />
                {/* <div className="flex mt-1">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDUlEQVR4nO3ZT4hNYRjH8Y8J6ZZI+bcw41/2spCYhbKyt7GwIZoFZWVhaUGGspWNZEPKmhnlz1jIKCuKUvKvUf4O0hRHp55btxPuuZo79z3jfOtd3ee59/d7n+d9z3vPS03NrGMV9uICHuMDnuEo5kiYBnbiDB4h+8sYkhD5rG7EEdzA94LYT7iKgxjEUuyLz+72WnwuZhfO4mVB+A+M4wR2YP5v8ldG7IuZFr4gRJ3EQ/wsiH+Oc2FuSYnvmxd5UzOg3Vrsx2V8Lgj/ipFop03/uGizGF1hPYaj5MV2eYDj2P6HdknCyAZcKrTMa5zHbiyb7h/UBSMH8K1l5q9gi4ox1DIzF6O1Ksfqlkrcxh28a/MA6+aYxFh0SL6rleZYD0VnbcY9rChrZKwl8VUs6kV6x+KoxsfQNF52d3wTCXniGumwDu9D26EyCZMRfFh67Alt98sENw93/dJjYcsJoi3N9TFXmmRlH5hdPetMA1ltJDGyuiKJkdUVSYysKhUZwCi+xN/m/qoaGS2ceK9X1chkwUj+gqOSRkZmS0UGQnxemWtVXiPtqI2kRla3VmJkdUUSI/vvKjIVgfmdX2o0OrkIehrBW6XHYGh7Uib4dATfRJ906IuX6llcOrVlOd5Gwi1s63GbNUJD08REJxdMm1vMpDQmQltH5JU5Ff3Y3AB6MaZCw3Bcf9fU1
                             OicXxCUb8WWhAitAAAAAElFTkSuQmCC"
                    alt=""
                    className="w-12 h-12 mt-2"
                  />

                  <div
                    className="p-2 "
                    onClick={() => {
                      setUpi(false);
                      setCreditCard(false);
                      setWallet(true);
                    }}
                  >
                    <h1 className="text-xl">Mobile wallet</h1>
                    <p className="text-sm ">All major wallets are supported</p>
                  </div>
                </div> */}
                {/* <hr /> */}
                {/* <div className='flex mt-1' >
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZklEQVR4nO2ZPWgUQRTHfypBCzUWsTGRWCgWYqFWIilM0sZCSKGFlgoWfhQptBEhWGgjCBqICdhoPC3ES0DtFBEh
                        llqIWljko4ho0BgIcWTgf7DI3s64Fy8vl/3BY25v/zP33sybmdtZKCgoWJW0ASVgFnBGbBZ4BOz6lyBmDDjuqpj3rTUmkJIqPImtUCdagbJ8G4mpUEknS0FU2C7fvhFBZQit4mL9KwKxO
                        iLOuAVxK8TaGyWQI40SyKVGCeR+bCBWcbL3sUKrONkCsCFGaBWXsH0xwlAjeWypAznRKIFcyxuIBVzCnsYIV0IgEzFCqzjZd5UtIaFVnOyVysMhoVWc7LbKsyGhVZzsjMrBkNAqTtah8k1IaBUn2wL8Bn4Ca7OEVnEJ/77oc+qh3ZRu+oM668dBZV0fTRPf082ysWDagFH55g8RPVd1fTmtwg5g8j8/FNV6ZLpTvh7Xdw+zhvAO8MOA4
                        y6xk5cSQXj26t6H0HAOSngKm2yUf79CwnMS3sQmHfLvY0jYKeEL7LAJOAhcAKblX1+oUktiuVtD/dkG9GhVegC8Axb/mjv+FUNTTGOTsSd7NbAV6ALOA0PAODBXZdLPA2+BYe0fqbt6Gs/UgO+ZWvE9twfoVS/7l0mfMlaqCeA5cEPP5weA9Xl//LoavZgjLbr1N/uuenk+Y2kdl87ru7MemPJyTD/2usowbgYOAaeBW8BLzak0hxd0sDaijunRBly3VWJajoxpT+kHHgOfM9JiSmnpR/QksL+WtFgqfG5+reLwnNJiSJO1S5PXLM3K3wHgiibsbmDdcjtWUFBANH8A1Itnau6Uih8AAAAASUVORK5CYII=" alt="" className='w-12 h-12 mt-2' />

                                    <div className='p-2 ' onClick={() => { setUpi(false); setWallet(false); setCreditCard(true) }}>
                                        <h1 className='text-xl'>Credit/Debit/ATM Card</h1>
                                        <p className='text-sm '>All major card providers are supported</p>
                                    </div>
                                </div>
                                <hr /> */}
                {/* <div className='flex mt-1'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC10lEQVR4nO2bPW8TQRCGHyKzCQ10KAgogN8ASCRUkL8AEgERQKIjEEfIVaQUKagQH0IooYT0fP0CAj10AVooqAAFiUhGGK0Zo7nN4dzZZ9/d3r7SypcZ3/p9x7Nf4wvkgzHgPPBA2rTYvIcBrgKfgJbTvgANYBcVE97yORBjwCzwOUaotS1I+5//WlmHhkmZ6t4MDdOnkNIGwmRMvDSBMAMmWthAmCETK0wgTM5Ecvt8U5RvYNh8TMGED42fKbjwgfE1JROeKf+zXbaksyXbkm63BT/j3nDdE+FpAmHPGW3sBX6WLNWzGBqbwLh1XlLGt8Bu/IXV9k7pnUGOox3DEv5jSeldsIZFZbDXvmOL3sWqB6CuDI/xH6tK75w1HFeG38ATWQV8bKuisaP3aCcqL2PWSd/bM50We4AXFRMfu9wfk3Fxy9N2Q6d9QEBAYhwErshScln+7gc7gSnZg9TlulYwjm2Myq+3v5xZtAncF39anAQ+xszMH4DJgnBsYyTB0vhc3pdG/GaX/qxvImeO/zDjdPQKuC2v2n6B5Gmvv/mvwLK0b8r+PsVwyJpjBG9UB3eiLu4p3xrJMOWIP6R8h50gnMqJYwQ/VAftyonCuPJtkAw31T0PY/zLyj+fE8cIdAr14nex3bG7l2N51hwjCAEgZABhCBDmAMIkSDzCKkBYBgn7AMJGiLATJBnCVphwFiAchginQUpzHN5QN+9zfPuV73vC/ubVPbb44eKR8tdz4hjBa9XBXWXfIdVWXYfrpSRmy2AdHOmxJJY1xwguOim0JgVH/aEt+eenJKhJ6btznxW8Ik2LX09RFM2aYwQjUlLuVnJ+mrLkPJmgLH4iZ44RjEpqNZ1Om1KFtY+fpcWElL5douspxQ+S4xYckMfpGvJqJ5h+YFP8tPwUPydjvlYwjgE
                             BVcGILBONijWr2e4X2hetirbpEAD+poGNRN5PcA27nbPa/wD3K1iP/T957wAAAABJRU5ErkJggg==" alt="" className='w-12 h-12 mt-2' />

                                    <div className='p-2 '>
                                        <h1 className='text-xl'>Net Banking</h1>
                                        <p className='text-sm '>All major card providers are supported</p>
                                    </div>
                                </div> */}
                <hr />
              </div>
            </div>
            <div className="w-6/12 h-full ">
              {upi && (
                <div className="h-80 w-full  border-b-2  ">
                  <div className="flex justify-between">
                    <div className="p-4">
                      <h1 className="text-xl font-bold">Select a UPI App</h1>
                      <p>Amount: ₹{state.amount}.0</p>
                      <img src="" alt="" />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="justify-center w-full p-2 ">
                      <PayPalScriptProvider
                        options={{
                          "client-id": process.env.REACT_APP_PAYPAL_CLIEND_ID,
                        }}
                      >
                        <PayPalButtons
                          style={{
                            color: "blue",
                            shape: "pill",
                            label: "pay",
                            height: 40,
                          }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: state.amount,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            

                            console.log(actions);

                            return actions.order.capture().then((res) => {
                              completePayment("upi");
                            });
                          }}
                        />
                      </PayPalScriptProvider>

                      {/* <div className='flex m-2 mt-3 ml-2'>
                                            <GooglePayButton
                                                environment="TEST"
                                                paymentRequest={{
                                                    apiVersion: 2,
                                                    apiVersionMinor: 0,
                                                    allowedPaymentMethods: [
                                                        {
                                                            type: 'CARD',
                                                            parameters: {
                                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                            },
                                                            tokenizationSpecification: {
                                                                type: 'PAYMENT_GATEWAY',
                                                                parameters: {
                                                                    gateway: 'example',
                                                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                },
                                                            },
                                                        },
                                                    ],
                                                    merchantInfo: {
                                                        merchantId: '12345678901234567890',
                                                        merchantName: 'Demo Merchant',
                                                    },
                                                    transactionInfo: {
                                                        totalPriceStatus: 'FINAL',
                                                        totalPriceLabel: 'Total',
                                                        totalPrice: '1',
                                                        currencyCode: 'USD',
                                                        countryCode: 'US',
                                                    },
                                                    shippingAddressRequired: true,
                                                    callbackIntents: ['PAYMENT_AUTHORIZATION']
                                                }
                                                }
                                                onLoadPaymentData={paymentRequest => {
                                                    console.log('load payment data', paymentRequest);
                                                }}
                                                onPaymentAuthorized={paymentData => {
                                                    console.log('success ', paymentData);
                                                    return { transactionState: 'success' }
                                                }}
                                                existingPaymentMethodRequired='false'
                                                buttonColor='whigt'
                                                buttonType='Buy'
                                                buttonSizeMode='static'
                                            /> */}

                      {/* </div> */}
                    </div>
                    {/* <div className='w-4/12 p-3  mt-4 flex'> */}
                    {/* <div>
                                            <div className='h-20 w-0 -mt-6 border-2'>

                                            </div>
                                            <h1 className='text-xl -ml-2'>or</h1>
                                            <div className='h-20 w-0  border-2'>

                                            </div>
                                        </div> */}
                    {/* <div className=''>
                                            <h1 className='text-lg ml-2'>Scan QR code</h1>
                                            <img src={scan} alt="" className='w-28 h-28 ml-3 opacity-50' />
                                        </div> */}

                    {/* </div> */}
                    {/* <div>

                                    </div> */}
                  </div>
                </div>
              )}
              {creditCard && (
                <div className="h-72 w-full  border-b-2 justify-center">
                  <div className="flex justify-between">
                    <div className="p-4">
                      <h1 className="text-xl font-bold">Enter Card Details</h1>
                      <p>Amount: ₹{state.amount}.0</p>
                    </div>
                  </div>
                  <div className="justify-center">
                    <div className="flex">
                      {/* <div className='flex m-2 w-8/12 mt-3'>
                                            <div className=''>

                                                <input type="text" className='w-11/12 h-12 m-3 border-2 ' />
                                                <div className='flex justify-between m-3  '>
                                                    <input type="text" className='w-7/12 h-12  border-2 ' />
                                                    <input type="text" className='w-4/12  h-12  border-2  ' />

                                                </div>
                                            </div>
                                            <div>

                                            </div>

                                        </div> */}
                      {/* <div className='w-4/12 p-3  mt-4 flex'>
                                            <div>
                                                <div className='h-20 w-0 -mt-6 border-2'>

                                                </div>
                                                <h1 className='text-xl -ml-2'>or</h1>
                                                <div className='h-20 w-0  border-2'>

                                                </div>
                                            </div>
                                            <div className=''>
                                                <h1 className='text-lg ml-2'>Scan QR code</h1>
                                                <img src={scan} alt="" className='w-28 h-28 ml-3 opacity-50' />
                                            </div>

                                        </div> */}
                    </div>
                    <div></div>
                    {/* <div className=' flex justify-end'>
                                        <button className='p-4 bg-slate-400  mr-3 rounded-xl mt-5'>Pay ₹14470.0</button>
                                    </div> */}
                  </div>
                </div>
              )}
              {/* {wallet && (
                <div className="h-72 w-full  border-b-2 justify-center">
                  <div className="flex justify-between">
                    <div className="p-4">
                      <h1 className="text-xl font-bold">Mobile Wallet</h1>
                      <p>Amount: ₹{state.amount}.0</p>
                    </div>
                  </div>
                  <div className="justify-center">
                    <div className="flex">
                      <div className="flex m-2 w-8/12 mt-3">
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVUlEQVR4nO2WT2sTQRTAn39Aa3cqLWgRwZNHP4OF0swE
                                  2mtP6ueoFwnevKoglCqdieAhztSrNz+EIvWiFMS02plGbGyb1kRms5udnewmEdlA4f1gCHk7u/N+M292FgBBEARBEARBEGTcKHMHpP4Cpw6lb4HST0Hqdtj+l4DxLcJEx20B4/uEio2JRX7d6bfr9fkcUF6B5dq56Pqvblw0nHu6MSqaYUCabVCm09ek
                                  +RnJfY9iDVB6BZTZCmPSrEGtcROk3gClNSjzAV6bu/Eg+75AL0nK38bJECYOsvuI+9H1Xsy5Jx2TppkpoEz3et61UFK3M8TvgZ2dPAHCRAvm1i+GyVD+LUfy08gCytQHr4Dp/GPbtIn9dgeZLFWvphIsv7jilx1h64u9PlQc
                                  jiwQ4898TFrqdthSCe/Ng9otJf91K1Ua3ad0zrgDz5aqk1B+fCFg/Amh/Ef/KvB2IQIxbunEJAInYGcwtQLzr2ZTyVUqZwkTj/LLrF9gpvxyCpZrE4ULSH1sS+goNzkq
                                  6mFyVHwdKkBFfcBeKlCAidaAgZ9lze70wuplX8C+UscuoMI9wI/7zwGxRyh/fm1p9ZIvED/DF7ClFlC+Ys+HMQoc2RI6yRzEwd3odvazVsBnekHccM6KZoEC4s9wAb49bA9Y
                                  AspNTp/3hQhIfWiTaw8TCCivjiLgvtG8knxQzAqYAwiY0HHd5wlM0bUZwvgb99BL3lS8lgg450Qowz8Sxh/C3LvzqQfak9c9gWOk3olmdieJRd9P9tfvZ7+VEARBEARBEARB4JT
                                  yF2J2zO+85cc7AAAAAElFTkSuQmCC"
                          alt=""
                          className="w-20 h-20 m-5"
                        />
                      </div> */}
                      {/* <div className='w-4/12 p-3  mt-4 flex'> */}
                      {/* <div>
                                                <div className='h-20 w-0 -mt-6 border-2'>

                                                </div>
                                                <h1 className='text-xl -ml-2'>or</h1>
                                                <div className='h-20 w-0  border-2'>

                                                </div>
                                            </div> */}
                      {/* <div className=''>
                                                <h1 className='text-lg ml-2'>Scan QR code</h1>
                                                <img src={scan} alt="" className='w-28 h-28 ml-3 opacity-50' />
                                            </div> */}

                      {/* </div> */}
                    {/* </div>
                    <div></div>
                    <div className=" flex justify-end">
                      <button className="p-4 bg-slate-400  mr-3 rounded-xl mt-5">
                        Pay ₹{state.amount}.0
                      </button>
                    </div>
                  </div>
                </div>
              )} */}

              <div className="h-20 w-full shadow-md mt-2 rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="w-2/6  ml-6 -mt-14 hidden lg:block  ">
          <h1 className=" text-2xl font-semibold m-2 ">Booking Details</h1>
          <div className="w-96 h-80 bg-white rounded-xl  border-2 shadow-xl border-yellow-300">
            <div className="h-full w-full ">
              <div className="w-full h-28 bg-yellow-200 rounded-xl flex justify-between">
                <div className=" p-3">
                  <h1 className="text-lg font-semibold">
                    Tata Tiago MT Petrol
                  </h1>
                  <p className="sm">Manual , petrol</p>
                </div>
                <div>
                  <img src={car} alt="" className="w-28 h-24" />
                </div>
              </div>
              <div className="flex m-5 mt-6 pl-3">
                <div className="w-2 h-2 rounded-full  bg-green-700"></div>
                <div className="ml-3 -mt-3">
                  <h1>
                    {moment(date).format("DD MMM, YYYY")},
                    {moment(date).format("h:mm A")}
                  </h1>
                </div>
              </div>
              <div className="flex m-5 mt-5 pl-3 ">
                <div className="w-2 h-2 mt-2 bg-red-700"></div>
                <div className="pl-3">
                  <h1>
                    {moment(endDate).format("DD MMM, YYYY")},
                    {moment(endDate).format("h:mm A")}
                  </h1>
                </div>
              </div>

              <div className=" w-11/12 ml-3 h-10 rounded-lg bg-yellow-300 ">
                <h1 className="text-sm p-3">
                  Free cancellation up to{" "}
                  {cancelDate.format("YYYY-MM-DD HH:mm:ss")} +0530
                </h1>
              </div>
              <div className="w-full h-full flex justify-between p-4">
                <h1 className="texxt-lg font-semibold ">Final fare</h1>
                <h1 className="font-bold">₹{state.amount}.0</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CheckoutScreen;

import React, { useEffect, useState } from "react";
import AdminSidebar from "../../COMPONENTS/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { getAccountdetails } from "../../API/SERVICES/paymentForOrder";
import { useSelector } from "react-redux";
import GooglePayButton from "@google-pay/button-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import { paymentComplete } from "../../API/SERVICES/paymentForOrder";
import { message } from "antd";
import AdminNavbar from "../../COMPONENTS/AdminNavbar";

function ViewAndPayScreen() {
    const { userId } = useParams();
    // const { token } = useSelector((state) => state.adminSlice);
    const [account, setAccount] = useState("");
    const { state } = useLocation();
    const [open, setOPen] = useState(false);
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAccountdetails(userId).then((res) => {
            if (res.status === 201) {
                setAccount(res.data.account);
                setAmount(res.data.amount);
            }
        });
    }, []);

    const completePayment = async () => {
        const res = await paymentComplete(state.orderId);

        if (res.status === 201) {
            message.success("payment complete").then((res) => {
                navigate("/PaymentPage");
            });
        } else {
            message.error("somthing wrong");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <div className="w-full">
                    <form className="max-w-md mx-auto mt-7">
                        <div className="text-xl border-b-4 border-yellow-300">
                            <h1>Amount : {state.amount}</h1>
                        </div>
                        <div className="mb-4 mt-10">
                            <label htmlFor="accountNumber" className="block font-medium text-gray-700">
                                Account Number
                            </label>
                            <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-yellow-300">
                                <input
                                    type="text"
                                    id="accountNumber"
                                    placeholder={account.accountNumber}
                                    className={` w-full sm:text-sm rounded-md   h-[36px]
            }`}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="accountName" className="block font-medium text-gray-700">
                                Branch
                            </label>
                            <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-yellow-300">
                                <input
                                    type="text"
                                    id="accountName"
                                    placeholder={account.branch}
                                    className={` w-full sm:text-sm rounded-md   h-[36px] 
            }`}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="accountName" className="block font-medium text-gray-700">
                                Ifsc Code
                            </label>
                            <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-yellow-300">
                                <input
                                    type="text"
                                    id="ifseCode"
                                    name="ifseCode"
                                    placeholder={account.ifscCode}
                                    className={` w-full sm:text-sm rounded-md   h-[36px] 
            }`}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="accountName" className="block font-medium text-gray-700">
                                Account Holder
                            </label>
                            <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-yellow-300">
                                <input
                                    type="text"
                                    id="holderName"
                                    name="holderName"
                                    placeholder={account.accoundHolder}
                                    className={` w-full sm:text-sm rounded-md   h-[36px] 
            }`}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <button
                                type="submit"
                                className="bg-green-600 rounded-md p-2 text-white m-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOPen(true);
                                }}
                            >
                                Proceed to pay
                            </button>
                        </div>
                        {open && (
                            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIEND_ID }}>
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
                                        console.log(data);

                                        console.log(actions);

                                        return actions.order.capture().then((res) => {
                                            completePayment();
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewAndPayScreen;

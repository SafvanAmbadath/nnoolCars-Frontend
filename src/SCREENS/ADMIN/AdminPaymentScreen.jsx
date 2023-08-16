
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../COMPONENTS/AdminSidebar";
import { compliteOrderForPayment } from "../../API/SERVICES/paymentForOrder";
import { useSelector } from "react-redux";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
import AdminNavbar from "../../COMPONENTS/AdminNavbar";

function PaymentScreen() {
    const [hostData, sethostData] = useState([]);
    const navigate = useNavigate();

    // const { token } = useSelector((state) => state.adminSlice);

    useEffect(() => {
        compliteOrderForPayment().then((res) => {
            if (res.status === 201) {
                sethostData(res.data.orders);
                console.log(res.data.orders);
            } else {
            }
        });
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />

                <div className=" p-10 h-full items-center w-full">
                    <h1 className="text-xl mb-2">Payment</h1>
                    <div className="flex">
                        {/* <button className={`${hostData[0]?.status === 'pending' && 'border-b-4 border-yellow-600'} pl-3 pr-3 text-lg `} value={'pending'} onClick={approveAndDenile}>Pending</button>
                                <button className={`${hostData[0]?.status === 'Approved' && 'border-b-4 border-green-700'} border-b-4 pl-3 pr-3 text-lg `}value={'Approved'} onClick={approveAndDenile}>Approve</button>
                                <button className={`${hostData[0]?.status === 'Denial' && 'border-b-4 border-red-600'} border-b-4 pl-3 pr-3 text-lg `} value={'Denial'} onClick={approveAndDenile}>Denial</button> */}
                    </div>
                    <div className="overflow-auto rounded-lg shadow hidden sm:block">
                        <table className="w-full">
                            <thead className="bg-yellow-100 border-b-2 border-yellow-300">
                                <tr className="">
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">NO.</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Staus</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Data</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hostData.map((data, index) => (
                                    <tr>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                                        {data.orderStatus==="Paid"?
                                        (<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a>Payment completed</a>

                                        </td>):
                                        (<td
                                        className="p-3 text-sm text-gray-700 whitespace-nowrap"
                                        onClick={() =>
                                            navigate(`/viewAndpay/${data.carData}`, {
                                                state: { amount: data.amount, orderId: data?._id },
                                            })
                                        }
                                    >
                                        <button className="font-bold text-blue-500 hover:underline text-lg">
                                            view and pay
                                        </button>
                                    </td>)
                                        }
                                        
                                        {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carData={hostData[count]}  token={token} /> */}
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className={`p-1.5 text-xs font-medium uppercase tracking-wider
                                        'text-green-800 bg-green-200'  rounded-lg bg-opacity-50`}
                                            >
                                                {data.orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {moment(data.createdAt).format("DD,MM,YYYY , h : mm A")}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="sm:hidden grid grid-cols-4 gap-x-4">
                        <div className=" bg-white p-4 rounded-lg shadow">
                            <div className=" flex items-center space-x-2 text-sm">
                                <div>NO.</div>
                                <div>
                                    <button className=" text-blue-500 font-bold hover:underline ">view</button>
                                </div>
                                <div>
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                        approved
                                    </span>
                                </div>
                                <div className="text-gray-500">Data</div>
                                <div className="text-gray-700">Car number</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentScreen;

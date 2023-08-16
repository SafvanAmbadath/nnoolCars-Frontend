
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrder } from "../../API/SERVICES/bookingCar";
import moment from "moment";
import AdminSidebar from "../../COMPONENTS/AdminSidebar";
import AdminNavbar from "../../COMPONENTS/AdminNavbar";

function OrderVerifyAd() {
    const [order, setorder] = useState([]);

    const { token } = useSelector((state) => state.adminSlice);
    useEffect(() => {
        getOrder(token).then((res) => {
            setorder(res.data);
        });
    }, []);
    return (
        <>
            <AdminNavbar />
            <div className="flex">
                <AdminSidebar />
                <div className=" p-10 h-full w-full items-center">
                    <h1 className="text-xl mb-2">Order Details</h1>
                    <div className="flex">
                        {/* <button className={` 'border-b-4 border-yellow-600' pl-3 pr-3 text-lg `} value={'pending'} >Pending</button>
                                <button className={` 'border-b-4 border-green-700' border-b-4 pl-3 pr-3 text-lg `}value={'Approved'} >Approve</button>
                                <button className={` 'border-b-4 border-red-600' border-b-4 pl-3 pr-3 text-lg `} value={'Denial'} >Denial</button> */}
                    </div>
                    <div className="overflow-auto rounded-lg shadow hidden sm:block">
                        <table className="w-full">
                            <thead className="bg-yellow-100 border-b-2 border-yellow-300">
                                <tr className="">
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">NO.</th>
                                    {/* <th className='p-3 text-sm font-semibold tracking-wide text-left'>Details</th> */}
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Start Date&time</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">end Date&time</th>

                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">ProtectionPackage</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map((data, index) => (
                                    <tr>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                                        {/* <td className='p-3 text-sm text-gray-700 whitespace-nowrap' ><button className='font-bold text-blue-500 hover:underline'  >view and approve</button></td> */}
                                        {/* <ViewApprove open={isOpen} setOpen={setIsOpen} carData={hostData[count]}  token={token} /> */}
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span
                                                className={`${
                                                    data.orderStatus === "complete Payment" && "text-green-800 bg-green-200"
                                                }p-1.5 text-xs font-medium uppercase tracking-wider
                                          rounded-lg bg-opacity-50 ${
                                              data.orderStatus === "complete" && "text-blue-800 bg-blue-200"
                                          } ${data.orderStatus === "pending" && "text-red-800 bg-red-200"} ${
                                                    data.orderStatus === "cancel" && "text-orange-800 bg-orange-200"
                                                }`}
                                            >
                                                {data.orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                                            {moment(data.startDate).format("DD / MMM / YYYY")}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {moment(data.endDate).format("DD / MMM / YYYY")}
                                        </td>

                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {data.protectionPackage}
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
        </>
    );
}

export default OrderVerifyAd;

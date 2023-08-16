import React from "react";
import AdminNavbar from "../../COMPONENTS/AdminNavbar";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { message } from "antd";
import AdminSidebar from "../../COMPONENTS/AdminSidebar";
import { getUsersList,postBlockUser,postUnblockUser } from "../../API/SERVICES/userManagement";

function AdminHomeScreen() {
    const [users, setUsers] = useState([]);
    const [render, setRender] = useState(false);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const gettingUsers = async () => {
            // const url = "http://localhost:4000/api/admin/getUserDetails";
            // const headers = { Authorization: `Bearer ${token}` };

            await getUsersList().then((res) => {
                // console.log(res);

                if (res.status === 201) {
                    setUsers(res.data.users);
                }
            });
        };
        gettingUsers();
    }, [render]);

    const handleBlock = async (id, access) => {
        try {
            if (access) {
                // console.log("api calling for blocking user");
                // const url = `http://localhost:4000/api/admin/blockUser/${id}`;
                // const headers = { Authorization: `Bearer ${token}` };

                const res = await postBlockUser(id);
                // console.log(res);

                if (res.status === 200) {
                    message.success("successfully blocked").then((res) => {
                        setRender(!render);
                    });
                }
            } else {
                // console.log("unblocking user");
                // const url = `http://localhost:4000/api/admin/unblockUser/${id}`;
                // const headers = { Authorization: `Bearer ${token}` };

                const res = await postUnblockUser(id);

                if (res.status === 200) {
                    message.success("successfully unblocked").then((res) => {
                        setRender(!render);
                    });
                }
            }
        } catch {}
    };

    

    return (
        <>
            <AdminNavbar />
            <div className="flex">
       <AdminSidebar />
                
                <div className="w-full">
                    <div className="overflow-auto rounded-lg shadow hidden sm:block m-5">
                        <table className="w-full">
                            <thead className="bg-yellow-100 border-b-2 border-yellow-300">
                                <tr className="">
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">NO.</th>

                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">email</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">number</th>

                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Block</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((data, index) => (
                                    <tr>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>

                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data?.email}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data?.phoneNumber}</td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{data?.firstName}</td>
                                        <button
                                            className={`p-1 m-2 text-xl ${
                                                data.access
                                                    ? "bg-red-600 hover:bg-red-800"
                                                    : "bg-green-600 hover:bg-green-800"
                                            }  rounded-xl text-white `}
                                            onClick={() => handleBlock(data._id, data.access)}
                                        >
                                            {`${data.access ? "block" : "UnBlock"}`}
                                        </button>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {users.map((data, index) => (
                        <div className="sm:hidden grid w-96 gap-14 ">
                            <div className=" bg-white p-4 rounded-lg shadow">
                                <div className="  items-center space-x-2 text-sm">
                                    <div>NO. : {index + 1}</div>

                                    <div className="text-gray-500 pt-3">Email : {data.name} </div>

                                    <div className="text-gray-500 pt-3">Email : {data.email} </div>
                                    <div className="text-gray-700 pt-3 ">Number :{data.number}</div>
                                    <button className="p-1 m-2 text- bg-red-600 rounded-xl text-white hover:bg-red-800">
                                        block
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AdminHomeScreen;

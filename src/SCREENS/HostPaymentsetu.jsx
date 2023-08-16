import RentNavbar from "../COMPONENTS/RentNavbar";
import React, { useEffect, useState } from "react";
// import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { GiBurningForest } from "react-icons/gi";
import { postAccountDetails, findAccount } from "../API/SERVICES/hostVerify";
import { getAccountdetails } from "../API/SERVICES/paymentForOrder";
import { checkAcc } from "../API/SERVICES/paymentForOrder";
import { useSelector } from 'react-redux';

import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../COMPONENTS/Loader/loader";

function HostPaymentsetu() {
  
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [loader, setLoader] = useState(false);
    const [branch, setBranch] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [accoundHolder, setAccoundHolder] = useState("");
    const [errors, setErrors] = useState({});
    const [oldAccount, setOldAccounnt] = useState(false);
    const [oldAcvalue, setOldAcvalue] = useState(false);
    const {id,token} = useSelector((state)=>state.userSlice)
    // const token = localStorage.getItem("token");
    // const id = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        
        checkAcc(id).then((res) => {
            console.log(res);
            if (res.status === 201) {
                
                setOldAcvalue(res.data.account);
            } else {
            }
        });
    }, [oldAccount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // validate form inputs
        const errors = {};

        if (!accountNumber) {
            errors.accountNumber = "Account number is required";
        } else if (!/^\d+$/.test(accountNumber)) {
            errors.accountNumber = "Account number should contain only digits";
        }
        if (!branch) {
            errors.branch = "Branch is required";
        }
        if (!ifscCode) {
            errors.ifscCode = "IFSC code is required";
        }
        if (!accoundHolder) {
            errors.accoundHolder = "IFSC code is required";
        }

        setErrors(errors);

        // submit form data if no errors
        if (Object.keys(errors).length === 0) {
            // TODO: submit form data to server

            const res = await postAccountDetails(id,accountNumber, branch, ifscCode, accoundHolder);

            setOldAcvalue(res.data.newAccount.bankAccount);
            setOldAccounnt(true);
        }
    };
    console.log(oldAcvalue, "fdsgdfgdfg");

    const renderIcon = (name) => {
        if (
            !errors[name] &&
            (name === "accountName"
                ? accountName
                : name === "accountNumber"
                ? accountNumber
                : name === "branch"
                ? branch
                : ifscCode)
        ) {
            return (
                // <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            );
        } else if (errors[name]) {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            );
        }
        return null;
    };
    return (
        <div className="w-screen h-screen">
            <RentNavbar />

            <div className="max-w-md mx-auto mt-7  justify-center ">
                <AiOutlineArrowLeft
                    className="ml-5 text-2xl "
                    onClick={() => {
                        navigate("/hostVerify");
                    }}
                />

                <div className="flex max-w-md mx-auto mt-7  justify-center">
                    <button
                        className={`p-3  ${oldAccount ? "bg-gray-500" : "bg-yellow-600 text-black"} text-white`}
                        onClick={() => setOldAccounnt(false)}
                    >
                        Add new account
                    </button>
                    <button
                        className={`${oldAccount ? "bg-yellow-600" : "bg-gray-500 text-black"} p-2  text-white`}
                        onClick={() => setOldAccounnt(true)}
                    >
                        Old account
                    </button>
                </div>
            </div>

            {oldAccount ? (
                <>
                    <div className="max-w-md mx-auto mt-7">
                        <h1 className="text-2xl text-black m-3"></h1>

                        <div className="flex justify-between m-2 text-lg mt-4">
                            <h1>Account number</h1>
                            <h1>{oldAcvalue?.accountNumber}</h1>
                        </div>
                        <hr className="mt-3" />
                        <div className="flex justify-between m-2 text-lg mt-4">
                            <h1>Account Holder</h1>
                            <h1>{oldAcvalue?.accoundHolder}</h1>
                        </div>
                        <hr className="mt-3" />
                        <div className="flex justify-between m-2 text-lg mt-4"></div>

                        <hr className="mt-3" />
                        <div className="text-center mt-2 "></div>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-7">
                    <div className="mb-4">
                        <label htmlFor="accountNumber" className="block font-medium text-gray-700">
                            Account Number
                        </label>
                        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
                            <input
                                type="text"
                                id="accountNumber"
                                placeholder="Enter AccountNumber"
                                className={` w-full sm:text-sm rounded-md   h-[36px] ${
                                    errors.accountNumber ? "border-red-500" : ""
                                }`}
                                value={accountNumber}
                                onChange={(event) => setAccountNumber(event.target.value)}
                            />
                            {renderIcon("accountNumber")}
                        </div>
                        {errors.accountNumber && (
                            <p className="mt-2 text-sm text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-red-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {errors.accountNumber}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="accountName" className="block font-medium text-gray-700">
                            Branch
                        </label>
                        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
                            <input
                                type="text"
                                id="accountName"
                                placeholder="Enter AccountName"
                                className={` w-full sm:text-sm rounded-md   h-[36px] ${
                                    errors.branch ? "border-red-500" : ""
                                }`}
                                value={branch}
                                onChange={(event) => setBranch(event.target.value)}
                            />
                            {renderIcon("branch")}
                        </div>
                        {errors.branch && (
                            <p className="mt-2 text-sm text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-red-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {errors.branch}
                            </p>
                        )}
                    </div>
                    {/* <div className="mb-4">
        <label htmlFor="accountName" className="block font-medium text-gray-700">
          Account Phone Number
        </label>
        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
          <input
            type="text"
            id="accountName"
            placeholder="Enter AccountName"
            className={` w-full sm:text-sm rounded-md   h-[36px] ${
              errors.accountName ? 'border-red-500' : ''
            }`}
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
          
          />
            {renderIcon('accountName')}
          
        </div>
        {errors.accountName && (
          <p className="mt-2 text-sm text-red-500">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            {errors.accountName}
          </p>
        )}
      </div> */}

                    <div className="mb-4">
                        <label htmlFor="accountName" className="block font-medium text-gray-700">
                            Ifsc Code
                        </label>
                        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
                            <input
                                type="text"
                                id="ifseCode"
                                name="ifseCode"
                                placeholder="Enter AccountName"
                                className={` w-full sm:text-sm rounded-md   h-[36px] ${
                                    errors.ifscCode ? "border-red-500" : ""
                                }`}
                                value={ifscCode}
                                onChange={(event) => setIfscCode(event.target.value)}
                            />
                            {renderIcon("ifscCode")}
                        </div>
                        {errors.ifscCode && (
                            <p className="mt-2 text-sm text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-red-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {errors.ifscCode}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="accountName" className="block font-medium text-gray-700">
                            Account Holder
                        </label>
                        <div className=" flex flex-row mt-1 relative rounded-md shadow-sm   h-10 border border-gray-250">
                            <input
                                type="text"
                                id="holderName"
                                name="holderName"
                                placeholder="Enter AccountName"
                                className={` w-full sm:text-sm rounded-md   h-[36px] ${
                                    errors.accoundHolder ? "border-red-500" : ""
                                }`}
                                value={accoundHolder}
                                onChange={(event) => setAccoundHolder(event.target.value)}
                            />
                            {renderIcon("accoundHolder")}
                        </div>
                        {errors.accoundHolder && (
                            <p className="mt-2 text-sm text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-red-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {errors.accoundHolder}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <button type="submit" className="bg-yellow-500 rounded-md p-2 text-white">
                            Submit
                        </button>
                    </div>
                </form>
            )}
            {loader ? <Loader loader={loader} /> : null}
        </div>
    );
}

export default HostPaymentsetu;

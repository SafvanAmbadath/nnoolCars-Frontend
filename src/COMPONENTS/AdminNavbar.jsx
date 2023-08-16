import React from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate=useNavigate()

  
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-black">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap  text-yellow-500">
            nnoolCars
          </span>

          <div className="flex items-center">
            <a 
              // onClick={()=>navigate('/rent/form')}
              href="tel:5541251234"
              className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline"
            ></a>
            <a
              href="#"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            ></a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-yellow-600">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          {/* <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Company
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:underline"
              >
                Features
              </a>
            </li>
          </ul>
        </div> */}
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
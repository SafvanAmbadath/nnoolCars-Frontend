// import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectAdminRouter from "./UTILITIES/ProtectAdminRoutes";
import ProtectUserRouter from "./UTILITIES/ProtectUserRoutes";

import Landing from "./SCREENS/LandingScreen";
import Login from "./SCREENS/Login";
import HomeScreen from "./SCREENS/HomeScreen";
import EmailVerify from "./COMPONENTS/EmailVerify/EmailVerify";
import RentLandingScreen from "./SCREENS/RentLandingScreen";
import AdminUsers from "./SCREENS/ADMIN/AdminUsers.jsx";
import ProofDetails from "./SCREENS/ProofDetails";
import HostVerifyScreen from "./SCREENS/HostVerifyScreen";
import HostPaymentsetu from "./SCREENS/HostPaymentsetu";
import CarDetailsScreen from "./SCREENS/CarDetailScreen";
import CheckoutScreen from "./SCREENS/CheckoutScreen";
import OrderVerify from "./SCREENS/OrderVerify";
import OrdersListScreen from "./SCREENS/OrderListScreen";
import UploadproofScreen from "./SCREENS/UploadProofScreen";
import ExpandCheckout from "./SCREENS/ExpandCheckout";
import HostCarListScreen from "./SCREENS/HostCarListScreen";
import ChatScreen from "./SCREENS/ChatScreen";

import AdminLogin from "./SCREENS/ADMIN/AdminLogin";
import AdminCars from "./SCREENS/ADMIN/AdminCars";
import AddLocation from "./SCREENS/ADMIN/AdminLocations";
import PaymentScreen from "./SCREENS/ADMIN/AdminPaymentScreen";
import ViewAndPayScreen from "./SCREENS/ADMIN/AdminPaymentView";
import OrderVerifyAd from "./SCREENS/ADMIN/AdminOrderVerify";
import AdminHomeScreen from "./SCREENS/ADMIN/AdminDashboard";

function AnimateRouters() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
                <Route path="/carDetails/:carData" element={<CarDetailsScreen />}></Route>

                {/* <Route path="/hostUserCarList" element={<HostCarListScreen />}></Route> */}

                <Route element={<ProtectUserRouter />}>
                    <Route path="/rent" element={<RentLandingScreen />} />
                    <Route path="/rent/form" element={<ProofDetails />} />
                    <Route path="/hostVerify" element={<HostVerifyScreen />}></Route>
                    <Route path="/bankDetail" element={<HostPaymentsetu />}></Route>
                    <Route path="/checkout/:carId" element={<CheckoutScreen />}></Route>
                    <Route path="/verifyOrder" element={<OrderVerify />}></Route>
                    <Route path="/listorderforuser" element={<OrdersListScreen />}></Route>
                    <Route path="/uploadproof" element={<UploadproofScreen />}></Route>
                    <Route path="/expandCheckout/:orderId" element={<ExpandCheckout />}></Route>
                    <Route path="/hostUserCarList" element={<HostCarListScreen />}></Route>
                    <Route path="/chat/:reciverId" element={<ChatScreen />}></Route>

                </Route>

                <Route path="/admin" element={<AdminLogin />} />

                <Route element={<ProtectAdminRouter />}>
                    <Route path="/adminhome" element={<AdminHomeScreen />}></Route>

                    <Route path="/user" element={<AdminUsers />}></Route>
                    <Route path="/Host-verify" element={<AdminCars />}></Route>
                    <Route path="/addlocation" element={<AddLocation />}></Route>
                    <Route path="/PaymentPage" element={<PaymentScreen />}></Route>
                    <Route path="/viewAndpay/:userId" element={<ViewAndPayScreen />}></Route>
                    <Route path="/orderAdminVerify" element={<OrderVerifyAd />}></Route>
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimateRouters;

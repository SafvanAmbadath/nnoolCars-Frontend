// import './App.css';
import Landing from './SCREENS/LandingScreen'
import {Routes,Route ,BrowserRouter} from 'react-router-dom'
import Login from './SCREENS/Login';
import HomeScreen from './SCREENS/HomeScreen';
import EmailVerify from './COMPONENTS/EmailVerify/EmailVerify';
import RentLandingScreen from './SCREENS/RentLandingScreen';
import AdminLogin from "./SCREENS/AdminLogin"
import AdminHomeScreen from "./SCREENS/AdminHomeScreen"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/rentLanding" element={<RentLandingScreen />} />

        <Route path='/admin' element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHomeScreen />}></Route>



        

      </Routes>
      </BrowserRouter>
       
  
    </div>
  );
}

export default App;

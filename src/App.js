
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInSide from './pages/SignIn';
import Manager from './pages/Manager';
import Staff from './pages/Staff';
import CheckOut from './pages/CheckOut';
import Home from './pages/Home';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          {localStorage.getItem('token')&& (
            <>
              {localStorage.getItem('role') && localStorage.getItem('role')=='manager' && (
                    <> 
                      <Route path='/manager' element={<Manager/>}/>
                      <Route path='/thanh-toan' element={<CheckOut/>}/>
                    </>
                      
              )}
              {localStorage.getItem('role') && localStorage.getItem('role')=='staff' && (
                      <Route path='/nhan-vien' element={<Staff/>}/>
                      ,<Route path='/nhan-vien' element={<Home/>}/>
                    )}
            </>
          )}
                  <Route path='/' element={<SignInSide/>}/>
                  <Route path='*' element={<SignInSide/>}/>
        </Routes>
     </BrowserRouter>
    </>

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInSide from "./pages/SignIn";
import Manager from "./pages/Manager";
import Staff from "./pages/Staff";
import CheckOut from "./pages/CheckOut";
import Bills from "./pages/Bills";
import PaymentSuccess from "./pages/PaymentSuccess";
import CreateBill from "./pages/CreateBill";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            {role === "manager" && (
              <>
                <Route path="/bao-cao" element={<Home />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/thanh-toan" element={<CheckOut />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/tao-bill" element={<CreateBill />} />
                <Route path="/bills/:id" element={<Bills />} />
              </>
            )}
            {role === "staff" && (
              <>
                <Route path="/nhan-vien" element={<Staff />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<SignInSide />} />
            <Route path="*" element={<SignInSide />} />
          </>
        )}
      </Routes>
    </BrowserRouter>

  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInSide from "./pages/SignIn";
import Manager from "./pages/Manager";
import Staff from "./pages/Staff";
import CheckOut from "./pages/CheckOut";
import PaymentSuccess from "./pages/PaymentSuccess";
import { Create } from "@mui/icons-material";
import CreateBill from "./pages/CreateBill";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {localStorage.getItem("token") && (
            <>
              {localStorage.getItem("role") && localStorage.getItem("role") == "manager" && (
                <>
                  <Route path="/manager" element={<Manager />} />
                  <Route path="/thanh-toan" element={<CheckOut />} />
                  <Route path="/pagementsuccess" element={<PaymentSuccess />} />
                  <Route path="/tao-bill" element={<CreateBill />} />
                </>
              )}
              {localStorage.getItem("role") && localStorage.getItem("role") == "staff" && <Route path="/nhan-vien" element={<Staff />} />}
            </>
          )}
          <Route path="/" element={<SignInSide />} />
          <Route path="*" element={<SignInSide />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

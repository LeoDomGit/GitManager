import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInSide from "./pages/SignIn";
import Manager from "./pages/Manager";
import Staff from "./pages/Staff";
import CheckOut from "./pages/CheckOut";
import Bills from "./pages/Bills";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{localStorage.getItem("token") && (
						<>
							{localStorage.getItem("role") && localStorage.getItem("role") === "manager" && (
								<>
									<Route path="/manager" element={<Manager />} />
									<Route path="/thanh-toan" element={<CheckOut />} />
									<Route path="/bills/:id" element={<Bills />} />
								</>
							)}
							{localStorage.getItem("role") && localStorage.getItem("role") === "staff" && <Route path="/nhan-vien" element={<Staff />} />}
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

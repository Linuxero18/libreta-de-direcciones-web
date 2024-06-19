import { Route, Routes}  from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import Navbar from "../Navbar";

export default function AppRouter() {
    return <>
        <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<HomePage/>} />
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>} />
                <Route path="dashboard" element={<DashboardPage/>} />
            </Route> 
        </Routes>
    </>;
}
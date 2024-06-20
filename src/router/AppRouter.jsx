import { Route, Routes}  from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import Navbar from "../Navbar";

export default function AppRouter() {
    return <>
        <Routes>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<LoginPage/>} />
                <Route path="dashboard" element={<DashboardPage/>} />
            </Route> 
        </Routes>
    </>;
}
import { Route, Routes}  from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

export default function AppRouter() {
    return <>
        <Routes>
            <Route index element={<LoginPage/>} />
            <Route path="dashboard" element={<DashboardPage/>} />
        </Routes>
    </>;
}
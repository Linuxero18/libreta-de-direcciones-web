import { Navigate, Route, Routes}  from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
    return (
        <Routes>
            <Route index element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/dashboard" element={<PrivateRoute>
                <DashboardPage/>
            </PrivateRoute>} />
            <Route path="*" element={<Navigate to={"/"}/>}/>
        </Routes>
    );
}
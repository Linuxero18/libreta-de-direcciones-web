import { Navigate, Route, Routes}  from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import React, { useState } from "react";

export default function AppRouter() {
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    return (
        <Routes>
            <Route index element={<LoginPage setEstaAutenticado={setEstaAutenticado}/>} />
            <Route path="/login" element={<LoginPage setEstaAutenticado={setEstaAutenticado}/>} />
            <Route path="/dashboard" element={<PrivateRoute estaAutenticado={estaAutenticado}>
                <DashboardPage/>
            </PrivateRoute>} />
            <Route path="*" element={<Navigate to={"/"}/>}/>
        </Routes>
    );
}
import React from 'react';
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ children, estaAutenticado}) {
  return estaAutenticado ? children : <Navigate to="/login" />;
}

import React from 'react';
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = true;
    return isAuthenticated ? children : <Navigate to="/login" />;
}

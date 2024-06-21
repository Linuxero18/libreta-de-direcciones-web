import { useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { state } = useLocation();

  return state?.logged ? children : <Navigate to='/' />
}
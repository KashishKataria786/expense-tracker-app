
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('token') || null;

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;

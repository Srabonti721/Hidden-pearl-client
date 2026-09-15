import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading, authToken } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (!user || !authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

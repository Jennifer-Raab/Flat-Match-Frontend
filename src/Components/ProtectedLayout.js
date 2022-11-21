import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = ({ isAuthenticated }) => {
  console.log(
    "ProtectedLayout:", isAuthenticated 
  )
  const location = useLocation();
  return (
    <div className="container mt-5">
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
    </div>
  );
};

export default ProtectedLayout;
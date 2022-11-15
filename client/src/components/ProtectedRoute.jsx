import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ token, children, path }) => {
  return token ? children : <Navigate to={path} />;
};

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';

const BypassRoute = ({ token, children, path }) => {
  return token ? <Navigate to={path} /> : children;
};

export default BypassRoute;

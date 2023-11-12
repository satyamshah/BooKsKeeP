import { useLocation,Navigate } from "react-router-dom";
export function RequiresAuth({ children, login }) {
    let location = useLocation();
    return login ? children : <Navigate to='/login' state={{ from: location }} />;
  }
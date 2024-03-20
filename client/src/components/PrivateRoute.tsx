import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
export const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

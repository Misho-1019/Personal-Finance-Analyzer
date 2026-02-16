import useAuth from "../../hooks/useAuth.js";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}
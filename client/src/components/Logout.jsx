import { Navigate } from "react-router-dom"
import { useLogout } from "../api/authApi"
import { useEffect } from "react"
import { showToast } from "../utils/toastUtils"

export default function Logout() {
    const { isLoggedOut } = useLogout()

    useEffect(() => {
        if (isLoggedOut) {
            showToast('You have been logged out successfully', 'success')
        }
    }, [isLoggedOut])

    return isLoggedOut 
        ? <Navigate to='/welcome' /> 
        : null
}
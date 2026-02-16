import { toast } from "react-toastify"

export const showToast = (message, type = 'success', options = {}) => {
    const defaultOptions = {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored'
    }

    const toastOptions = { ...defaultOptions, ...options }

    if (type === 'success') {
        toast.success(message, toastOptions)
    } else if (type === 'error') {
        toast.error(message, toastOptions)
    } else if (type === 'info') {
        toast.info(message, toastOptions)
    } else if (type === 'warning') {
        toast.warning(message, toastOptions)
    } else {
        toast(message, toastOptions)
    }
}
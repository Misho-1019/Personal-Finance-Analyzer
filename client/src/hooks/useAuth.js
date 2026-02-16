import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import request from "../utils/requester.js";

export default function useAuth() {
    const authData = useContext(UserContext)

    const requestWrapper = (method, url, data, options = {}) => {
        const optionsWrapper = {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
            }
        }

        return request(method, url, data, optionsWrapper)
    }

    return {
        ...authData,
        isAuthenticated: !!authData.token,
        request: {
            get: requestWrapper.bind(null, 'GET'),
            post: requestWrapper.bind(null, 'POST'),
            put: requestWrapper.bind(null, 'PUT'),
            patch: requestWrapper.bind(null, 'PATCH'),
            delete: requestWrapper.bind(null, 'DELETE'),
        }
    }
}
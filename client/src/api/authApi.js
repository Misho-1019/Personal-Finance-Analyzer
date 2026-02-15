import { useContext, useEffect, useRef, useState } from "react";
import request from "../utils/requester.js";
import { UserContext } from "../context/UserContext.js";

const baseUrl = 'http://localhost:3030/auth';

export const useLogin = () => {
    const [isPending, setIsPending] = useState(false)
    const abortRef = useRef(new AbortController())

    const login = async (email, password) => {
        setIsPending(true)

        const result = await request.post(`${baseUrl}/login`, { email, password }, { signal: abortRef.current.signal })
        setIsPending(false)

        return result;
    }

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, [])

    return { login, isPending }
}

export const useRegister = () => {
    const [isPending, setIsPending] = useState(false)
    const abortRef = useRef(new AbortController())

    const register = async (firstName, lastName, email, password) => 
        setIsPending(true) || await request.post(`${baseUrl}/register`, { firstName, lastName, email, password }, { signal: abortRef.current.signal })

    useEffect(() => {
        const abortController = abortRef.current;

        return () => abortController.abort();
    }, [])

    return { register, isPending }
}

export const useLogout = () => {
    const { token } = useContext(UserContext)

    const options = {
        headers: {
            'X-Authorization': token
        }
    }

    const logout = async () => await request.get(`${baseUrl}/logout`, null, options)

    return { logout }
}
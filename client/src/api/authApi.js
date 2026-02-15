import { useEffect, useRef, useState } from "react";
import request from "../utils/requester.js";

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
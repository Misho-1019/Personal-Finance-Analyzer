import { useState } from "react";
import request from "../utils/requester.js";

const baseUrl = 'http://localhost:3030/auth';

export const useLogin = () => {
    const [isPending, setIsPending] = useState(false)

    const login = async (email, password) => {
        setIsPending(true)

        const result = await request.post(`${baseUrl}/login`, { email, password })
        setIsPending(false)

        return result;
    }

    return { login, isPending }
}
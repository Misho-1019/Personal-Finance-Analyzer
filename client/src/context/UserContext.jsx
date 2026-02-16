import { createContext, useContext } from "react";

export const UserContext = createContext({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    token: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
})

export function useUserContext() {
    const data = useContext(UserContext)

    return data;
}
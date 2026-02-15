import { createContext } from "react";

export const UserContext = createContext({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    token: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
})
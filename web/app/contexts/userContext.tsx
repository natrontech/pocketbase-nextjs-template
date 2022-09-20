import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import Api from "../config/Api";
import { AlertType, DefaultAlert } from "../components/alerts/Alerts";

export const UserContext = createContext({});

export interface User {
    ID: number;
    Username: string;
    Name: string;
    Group: string;
}

export const useUserContext = () => {
    return useContext(UserContext);
};

type Props = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [componentLoading, setComponentLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function loadUserFromCookie() {
            const token = Cookies.get('token');
            if (token) {
                try {
                    // @ts-ignore
                    Api.defaults.headers.Authorization = 'Bearer ' + token;
                    const { data: user } = await Api.get('/auth');
                    if (user) {
                        setUser(user);
                    }
                } catch (error) {
                    logoutUser(true);
                    console.log(error);
                }
            } else {
                console.log("No token in cookie");
            }
            setLoading(false);
        }
        loadUserFromCookie();
    }, []);

    const loginUser = async (username: string, password: string, remember: boolean) => {
        const { data: data } = await Api.post('/auth', {
            username,
            password,
        });
        if (data) {
            // @ts-ignore
            Api.defaults.headers.Authorization = 'Bearer ' + data["token"];
            const { data: user} = await Api.get('/auth');
            if (user) {
                setUser(user);
                console.log("Logged in as " + user.username);
            }
        }
        Cookies.set('token', data["token"], { secure: true, expires: 1 });
        if (remember) {
            Cookies.set('username', username, { secure: true, expires: 31 });
        }
        DefaultAlert("Logged in", AlertType.Success);
    }

    const logoutUser = (noalert: boolean | null) => {
        Cookies.remove('token');
        setUser(null);
        // @ts-ignore
        delete Api.defaults.headers.Authorization;
        setUser(null);
        setError(null);
        if (!noalert) {
            DefaultAlert("Logged out", AlertType.Success);
        }
        router.push("/");
    }

    const contextValue = {
        user,
        loading,
        componentLoading,
        error,
        reload,
        setLoading,
        setComponentLoading,
        setReload,
        loginUser,
        logoutUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

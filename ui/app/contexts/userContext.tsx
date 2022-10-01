import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PocketBase, { User } from 'pocketbase';
import Cookies from 'js-cookie';
import Api from "../config/Api";
import { Toast, ToastType } from "../components/alerts/Toast";
import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

export const UserContext = createContext({});

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
    const client = new PocketBase(config.ENV_API_URL || "http://127.0.0.1:8090");

    useEffect(() => {
        async function checkAuth() {
            await client.users.refresh()
                .then((newAuthData) => {
                    setUser(newAuthData.user);
                })
                .catch((error) => {
                    throw error;
                })
        }
        checkAuth()
            .catch((error) => {
                logout(true)
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                setReload(!reload);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signInWithEmail = async (username: string, password: string) => {
        setLoading(true);

        await client.users.authViaEmail(username, password)
            .then((data) => {
                if (data) {
                    setUser(data.user);
                    Toast("Logged In", ToastType.success);
                }
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                Toast("Login Failed", ToastType.error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const logout = (noalert: boolean | null) => {
        client.authStore.clear();
        setUser(null);
        if (!noalert || noalert === null) {
            Toast("Logged out", ToastType.success);
        }
        router.push("/");
    }

    const contextValue = {
        user,
        loading,
        componentLoading,
        error,
        reload,
        client,
        setLoading,
        setComponentLoading,
        setReload,
        signInWithEmail,
        logout
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

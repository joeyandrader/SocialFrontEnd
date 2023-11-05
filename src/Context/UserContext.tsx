import { createContext, useState, useEffect } from "react";
import { User } from "../models/usuario/Usuario.interface";
import { UsuarioService } from "../services/UsuarioService";
import Cookies from 'universal-cookie'

interface AuthProviderProps {
    children: JSX.Element
}

type AuthContextData = {
    user: User | null
    signed: (email: string, password: string) => Promise<boolean>;
    loadingAuth: boolean,
    token: string
}

export const AuthContext = createContext<AuthContextData>(null!)

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)
    const [token, setToken] = useState("")
    const api = UsuarioService();

    useEffect(() => {
        const validaToken = async () => {
            const cookies = new Cookies();
            var cookieData = cookies.get("@UserAuth");
            if (cookieData) {
                var getUser = await getUserInfo(cookieData)
                setUser(getUser)
                setToken(cookieData)
                setLoadingAuth(false)
                return;
            }

            setToken("")
            setUser(null)
            setLoadingAuth(false)
        }

        return () => {
            validaToken();
        }
    }, [])

    const signed = async (email: string, password: string) => {
        var result = await api.signIn(email, password)
        if (result.success) {
            const cookies = new Cookies()
            cookies.set("@UserAuth", result.data.access_Token, { sameSite: 'strict', secure: true, path: "/" })
            setToken(result.data.access_Token)
            getUserInfo(result.data.access_Token)
            setLoadingAuth(false)
            return true;
        }
        setLoadingAuth(false)
        return false;
    }

    // pega os dados do usuario
    async function getUserInfo(token: string) {
        var result = await api.getUserInfo(token)
        if (result?.success) {
            setLoadingAuth(false)
            return result;
        } else {
            setLoadingAuth(false)
            setToken("")
            setUser(null)
            return null;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signed, loadingAuth, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
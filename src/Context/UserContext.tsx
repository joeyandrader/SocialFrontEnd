import { createContext, useState, useEffect } from "react";
import { User } from "../models/usuario/Usuario.interface";
import { UsuarioService } from "../services/UsuarioService";
import Cookies from 'universal-cookie'

interface AuthProviderProps {
    children: JSX.Element
}

type AuthContextData = {
    user?: User | null
    signed: (email: string, password: string) => Promise<boolean>;
    loadingAuth: boolean,
    token: string,
    logout: () => void
}

export const AuthContext = createContext<AuthContextData>(null!)
const cookies = new Cookies(); //cookies

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)
    const [token, setToken] = useState("")
    const api = UsuarioService();

    useEffect(() => {
        const validaToken = async () => {
            var tokenData = cookies.get("@UserAuth");
            if (tokenData) {
                var getUser = await getUserInfo(tokenData)
                setUser(getUser)
                setToken(tokenData)
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


    /**
     * Efetua metodo de login
     * @param email 
     * @param password 
     * @returns 
     */
    const signed = async (email: string, password: string) => {
        var data = await api.signIn(email, password)
        if (data) {
            var current = (new Date().getTime() + data.data.expires_in) / 1000;
            cookies.set("@UserAuth", data.data.access_Token,
                { sameSite: 'strict', secure: true, path: '/', expires: new Date(current * 1000) }
            )
            var userInfo = await getUserInfo(data.data.access_Token)
            if (userInfo) {
                setUser(userInfo)
                setToken(data.data.access_Token)
                setLoadingAuth(false)
                return true;
            }
        }
        setLoadingAuth(false)
        return false;
    }

    // pega os dados do usuario
    async function getUserInfo(token: string) {
        var result = await api.getUserInfo(token)
        if (result?.success) {
            return result;
        } else {
            return null;
        }
    }

    const logout = () => {
        cookies.remove("@UserAuth", { sameSite: 'strict', secure: true, path: '/' })
        setToken("")
        setUser(null)
        setLoadingAuth(false)
    }

    return (
        <AuthContext.Provider value={{ user, signed, loadingAuth, token, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
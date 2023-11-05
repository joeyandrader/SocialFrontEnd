import { User } from "../models/usuario/Usuario.interface";
import { api } from "./Api";

export const UsuarioService = () => ({
    signIn: async (email: string, password: string) => {
        const res = await api.post("/auth/auth", { email, password }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        })
        return res;
    },
    register: async (request: any) => {
        const res = await api.post("/usuario/create", request).then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        })
        return res;
    },
    getUserInfo: async (token: string): Promise<User | null> => {
        var result = await api.get(`/usuario/usrInfo`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        })

        return result;
    },
    GetAllPost: async (token: string) => {
        var result = await api.get('', {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            withCredentials: true
        }).then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        })
        return result;
    }
});

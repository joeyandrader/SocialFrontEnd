import { Post } from "../models/Post/Post.interface";
import { api } from "./Api";

export const PostService = () => ({
    GetAllPost: async (token: string): Promise<Post | null> => {
        var result = await api.get('/post/list', {
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
    CreatePost: async (token: string, request: any) => {
        var result = await api.post('/post/create', request, {
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
    UploadPhoto: async (token: string, idPost: string, file: FormData) => {
        var result = await api.post(`/photo/create/${idPost}`, file, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
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

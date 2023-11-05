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
    }
});

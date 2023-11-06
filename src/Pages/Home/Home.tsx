import { useContext, useEffect, useState } from "react"
import { PostService } from "../../services/PostService"
import { AuthContext } from "../../Context/UserContext"
import { Post } from "../../models/Post/Post.interface"
import Posts from "../../Components/Post/Post"
import ModalPost from "../../Components/ModalPost/ModalPost"

const Home = () => {
    const { token } = useContext(AuthContext)
    const api = PostService();
    const [postList, setPostList] = useState<Post | null>(null)

    useEffect(() => {
        const getAllPost = async () => {
            try {
                await api.GetAllPost(token).then((res) => {
                    setPostList(res)
                }).catch((err) => {
                    console.log(err)
                });
            } catch (error) {
                console.log(error)
            }
        }
        return () => {
            getAllPost()
        }
    }, [])

    return (
        <>
            <div className={`container m-auto max-w-4xl p-3 absolute right-0 left-0 top-24 -z-10`}>
                <div className='rounded-md w-full'>
                    {postList && postList.data?.map((item) => (
                        <Posts key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
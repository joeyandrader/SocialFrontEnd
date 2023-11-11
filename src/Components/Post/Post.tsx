import { Link } from 'react-router-dom'
import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai'
import { RiUserFollowLine } from 'react-icons/ri'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { Comentarios, Like, PostagemDados } from '../../models/Post/Post.interface'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../Context/UserContext'
import ImageProfile from '../ImageProfile/ImageProfile'
import { PostService } from '../../services/PostService'
import Comments from '../Comments/Comments'



const Post = ({ id, fotos, text, updateAt, usuarioId, createdAt, title, usuario, comentario, like }: PostagemDados) => {
    const { user, token } = useContext(AuthContext)
    const [openComments, setOpenComments] = useState<boolean>(false)
    const [expandirConteudo, setExpandirConteudo] = useState(false);
    const [commentText, setCommentText] = useState<string>("");
    const [post, setPost] = useState<PostagemDados>({ id, fotos, text, updateAt, usuario, createdAt, title, usuarioId, comentario, like });

    //Api
    const apiPost = PostService();

    const handleOpenComments = () => {
        setOpenComments(open => !open)
    }

    const handleLike = async () => {
        const objLike: Like = {
            postId: post.id,
            usuarioId: user?.data.id,
            createdAt: new Date()
        }
        await PostService().LikePost(token, objLike).then(async (res) => {
            await PostService().GetPost(token, res.data.postId).then((res) => {
                setPost({ ...post, like: res.data.like })
            })
        })
    }

    const handlComments = async () => {
        if (commentText != "") {
            const obj: Comentarios = {
                postId: post.id,
                texto: commentText,
                usuarioId: user?.data.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await apiPost.CreateComments(token, obj).then(async (res) => {
                await PostService().GetPost(token, res.data.postId).then((resPost) => {
                    setCommentText("");
                    setPost({ ...post, comentario: resPost.data.comentario })
                })
            })
        }
    }

    return (
        <>
            <div className='md:w-3/4 m-auto bg-slate-900 p-3 rounded-md text-white mb-4 shadow-md shadow-slate-950'>
                <div className='w-full bg-slate-800 p-2 mb-4 flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <ImageProfile imageUrl={usuario?.imageUrl} user={usuario} width="10" height="10" />
                        <p><Link to="#">{usuario?.firstName} {usuario?.lastName.split(" ")[0]}</Link></p>
                    </div>
                    <div>
                        {/* Verifica se o Id da postagem é igual a do us */}
                        {user && user.data?.id == post.usuarioId ? (
                            <>
                                <div className='group relative inline-block'>
                                    <Link to="" data-popover-target="popover-bottom" data-popover-placement="bottom" className='flex justify-center items-center gap-2 hover:text-red-500 duration-300 transition-colors'><BiSolidTrashAlt size={20} /></Link>
                                    <span className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-slate-950 text-red-900 p-2 rounded-md absolute bottom-full -left-5 mt-2'>Delete</span>
                                </div>
                            </>
                        ) : (<Link to="" className='flex justify-center items-center gap-2'><RiUserFollowLine size={20} /> Seguir</Link>)}

                    </div>
                </div>
                {fotos && fotos.length == 0 ? (
                    <></>
                ) : (
                    <>
                        <div className='sua-classe relative'>
                            <div className='flex flex-col gap-1 justify-center items-center mb-3'>
                                {post.fotos?.map((items, index) => (
                                    // Renderize apenas os elementos até um certo limite, por exemplo, 5 elementos.
                                    index < 2 ? (
                                        <img src={`https://localhost:7292/public/img/${items?.urlPhoto}`} alt={`Foto da postagem: ${post.title}`} key={items.id} className='w-full h-full object-cover' />
                                    ) : null
                                ))}
                            </div>
                            {fotos && fotos?.length > 2 && !expandirConteudo && (
                                <div className='absolute inset-x-0 bottom-0 flex flex-col items-center'>
                                    <div className='bg-gradient-to-t from-white via-white to-transparent w-full h-16'></div>
                                    <button onClick={() => setExpandirConteudo(true)} className='bg-slate-900 text-white px-4 py-2 rounded-md transition-opacity hover:opacity-75 -mt-16'>Ver mais</button>
                                </div>
                            )}
                            {expandirConteudo && (
                                <div className='flex flex-col gap-1 justify-center items-center mb-3'>
                                    {fotos && fotos.slice(2).map((items) => (
                                        <img src={`https://localhost:7292/public/img/${items?.urlPhoto}`} alt={`Foto da postagem: ${post.title}`} key={items.id} className='w-full' />
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* <div className='flex flex-col gap-1 justify-center items-center mb-3'>
                            {fotos?.map((items, index) => (
                                <img src={`https://localhost:7292/public/img/${items?.urlPhoto}`} alt={`Foto da postagem: ${title}`} key={items.id} className='w-full' />
                            ))}
                        </div> */}
                    </>
                )
                }

                <div className='w-full bg-slate-950 p-2 rounded-md'>
                    {
                        title && title != "" ?
                            (<h1 className='mb-3 text-2xl font-semibold text-slate-300'>{title}</h1>)
                            :
                            (<></>)
                    }
                    <p className='text-justify'>{text}</p>
                </div>
                <div className='flex gap-3 justify-around items-center p-3'>
                    <div className='flex flex-col items-center'>

                        <Link to=""
                            className={`hover:bg-red-400 transition-colors duration-300 text-white rounded-full p-1 ${post.like?.find(x => x.usuarioId == user?.data.id) ? 'bg-red-400 hover:bg-red-300' : ''}`} onClick={handleLike}>
                            <AiOutlineHeart size={30} /></Link>
                        <p>{post.like?.length}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link to="" onClick={handleOpenComments} className='hover:text-sky-400 transition-colors duration-300'><AiOutlineComment size={30} /></Link>
                        <p>{post.comentario?.length}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link to="" className='hover:text-slate-400 transition-colors duration-300'><AiOutlineShareAlt size={30} /></Link>
                        <p>2</p>
                    </div>
                </div>
                {openComments && (
                    <div className='p-3 bg-slate-600 rounded-sm mb-3'>
                        <div className='flex justify-between items-center mb-3'>
                            <h1 className='text-2xl font-semibold'>Comentarios</h1>
                            <Link to="" className='bg-slate-800 rounded-md p-2 hover:bg-slate-900 duration-200' onClick={handlComments}>Comentar</Link>
                        </div>
                        <div>
                            <textarea name="comments" className='w-full rounded-md border-none bg-slate-900 text-gray-100 mb-3 p-2' placeholder='Escreva uma mensagem' value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                        </div>
                        {post.comentario && post.comentario.map((item) => (
                            <Comments comentario={{ ...item }} key={item.id} />
                        ))}
                    </div>
                )}


            </div >
        </>
    )
}

export default Post
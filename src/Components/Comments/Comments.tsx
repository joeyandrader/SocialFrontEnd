import { Link } from 'react-router-dom'
import { Comentarios } from '../../models/Post/Post.interface'
export interface Comments {
    comentario?: Comentarios
}

const Comments = ({ comentario }: Comments) => {
    return (
        <>
            <div className='w-full bg-slate-800 p-3 mb-4'>
                <div className='flex gap-3 items-center'>
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                    <p><Link to="#">{comentario?.usuario?.firstName} {comentario?.usuario?.lastName.split(" ")[0] }</Link></p>
                </div>
                <div className='mt-3 bg-slate-700 p-3 rounded-sm'>
                    <p>{comentario?.texto}</p>
                </div>
            </div>
        </>

    )
}

export default Comments
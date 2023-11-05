import { Link } from 'react-router-dom'
import { Comentarios } from '../../models/Post/Post.interface'

export interface Comments {
    comentario?: Comentarios[]
}

const Comments = ({ comentario }: Comments) => {
    return (
        <>
            <div className='p-3 bg-slate-600 rounded-sm mb-3'>
                <div className='flex justify-between items-center mb-3'>
                    <h1 className='text-2xl font-semibold'>Comentarios</h1>
                    <Link to="" className='bg-slate-800 rounded-md p-2 hover:bg-slate-900 duration-200'>Comentar</Link>
                </div>
                <hr />
                {
                    comentario && comentario.length == 0 ?
                        (<p>Não há comentarios</p>) :
                        (
                            comentario?.map((item) => (
                                <div className='w-full bg-slate-800 p-3 mb-4' key={item.id}>
                                    <div className='flex gap-3 items-center'>
                                        <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                        <p><Link to="#">Joel Andrade</Link></p>
                                    </div>
                                    <div className='mt-3 bg-slate-700 p-3 rounded-sm'>
                                        <p>Muito top</p>
                                    </div>
                                </div>
                            ))
                        )
                }
            </div>
        </>

    )
}

export default Comments
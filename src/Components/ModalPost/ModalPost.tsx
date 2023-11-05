import { useEffect, useState } from 'react'
import Input from '../Input/Input'
import styles from './ModalPost.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'


interface OpenModal {
    open: boolean
}

const ModalPost = ({ open }: OpenModal) => {

    return (
        <>
            {open && (
                <div className={`${styles.baseModal}`}>
                    <div className={`w-2/5 bg-slate-900 rounded-md p-3 text-slate-200 relative`}>
                        <button className='absolute text-white p-1 -top-3 -right-3'><AiFillCloseCircle size={30} /></button>
                        <div>
                            <h1 className='text-2xl mb-3'>Nova Postagem</h1>
                            <form action="">
                                <div className='mb-3'>
                                    <input type="text" className='w-full p-2 rounded-md outline-none text-slate-950' placeholder='Titulo (opcional)' />
                                </div>
                                <div className='mb-3'>
                                    <textarea name="textPost" className='w-full p-2 rounded-md outline-none text-slate-950' id="textPost" placeholder='digite um texto' rows={5}></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            )}
        </>

    )
}

export default ModalPost
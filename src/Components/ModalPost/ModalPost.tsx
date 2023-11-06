import { AiFillCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal'
import { useState } from 'react'
import { MdPhotoLibrary } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface OpenModal {
    openModal: boolean,
    handleModalClose: () => void,
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '-500px',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
}

const ModalPost = ({ openModal, handleModalClose }: OpenModal) => {
    const [content, setContent] = useState<string>('')
    const config = {
        readonly: false,
        height: 400,
        buttons: 'bold,italic,underline,strikeout,|,ul,ol,|,link,|,align,|,A',
        removeButtons: ['image', 'link'],
        disablePlugins: 'source', // Desabilita o plugin HTML (source)
        style: {
            backgroundColor: 'rgb(15 23 42)'
        },
        theme: 'bg-slate-950'
    }


    return (
        <>
            <Modal
                isOpen={openModal}
                onRequestClose={handleModalClose}
                // style={customStyles}
                className={`relative top-20 bg-slate-950 rounded-md p-3 text-slate-200 mx-4 m-auto`}
            >
                <button onClick={handleModalClose} className='absolute text-white p-1 -top-3 -right-3'><AiFillCloseCircle size={30} /></button>
                <div className='w-full h-full p-4'>
                    <div className='mb-3'>
                        <input type="text" className='w-full p-3 rounded-md outline-none text-slate-200 bg-slate-900' placeholder='Titulo (opcional)' />
                    </div>
                    <div className='mb-3'>
                        <textarea name="editor" id="editor" className='w-full p-3 rounded-md outline-none text-slate-200 bg-slate-900' placeholder='Conteudo (opcional)' rows={5}></textarea>
                        {/* <JoditEditor className='text-slate-900 bg-slate-950' ref={editor} value={content} config={config} onBlur={newContent => setContent(newContent)} onChange={(newContent) => { }} /> */}
                    </div>
                    <div className='group relative inline-block'>
                        <label htmlFor="images" className='bg-pink-600 p-3 rounded-full inline-block  cursor-pointer'>
                            <MdPhotoLibrary size={30} />
                            <input type="file" id='images' hidden />
                        </label>
                        <span className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-slate-200 text-red-900 p-2 rounded-md absolute bottom-full -left-3 mt-2 w-auto'>Adicionar imagens</span>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <button className='p-3 bg-slate-800 text-white w-96 m-auto rounded-md'>Salvar</button>
                </div>

            </Modal>
        </>

    )
}

export default ModalPost
import { ChangeEvent, useContext, useState } from 'react'
import { MdPhotoLibrary } from 'react-icons/md'
import Post from '../../Components/Post/Post'
import { AuthContext } from '../../Context/UserContext'
import { AiOutlineClose } from 'react-icons/ai'
import { PostService } from '../../services/PostService'

const NewPost = () => {
    const { user, token } = useContext(AuthContext)
    const [titulo, setTitulo] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [images, setImages] = useState<FileList | null>(null)
    const [warning, setWarning] = useState<string>("")
    const api = PostService()

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;

        if (selectedFiles) {
            if (selectedFiles?.length > 5) {
                setWarning("Voçê so pode inserir ate 5 imagens!")
            }
        }


        if (selectedFiles) {
            // Limitando a 5 imagens
            const filesToUpload = Array.from(selectedFiles).slice(0, 5);

            const limitedFileList = new DataTransfer();

            for (const file of filesToUpload) {

                limitedFileList.items.add(file);
            }
            setImages(limitedFileList.files);
        }

    }


    const handleRemoveImage = (index: number) => {
        console.log(index)
        if (images) {
            const updatedImages = Array.from(images).filter((_, i) => i !== index);
            const updatedDataTransfer = new DataTransfer();

            for (const file of updatedImages) {
                updatedDataTransfer.items.add(file);
            }
            setImages(updatedDataTransfer.files);
        }
    };

    const handlePostSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const obj = {
            title: titulo,
            text: content,
            usuarioId: user?.data.id
        }
        await api.CreatePost(token, obj).then((res) => {
            if (res.success) {
                uploadImages(res.data.id)
            }
        }).catch((err) => {
            console.log(err)
            return err;
        })
    }

    const uploadImages = async (idPost?: string) => {
        if (images && idPost) {
            const formData = new FormData();
            for (const img of images) {
                formData.append('file', img)
            }
            console.log(formData)
            await api.UploadPhoto(token, idPost, formData).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className={`container m-auto max-w-4xl p-3 absolute right-0 left-0 top-24 -z-10`}>
            <div className='rounded-md w-full bg-slate-950 p-3'>
                <h1 className='text-white text-3xl ml-4'>Nova Postagem</h1>
                <div className='p-3 flex flex-col gap-3'>
                    <div>
                        {images && Array.from(images).map((image, index) => (
                            <div className='flex gap-2 text-white items-center justify-between' key={index}>
                                <div>
                                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className='w-28 rounded-sm' />
                                    <p>{image.name}</p>
                                </div>
                                <div>
                                    <button className='bg-slate-800 p-3 rounded-md' onClick={() => handleRemoveImage(index)}><AiOutlineClose size={30} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className='text-yellow-600'>{warning && warning}</p>
                    <form onSubmit={handlePostSubmit} encType='multipart/form-data'>
                        <div className='w-full h-full p-2'>
                            <div className='mb-3'>
                                <input type="text" className='w-full p-3 rounded-md outline-none text-slate-200 bg-slate-900' placeholder='Titulo (opcional)' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea name="editor" id="editor" className='w-full p-3 rounded-md outline-none text-slate-200 bg-slate-900' placeholder='Conteudo (opcional)' rows={5} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>


                            <div className='group relative inline-block'>
                                <label htmlFor="images" className='bg-pink-600 p-3 rounded-full inline-block  cursor-pointer'>
                                    <MdPhotoLibrary size={30} />
                                    <input type="file" id='images' hidden onChange={handleImageChange} multiple />
                                </label>
                                <span className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-slate-200 text-red-900 p-2  rounded-md absolute bottom-full left-0 md:-left-12 bottom-16 mt-2 w-40 text-center'>Adicionar imagens</span>
                            </div>
                        </div>

                        <div className='w-full flex justify-center items-center'>
                            <button type='submit' className='p-3 bg-slate-800 text-white w-96 m-auto rounded-md'>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPost

function usecontext(): { user: any } {
    throw new Error('Function not implemented.')
}

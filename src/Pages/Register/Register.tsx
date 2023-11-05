import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../Components/Input/Input';
import { UsuarioService } from '../../services/UsuarioService'
import { toast } from 'react-toastify';
import MyToast from '../../Components/Toastify/MyToast';

const schema = z.object({
    firstName: z.string().nonempty("O Primeiro nome é obrigatorio"),
    lastName: z.string().nonempty("O sobrenome é obrigatorio"),
    email: z.string().email("Insira um email valido").nonempty("O Email é obrigatorio"),
    password: z.string().nonempty("A senha é obrigatorio"),
    confirmPassword: z.string().nonempty("A confirmação de senha é obrigatorio")
})

type FormData = z.infer<typeof schema>

const Register = () => {
    const api = UsuarioService()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const onSubmit = async (data: FormData) => {
        await api.register(data).then((res) => {
            toast.success(res.message)
            navigate("/", { replace: true })
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <>
            <MyToast />
            <div className={styles.Container}>
                <div className={styles.RegisterContainerForm}>
                    <div className={styles.RegisterTitle}>
                        <h2 className='text-5xl text-center text-slate-200 mb-3'>Sign up</h2>
                        <p className='text-xl text-center text-slate-200 mb-3'>Cadastre-se agora e comece a postar</p>
                    </div>
                    <form className={styles.RegisterForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className='md:flex md:gap-3'>
                            <div className={styles.FormGroup}>
                                <Input
                                    type='text'
                                    placeholder='Nome'
                                    name='firstName'
                                    error={errors.firstName?.message}
                                    register={register}
                                />
                            </div>
                            <div className={styles.FormGroup}>
                                <Input
                                    type='text'
                                    placeholder='Sobrenome'
                                    name='lastName'
                                    error={errors.lastName?.message}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className={styles.FormGroup}>
                            <Input
                                type='email'
                                placeholder='Email'
                                name='email'
                                error={errors.email?.message}
                                register={register}
                            />
                        </div>
                        <div className={styles.FormGroup}>
                            <Input
                                type='password'
                                placeholder='Senha'
                                name='password'
                                error={errors.password?.message}
                                register={register}
                            />
                        </div>
                        <div className={styles.FormGroup}>
                            <Input
                                type='password'
                                placeholder='Confirmar Senha'
                                name='confirmPassword'
                                error={errors.confirmPassword?.message}
                                register={register}
                            />
                        </div>
                        {/* <div className={styles.formCheckBox}>
                        <input type="checkbox" id='form' className={styles.formCheck} />
                        <label htmlFor="form" style={{ textTransform: "uppercase" }}>Confirmo os com os termos</label>
                    </div> */}
                        <div className={styles.FormGroup}>
                            <button className="p-3 rounded-md bg-slate-950 w-full text-slate-200 font-medium uppercase hover:bg-slate-900 transition-colors" type='submit'>Logar</button>
                        </div>
                    </form>
                    <Link to="/" style={{ fontSize: "18px" }}>Ja possui conta?</Link>
                </div>
            </div>
        </>
    )
}

export default Register
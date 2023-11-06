import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../Components/Input/Input';
import Toastify from '../../Components/Toastify/MyToast';
import { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';

const schema = z.object({
    email: z.string().email("Insira um email valido").nonempty("O Email é obrigatorio"),
    password: z.string().nonempty("A senha é obrigatorio")
});

type FormData = z.infer<typeof schema>;

const Login = () => {
    const navigete = useNavigate()
    const { user, signed, loadingAuth } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    if (!loadingAuth) {
        if (user) {
            return <Navigate to="/" />
        }
    }

    const onSubmit = async (data: FormData) => {
        const isLogged = await signed(data.email, data.password)
        if (isLogged) {
            console.log("logado")
            return navigete('/', { replace: true })
        }
    }

    return (
        <>
            <Toastify />
            <div className={styles.Container}>
                <div className={styles.LoginContainerForm}>
                    <h2 className='text-5xl text-center text-slate-200 mb-3'>Sign in</h2>
                    <p className='text-xl text-center text-slate-200 mb-3'>Logue-se agora e comece a postar</p>
                    <form className={styles.LoginForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.FormGroup}>
                            <Input
                                type='email'
                                name='email'
                                placeholder='Email'
                                error={errors.email?.message}
                                register={register}
                            />
                        </div>
                        <div className={styles.FormGroup}>
                            <Input
                                type='password'
                                name='password'
                                placeholder='Senha'
                                error={errors.password?.message}
                                register={register}
                            />
                        </div>
                        <div className={styles.FormGroup}>
                            <button className="p-3 rounded-md bg-slate-950 w-full text-slate-200 font-medium uppercase hover:bg-slate-900 transition-colors" type='submit'>Logar</button>
                        </div>
                    </form>
                    <div className={styles.LinkGroup}>
                        <Link to="" style={{ fontSize: "18px" }}>Esqueceu a senha?</Link>
                        <Link style={{ fontSize: "18px" }} to="/register">Cadastre-se</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
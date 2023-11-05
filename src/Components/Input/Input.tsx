import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import styles from './Input.module.css'

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

const Input = ({ name, placeholder, register, type, error, rules }: InputProps) => {
    return (
        <div>
            <input className={`w-full p-3 rounded-md outline-none ${error && styles.formError}`}
                type={type}
                placeholder={placeholder}
                id={name}
                {...register(name, rules)}
            />
            {error && <small className={`${styles.SmallError} text-red-200`}>
                <div className={`${styles.SmallDisplay} bg-red-600 rounded-sm px-3`}>{error}
                </div>
            </small>}
        </div>
    )
}

export default Input
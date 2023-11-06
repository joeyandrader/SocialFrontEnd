import { useContext } from 'react'
import { AuthContext } from '../Context/UserContext'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { loadingAuth, user } = useContext(AuthContext)

    if (loadingAuth) {
        return <div></div>
    }

    if (!user) {
        toast.error("Você precisa está logado!")
        return <Navigate to="/login" />
    }
    return children;
}
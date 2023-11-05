import { useContext } from 'react'
import { AuthContext } from '../Context/UserContext'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext)

    if (auth.loadingAuth) {
        console.log("OLA loading")
        return <div></div>
    }

    if (!auth.user) {
        toast.error("Você precisa está logado!")
        return <Navigate to="/login" />
    }
    return children;
}
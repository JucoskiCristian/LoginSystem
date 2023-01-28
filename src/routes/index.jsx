import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthFirebaseContext } from '../context/authFirebase'

const PrivateRoutes = () => {

    const { signed } = useContext(AuthFirebaseContext)

    return signed ? <Outlet /> : <Navigate to="/" />
    
}

export default PrivateRoutes
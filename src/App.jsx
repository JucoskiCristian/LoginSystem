import './css/style.css'
import AppRoutes from './routes/AppRoutes'
import { AuthFirebaseProvider } from './context/authFirebase'

const App = () => {
    return (
        <AuthFirebaseProvider>
            <AppRoutes />
        </AuthFirebaseProvider>
    )

}

export default App
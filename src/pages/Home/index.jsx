import {useContext} from 'react'
import { AuthFirebaseContext } from '../../context/authFirebase';
import Button from '@mui/material/Button';

const Home = () => {

  const { signOut } = useContext(AuthFirebaseContext)


  return (
    <div>
      Home: 
      <Button onClick={()=> signOut()} variant="contained">Logout</Button>
    </div>
  )
}

export default Home
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login  from '../pages/Login'
import Home  from '../pages/Home'
import CreateAccount from '../pages/CreateAccount';
import PrivateRoutes from '.';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/Home' element={<PrivateRoutes />}>
          <Route path='/Home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  
}

export default AppRoutes;

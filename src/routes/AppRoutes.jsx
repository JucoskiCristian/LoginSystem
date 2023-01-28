import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login  from '../pages/Login'
import Home  from '../pages/Home'
import PrivateRoutes from '.';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<PrivateRoutes />}>
          <Route path='/Home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  
}

export default AppRoutes;

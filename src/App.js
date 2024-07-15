import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInSide from './pages/SignIn';
import Manager from './pages/Manager';
import Staff from './pages/Staff';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInSide/>}/>
          <Route path='/manager' element={<Manager/>}/>
          <Route path='/nhan-vien' element={<Staff/>}/>


        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

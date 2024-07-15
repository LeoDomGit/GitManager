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
          {localStorage.getItem('token')&& (
            <>
              {localStorage.getItem('role') && localStorage.getItem('role')=='manager' && (
                      <Route path='/manager' element={<Manager/>}/>
              )}
              {localStorage.getItem('role') && localStorage.getItem('role')=='staff' && (
                      <Route path='/nhan-vien' element={<Staff/>}/>
                    )}
            </>
          )}
          {!localStorage.getItem('token') && (
          <Route path='/' element={<SignInSide/>}/>
          )}



        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

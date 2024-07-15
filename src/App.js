import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInSide from './pages/SignIn';
import Manager from './pages/Home';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInSide/>}/>
          <Route path='/manager' element={<Manager/>}/>

        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

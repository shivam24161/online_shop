import { Route, Routes } from 'react-router-dom';
import './App.css';
import Carousel from './Carousel';
import Header from './Header';
import Login from './Login';
function App() {
  return (
    <>
     <Header/>
    <Routes>
    <Route path="/" element={<Carousel/>}/>
    <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;

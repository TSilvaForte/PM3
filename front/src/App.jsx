import './App.css'
import Home from './views/Home'
import MyAppointments from './views/MyAppointments'
import Register from './views/Register';
import Login from './views/Login';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/appointments" element={<MyAppointments />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
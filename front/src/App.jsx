import './App.css'
import Home from './views/Home/Home';
import MyAppointments from './views/MyAppointments/MyAppointments';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NewAppointment from './views/NewAppointment/NewAppointment';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/appointments" element={<MyAppointments />}/>
        <Route path="/appointments/newappointment" element={<NewAppointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
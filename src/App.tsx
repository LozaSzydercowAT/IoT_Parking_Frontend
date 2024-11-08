import './App.css'
import {isExpired} from "react-jwt";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/shared/Navbar.tsx";
import Homepage from "./components/Homepage.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Account from "./components/Account.tsx";

function App() {
  return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={!isExpired(localStorage.getItem("token") || '') ? <Navigate replace to={"/login?showInfo=true"}/> : <Account />}>
                    <Route path="cars" element={<h1>Samochody</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App

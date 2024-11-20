import './App.css'
import {isExpired} from "react-jwt";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/shared/Navbar.tsx";
import Homepage from "./components/Homepage.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Account from "./components/Account.tsx";
import Cars from "./components/Cars.tsx";
import Payments from "./components/Payments.tsx";
import History from "./components/History.tsx";
import Messages from "./components/Messages.tsx";

function App() {
  return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={!isExpired(localStorage.getItem("token") || '') ? <Navigate replace to={"/login?showInfo=true"}/> : <Account />}>
                    <Route path="cars" element={<Cars />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="history" element={<History />} />
                    <Route path="messages" element={<Messages />} />
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App

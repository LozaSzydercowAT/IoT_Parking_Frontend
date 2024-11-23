import './App.css'
import {isExpired} from "react-jwt";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/shared/Navbar.tsx";
import {lazy, Suspense} from "react";
import Loader from "./components/shared/Loader";

const Homepage = lazy(() => import('./components/Homepage'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const AccountPage = lazy(() => import('./components/AccountPage'));
const Account = lazy(() => import('./components/Account'));
const Cars = lazy(() => import('./components/Cars'));
const Payments = lazy(() => import('./components/Payments'));
const History = lazy(() => import('./components/History'));
const Messages = lazy(() => import('./components/Messages'));

function App() {
  return (
      <Suspense fallback={<Loader />}>
          <BrowserRouter>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={!isExpired(localStorage.getItem("token") || '') ? <Navigate replace to={"/login?showInfo=true"}/> : <AccountPage />}>
                      <Route index element={<Account />} />
                      <Route path="cars" element={<Cars />} />
                      <Route path="payments" element={<Payments />} />
                      <Route path="history" element={<History />} />
                      <Route path="messages" element={<Messages />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </Suspense>
  )
}

export default App

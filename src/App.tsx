import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import {lazy, Suspense} from "react";
import Loader from "./components/shared/Loader";
import Footer from "./components/Footer";
import {isExpired} from "react-jwt";

const Homepage = lazy(() => import('./components/sites/Homepage'));
const Register = lazy(() => import('./components/sites/Register'));
const AccountPage = lazy(() => import('./components/sites/AccountPage'));
const Account = lazy(() => import('./components/sites/Account'));
const Payments = lazy(() => import('./components/sites/Payments'));
const History = lazy(() => import('./components/sites/History'));
const Messages = lazy(() => import('./components/sites/Messages'));
const About = lazy(() => import('./components/sites/About'));
const Login = lazy(() => import('./components/sites/Login'))

function App() {
  return (
      <Suspense fallback={<Loader isForPage />}>
          <BrowserRouter>
              <Navbar />
              <main>
                  <Routes>
                      <Route index element={<Homepage />} />
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={!isExpired(localStorage.getItem("token") || '') ? <Navigate replace to={"/account"} /> : <Register />} />
                      <Route path="account" element={isExpired(localStorage.getItem("token") || '') ? <Navigate replace to={"/login?showInfo=true"}/> : <AccountPage />}>
                          <Route index element={<Account />} />
                          <Route path="payments" element={<Payments />} />
                          <Route path="history" element={<History />} />
                          <Route path="messages" element={<Messages />} />
                      </Route>
                      <Route path="about" element={<About />} />
                  </Routes>
              </main>
              <Footer />
          </BrowserRouter>
      </Suspense>
  )
}

export default App

import {useState} from "react";
import LoginModal from "../shared/LoginModal.tsx";
import {Navigate} from "react-router-dom";

function Login() {
    const [isOpenLogin, setOpenLogin] = useState(true);

    if(!isOpenLogin) {
        return <Navigate replace to={"/"} />
    }

    return (
        <LoginModal isOpen={isOpenLogin} onClose={() => setOpenLogin(false)} />
    )
}

export default Login

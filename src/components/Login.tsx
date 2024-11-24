import '../assets/styles/login.css'
import {Input} from "@fluentui/react-components";
import {Label} from "@fluentui/react";
function Login() {
    return <>
        <div className="container">
            <div className="login">
                <h1>Logowanie</h1>
                <Label htmlFor="login" className="label">Login</Label>
                <Input className="login-input" id="login"/>
                <Label htmlFor="password" className="label">Hasło</Label>
                <Input className="login-input" id="password" type="password" />
            </div>
        </div>
    </>
}

export default Login
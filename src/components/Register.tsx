import {useState, FormEvent, ChangeEvent} from "react";
import {Button, Checkbox, Field, Input, MessageBar, MessageBarBody, MessageBarTitle, Spinner} from "@fluentui/react-components";
import "../assets/styles/login.css";
import axios from "../../axiosConfig.ts";

interface Errors {
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
    isAccepted?: string;
}

interface Account {
    username: string;
    email: string;
    password: string;
    password2: string;
    isAccepted: boolean;
}

function Register() {
    const [account, setAccount] = useState<Account>({
        username: '',
        email: '',
        password: '',
        password2: '',
        isAccepted: false
    });

    const [errors,setErrors] = useState<Errors>({});
    const [formError, setFormError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [isAction, setAction] = useState(false);

    const validateForm = () => {
        setFormError(true);
    }

    const handleRegister = (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        setAction(true)
        console.log(isAction)
        //validateForm()

        if(errors || formError) {
            setAction(false);
            return;
        } else {
            axios.post('/user/register', {
                username: account.username,
                email: account.email,
                password: account.password
            }).then((response) => {
                localStorage.setItem('token', response.data.token)
                window.location.replace('/')
            }).catch((error) => {
                if(error.response && error.response.status === 401) setRegisterError(true)
                else setNetworkError(true);
            })
        }
        setAction(false)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value
        }));
    };

    const handleAcceptation = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setAccount((prevAccount) => ({
            ...prevAccount,
            isAccepted: checked.checked
        }));
    }

    return <>
        <h1>Tworzenie nowego użytkownika</h1>
        {registerError && <></>}
        {networkError && <MessageBar intent={"error"}>
            <MessageBarBody>
                <MessageBarTitle>Nieoczekiwany błąd.</MessageBarTitle>
                Wystąpił błąd w trakcie komunikacji z serwerem.
            </MessageBarBody>
        </MessageBar>}
        {formError && <MessageBar intent={"error"}>
            <MessageBarTitle>W formularzu znajdują się błędy! </MessageBarTitle>
            <ul>
                <li>Tu jest źle</li>
                <li>Tu jest źle</li>
                <li>Tu jest źle</li>
            </ul>
        </MessageBar> }
        <form onSubmit={handleRegister}>
            <Field required label="Nazwa użytkownika" className="labelStyle">
                <Input required type="text" name="username" value={account.username} onChange={handleChange} />
            </Field>
            <Field required label="Adres e-mail" className="labelStyle">
                <Input required type="email" name="email" value={account.email} onChange={handleChange} />
            </Field>
            <Field required label="Hasło" className="labelStyle">
                <Input required type="password" name="password" value={account.password} onChange={handleChange} />
            </Field>
            <Field required label="Powtórz hasło" className="labelStyle">
                <Input required type="password" name="password2" value={account.password2} onChange={handleChange} />
            </Field>
            <Checkbox required label="Akceptuję regulamin usługi" name="isAccepted" checked={account.isAccepted} onChange={handleAcceptation} className="labelStyle" />
            <Button type="submit" disabled={isAction} appearance="primary">{isAction ? <Spinner label="Tworzenie nowego użytkownika" /> : 'Zarejestruj'}</Button>
        </form>
    </>
}

export default Register
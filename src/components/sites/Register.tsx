import {useState, FormEvent, ChangeEvent} from "react";
import {
    Button,
    Switch,
    Field,
    Input,
    MessageBar,
    MessageBarBody,
    MessageBarTitle,
    Spinner,
    Text,
} from "@fluentui/react-components";
import "../../assets/styles/login.css";
import axios from "../../../axiosConfig.ts";

interface Errors {
    name?: string;
    surname?: string;
    email?: string;
    mobileNumber?: string;
    carPlate?: string;
    password?: string;
    password2?: string;
    isAccepted?: string;
}

interface Account {
    name: string;
    surname: string;
    email: string;
    mobileNumber: string;
    carPlate: string;
    password: string;
    password2: string;
    isAccepted: boolean;
}

function Register() {
    const [account, setAccount] = useState<Account>({
        name: '',
        surname: '',
        email: '',
        mobileNumber: '',
        carPlate: '',
        password: '',
        password2: '',
        isAccepted: false
    });

    const [errors,setErrors] = useState<Errors>({});
    const [formError, setFormError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [isAction, setAction] = useState(false);

    const validatePassword = (passwd: string): boolean => {
        const regexDuzaLitera = /[A-Z]/;
        const regexMalaLitera = /[a-z]/;
        const regexCyfra = /\d/;
        const regexZnakSpecjalny = /[!@#$%^&*(),.?":{}|<>]/;

        return regexDuzaLitera.test(passwd) && regexMalaLitera.test(passwd) && regexCyfra.test(passwd) && regexZnakSpecjalny.test(passwd) && passwd.length >= 8;
    }

    const validateForm = () => {
        const nameRegex = /^[A-Za-z]+$/;
        const surnameRegex = /^[A-Za-z-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileNumberRegex = /^\d{9}$/;

        setErrors({});
        setFormError(false);

        if(!nameRegex.test(account.name)) {
            setErrors({name: "Nieprawidłowe imię!"})
            setFormError(true);
        }
        if(!surnameRegex.test(account.surname)) {
            setErrors({surname: 'Nieprawidłowe nazwisko!'})
            setFormError(true);
        }
        if(!emailRegex.test(account.email)) {
            setErrors({email: 'Nieprawidłowy adres e-mail!'})
            setFormError(true);
        }
        if(!mobileNumberRegex.test(account.mobileNumber) || account.mobileNumber.length !== 9) {
            setErrors({mobileNumber: 'Nieprawidłowy numer telefonu!'})
            setFormError(true);
        }
        if(account.password !== account.password2) {
            setErrors({password: 'Hasła nie są identyczne!', password2: 'Hasła nie są identyczne!'})
            setFormError(true);
        } else if(!validatePassword(account.password)) {
            setErrors({password: 'Hasło nie spełnia kryteriów bezpieczeństwa!'})
            setFormError(true);
        }
    }

    const handleRegister = (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        setAction(true)
        setRegisterError(false)
        setNetworkError(false);

        validateForm()

        if(formError) {
            setAction(false);
            return;
        } else {
            axios.post('/user/newUser', {
                name: account.name,
                surname: account.surname,
                phone: account.mobileNumber,
                email: account.email,
                registeration_number: account.carPlate,
                password: account.password
            }).then((response) => {
                if(response.status === 201) {
                    window.location.replace('/login?registerSuccess=true');
                }
           }).catch((error) => {
                if(error.response && error.response.status === 401) setRegisterError(true)
                else setNetworkError(true);
            }).finally(() => {
                setAction(false)
            })
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value
        }));
    };

    const handleAcceptation = (_event: ChangeEvent<HTMLInputElement>, data) => {
        setAccount((prevAccount) => ({
            ...prevAccount,
            isAccepted: data.checked
        }));
    }

    const printErrors = () => {
        const errorMessages = [];
        for(const [key, value] of Object.entries(errors)) {
            if (value && value !== '') { errorMessages.push(value); }
        }
        return errorMessages.map((message, index) => <li key={index}>{message}</li>);
    }

    return <div className={'maxWidth'}>
        <h1>Tworzenie nowego użytkownika</h1>
        {registerError && <></>}
        {networkError && <MessageBar intent="error" layout="multiline">
            <MessageBarBody>
                <MessageBarTitle>Nieoczekiwany błąd.</MessageBarTitle>
                Wystąpił błąd w trakcie komunikacji z serwerem.
            </MessageBarBody>
        </MessageBar>}
        {formError &&
        <MessageBar intent="error" layout="multiline">
            <MessageBarBody>
                <MessageBarTitle>W formularzu znajdują się błędy! </MessageBarTitle>
                <ul style={{paddingLeft: '20px', margin: '5px 0'}}>
                    {printErrors()}
                </ul>
            </MessageBarBody>
        </MessageBar>}
        <form onSubmit={handleRegister}>
            <Field required label="Imię" className="labelStyle" validationMessage={errors.name}>
                <Input required disabled={isAction} type="text" name="name" value={account.name} onChange={handleChange} />
            </Field>
            <Field required label="Nazwisko" className="labelStyle" validationMessage={errors.surname}>
                <Input required disabled={isAction} type="text" name="surname" value={account.surname} onChange={handleChange} />
            </Field>
            <Field required label="Adres e-mail" className="labelStyle" validationMessage={errors.email}>
                <Input required disabled={isAction} contentBefore={<Text size={400}>@</Text>} type="email" name="email" value={account.email} onChange={handleChange} />
            </Field>
            <Field required label="Numer telefonu" className="labelStyle" validationMessage={errors.mobileNumber}>
                <Input required disabled={isAction} contentBefore={<Text size={400}>+48</Text>} type="text" name="mobileNumber" value={account.mobileNumber} onChange={handleChange} />
            </Field>
            <Field required label="Numer rejestracyjny" className="labelStyle" validationMessage={errors.carPlate}>
                <Input required disabled={isAction} type="text" name="carPlate" value={account.carPlate} onChange={handleChange} />
            </Field>
            <Field required label="Hasło" className="labelStyle" validationMessage={errors.password}>
                <Input required disabled={isAction} type="password" name="password" value={account.password} onChange={handleChange} />
            </Field>
            <Field required label="Powtórz hasło" className="labelStyle" validationMessage={errors.password2}>
                <Input required disabled={isAction} type="password" name="password2" value={account.password2} onChange={handleChange} />
            </Field>
            <Field validationMessage={errors.isAccepted}>
                <Switch required label="Akceptuję regulamin usługi" name="isAccepted" checked={account.isAccepted} onChange={handleAcceptation} className="labelStyle"/>
            </Field>
            <div className={"bottomContainer"}>
                <Button type="submit" disabled={isAction} appearance="primary">Zarejestruj</Button>
                {isAction && <Spinner size={'tiny'} label={'Tworzenie nowego użytkownika'} /> }
            </div>
        </form>
    </div>
}

export default Register

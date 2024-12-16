import { FormEvent, useEffect, useState } from "react";
import { Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, Text, DialogActions, Spinner, MessageBar, MessageBarBody, MessageBarTitle } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { LockClosedRegular, PersonAddRegular } from "@fluentui/react-icons";
import axios from "../../../axiosConfig.ts";
import "../../assets/styles/login.css";

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [isAction, setActionStatus] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [unexError, setUnexError] = useState(false);
    const [reqLoginInfo, setReqLoginInfo] = useState(false);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setReqLoginInfo(urlParams.get('showInfo') === "true")
    }, [])

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setActionStatus(true);
        setLoginError(false);
        setUnexError(false);
        setReqLoginInfo(false);

        axios.post('/user/login', {
            "name": login,
            "password": password
        })
            .then(response => {
                console.log(response.data.message);
                localStorage.setItem('token', response.data.id);
                window.location.replace('/');
            }).catch(error => {
            if (error.response && error.response.status === 401) setLoginError(true);
            else setUnexError(true);
            setActionStatus(false);
        });
    };

    return (
        <Dialog modalType="alert" open={isOpen} onOpenChange={(_event, data) => data.open ? null : onClose()}>
            <DialogSurface>
                {isAction ? (
                    <DialogBody>
                        <DialogTitle action={null}>
                            <Spinner appearance="primary" label="Logowanie" />
                        </DialogTitle>
                    </DialogBody>
                ) : (
                    <form onSubmit={handleLogin}>
                        <DialogBody>
                            <DialogTitle>Logowanie</DialogTitle>
                            <DialogContent className="dialogContent">
                                {reqLoginInfo && (
                                    <MessageBar intent="warning" layout="multiline">
                                        <MessageBarBody>
                                            Aby móc zobaczyć żądaną zawartość, należy się zalogować.
                                        </MessageBarBody>
                                    </MessageBar>
                                )}
                                {loginError && (
                                    <MessageBar intent={"error"}>
                                        <MessageBarBody>
                                            <MessageBarTitle>Podano niepoprawne dane logowania</MessageBarTitle>
                                        </MessageBarBody>
                                    </MessageBar>
                                )}
                                {unexError && (
                                    <MessageBar intent={"error"}>
                                        <MessageBarBody>
                                            <MessageBarTitle>Wystąpił nieoczekiwany błąd</MessageBarTitle>
                                        </MessageBarBody>
                                    </MessageBar>
                                )}
                                <Label required htmlFor={"login-input"} className={"labelStyle"}>Nazwa użytkownika</Label>
                                <Input required type="text" id={"login-input"} onChange={(e) => setLogin(e.target.value)} />
                                <Label required htmlFor={"password-input"} className={"labelStyle"}>Hasło</Label>
                                <Input required type="password" id={"password-input"} onChange={(e) => setPassword(e.target.value)} />
                                <Text className={"passResetText"}>Zapomniałeś hasła? <Link to={"/register"} className={"passResetLink"} onClick={onClose}>Zresetuj je tutaj.</Link></Text>
                            </DialogContent>
                        </DialogBody>
                        <DialogActions style={{ marginTop: "20px", justifyContent: "space-between", width: '100%' }} fluid={true}>
                            <div>
                                <Link to={'/register'}>
                                    <Button appearance="secondary" icon={<PersonAddRegular />}>Utwórz konto</Button>
                                </Link>
                            </div>
                            <div>
                                <Button appearance="secondary" onClick={onClose} style={{ marginRight: '10px' }}>Zamknij</Button>
                                <Button appearance="primary" type={"submit"} icon={<LockClosedRegular />}>Zaloguj</Button>
                            </div>
                        </DialogActions>
                    </form>
                )}
            </DialogSurface>
        </Dialog>
    );
};

export default LoginModal;

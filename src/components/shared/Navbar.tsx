import {Button, Dialog, DialogTrigger, Menu, MenuDivider, MenuList, MenuItem, MenuPopover, MenuTrigger, Persona, Tooltip, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, Text, DialogActions, Spinner, MessageBar, MessageBarBody, MessageBarTitle} from "@fluentui/react-components";
import {ArrowExitFilled, HistoryFilled, NotebookEyeFilled, PersonFilled, PersonRegular, VehicleCarFilled, WalletCreditCardFilled} from "@fluentui/react-icons"
import {FormEvent, useState} from "react";
import {isExpired} from "react-jwt";
import {Link} from "react-router-dom";
import {Hamburger} from "@fluentui/react-nav-preview";
import "../../assets/styles/login.css";
import axios from "../../../axiosConfig.ts";

function Navbar() {
    const [isAction, setActionStatus] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [unexError, setUnexError] = useState(false);
    const [isOpenLogin, setOpenLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.replace("/");
    }

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setActionStatus(true);
        setLoginError(false);
        setUnexError(false);
        const bodyParams = new URLSearchParams({
            "name": login,
            "password": password
        })

        axios.post('/user/login', bodyParams)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            window.location.replace('/');
        }).catch(error => {
            if(error.status === 401) setLoginError(true);
            else setUnexError(true);
            setActionStatus(false);
        })
    }

    const renderHamburgerWithToolTip = () => {
        return (
            <Tooltip content="Menu" relationship="label">
                <Hamburger />
            </Tooltip>
        );
    };

    return <nav>
        <div className={"logoDiv"}>
            {renderHamburgerWithToolTip()}
            <Link to={"/"} style={{marginLeft: '10px'}}>
                <h1 className={"logo"}>Inteligentny parking</h1>
            </Link>
        </div>
        {isExpired(localStorage.getItem('token') || '') ? <Dialog modalType={"alert"} open={isOpenLogin} onOpenChange={(event,data) => setOpenLogin(data.open)}>
                <DialogTrigger disableButtonEnhancement>
                    <Button icon={<PersonRegular />} style={{padding: '0 20px', margin: "5px 0 5px 0"}}>Zaloguj się</Button>
                </DialogTrigger>
            {isAction ? <DialogSurface>
                    <DialogBody>
                        <DialogContent>
                            <Spinner appearance="primary" label="Logowanie" />
                        </DialogContent>
                    </DialogBody>
                </DialogSurface> : <DialogSurface>
                <form onSubmit={handleLogin}>
                    <DialogBody>
                        <DialogTitle>Logowanie</DialogTitle>
                        <DialogContent style={{display: "flex", flexDirection: "column"}}>
                            {loginError && <MessageBar intent={"error"}>
                                <MessageBarBody>
                                    <MessageBarTitle>Podano niepoprawne dane logowania.</MessageBarTitle>
                                </MessageBarBody>
                            </MessageBar>}
                            {unexError && <MessageBar intent={"error"}>
                                <MessageBarBody>
                                    <MessageBarTitle>Wystąpił nieoczekiwany błąd</MessageBarTitle>
                                </MessageBarBody>
                            </MessageBar>}
                            <Label required htmlFor={"login-input"} className={"labelStyle"}>Nazwa użytkownika</Label>
                            <Input required type="text" id={"login-input"} onChange={(e) => setLogin(e.target.value)} />
                            <Label required htmlFor={"password-input"} className={"labelStyle"}>Hasło</Label>
                            <Input required type="password" id={"password-input"} onChange={(e) => setPassword(e.target.value)} />
                            <Text className={"registerText"}>Nie masz konta? <Link to={"/register"} className={"registerLink"} onClick={() => setOpenLogin(false)}>Utwórz je tutaj.</Link></Text>
                        </DialogContent>
                    </DialogBody>
                    <DialogActions style={{marginTop: "20px"}}>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Zamknij</Button>
                        </DialogTrigger>
                        <Button appearance="primary" type={"submit"}>Zaloguj</Button>
                    </DialogActions>
                </form>
                </DialogSurface>}
            </Dialog> : <Menu>
                <MenuTrigger>
                    <MenuItem>
                        <Persona name="Dariusz Piwko"
                                 secondaryText="Dostępne środki: 21,37 zł"
                                 presence={{ status: "available" }} style={{padding: '5px 10px', transform: 'translateY(-3px)'}}>
                        </Persona>
                    </MenuItem>
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        <Link to={"/account"}>
                            <MenuItem icon={<PersonFilled />}>Konto</MenuItem>
                        </Link>
                        <MenuItem icon={<ArrowExitFilled />} onClick={handleLogout}>Wyloguj się</MenuItem>
                        <MenuDivider />
                        <Link to={"/account/cars"}>
                            <MenuItem icon={<VehicleCarFilled />}>Pojazdy</MenuItem>
                        </Link>
                        <Link to={"/account/payments"}>
                            <MenuItem icon={<WalletCreditCardFilled />}>Płatności</MenuItem>
                        </Link>
                        <Link to={"/account/history"}>
                            <MenuItem icon={<HistoryFilled />}>Historia</MenuItem>
                        </Link>
                        <Link to={"/account/messages"}>
                            <MenuItem icon={<NotebookEyeFilled />}>Wiadomości</MenuItem>
                        </Link>
                    </MenuList>
                </MenuPopover>
            </Menu>
        }
    </nav>
}

export default Navbar

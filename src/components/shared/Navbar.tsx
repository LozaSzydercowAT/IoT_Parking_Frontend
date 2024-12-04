import {
    Button,
    Dialog,
    DialogTrigger,
    Menu,
    MenuDivider,
    MenuList,
    MenuItem,
    MenuPopover,
    MenuTrigger,
    Persona,
    Tooltip, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, Spinner
} from "@fluentui/react-components";
import {ArrowExitFilled, HistoryFilled, NotebookEyeFilled, PersonFilled, PersonRegular, VehicleCarFilled, WalletCreditCardFilled} from "@fluentui/react-icons"
import {isExpired} from "react-jwt";
import {Link} from "react-router-dom";
import {Hamburger} from "@fluentui/react-nav-preview";
import "../../assets/styles/login.css";
import {useState} from "react";

function Navbar() {
    const [isAction, setActionStatus] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const handleLogin = () => {
        setActionStatus(true);
        localStorage.setItem('token','iufya87asdysad9uf8df9asd');
        window.location.reload();
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
        {isExpired(localStorage.getItem('token') || '') ? <Dialog modalType={"alert"}>
                <DialogTrigger disableButtonEnhancement>
                    <Button icon={<PersonRegular />} style={{padding: '0 20px', margin: "5px 0 5px 0"}}>Zaloguj się</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Logowanie</DialogTitle>
                        {isAction ? <DialogContent>
                            <Spinner appearance="primary" label="Logowanie" />
                        </DialogContent> : <DialogContent style={{display: "flex", flexDirection: "column"}}>
                            <Label htmlFor="login" className="label">Login</Label>
                            <Input className="login-input" id="login"/>
                            <Label htmlFor="password" className="label">Hasło</Label>
                            <Input className="login-input" id="password" type="password"/>
                        </DialogContent> }
                    </DialogBody>
                    {isAction ? '' :
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Zamknij</Button>
                        </DialogTrigger>
                        <Button appearance="primary" onClick={handleLogin}>Zaloguj</Button>
                    </DialogActions>}
                </DialogSurface>
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
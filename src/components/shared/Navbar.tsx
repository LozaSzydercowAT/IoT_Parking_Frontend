import {Button, Menu, MenuDivider, MenuList, MenuItem, MenuPopover, MenuTrigger, Persona} from "@fluentui/react-components";
import {ArrowExitFilled, HistoryFilled, NotebookEyeFilled, PersonFilled, PersonRegular, VehicleCarFilled, WalletCreditCardFilled} from "@fluentui/react-icons"
import {isExpired} from "react-jwt";
import {Link} from "react-router-dom";

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const handleLogin = () => {
        localStorage.setItem('token', 'kjsdfkjsdjfkjsdflklksdfk9823F');
        window.location.reload();
    }

    return <nav>
        <div className={"logoDiv"}>
            <Link to={"/"}>
                <h1 className={"logo"}>Inteligentny parking</h1>
            </Link>
        </div>
        {isExpired(localStorage.getItem('token') || '') ?
            <Button icon={<PersonRegular />} style={{padding: '0 20px', margin: "5px 5px 5px 0"}} onClick={handleLogin} >Zaloguj się</Button> :
            <Menu>
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
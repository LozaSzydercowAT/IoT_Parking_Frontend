import { Button, Menu, MenuDivider, MenuList, MenuItem, MenuPopover, MenuTrigger, Persona, Tooltip, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { ArrowExitFilled, HistoryFilled, PersonFilled, PersonRegular, VehicleCarFilled, WalletCreditCardFilled, NotebookEyeFilled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { Hamburger } from "@fluentui/react-nav-preview";
import "../assets/styles/login.css";
import PersonData from "../interfaces/PersonData"
import {SetStateAction, useEffect, useState} from "react";
import axios from "../../axiosConfig.ts"

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [person, setPerson] = useState<PersonData | null>(null);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.replace("/");
    };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('token') !== null);
        if (isLoggedIn) {
            axios.get("/user/" + localStorage.getItem('token'), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': ' application/json',
                }
            })
                .then((response: { data: SetStateAction<PersonData | null>; }) => {
                    setPerson(response.data);
                    console.log(response.data);
                    setIsLoggedIn(true);
                }).catch(error => {
                    console.log(error);
            })
        }
    }, [isLoggedIn])
    

    const renderHamburgerWithToolTip = () => {
        return (
            <Tooltip content="Menu" relationship="label">
                <Hamburger />
            </Tooltip>
        );
    };

    return (
        <nav>
            <div className={"logoDiv"}>
                {renderHamburgerWithToolTip()}
                <Link to={"/"} style={{ marginLeft: '10px' }}>
                    <h1 className={"logo"}>Inteligentny parking</h1>
                </Link>
            </div>
            {localStorage.getItem('token') === null ? (
                <Link to={"/login"} style={{ margin: 'auto 0' }}>
                    <Button icon={<PersonRegular />} style={{ padding: '10px 20px' }}>
                        Zaloguj się
                    </Button>
                </Link>
            ) : (
                <Menu>
                    <MenuTrigger>
                        {person?.name === undefined ? <Skeleton style={{width: '186px'}}>
                            <SkeletonItem style={{height: '50px'}}/>
                        </Skeleton> : <MenuItem>
                            <Persona
                                name={person?.name + ' ' + person?.surname}
                                secondaryText={'Dostępne środki: ' + person?.account_balance + " zł"}
                                presence={{ status: "available" }}
                                style={{ padding: '5px 10px', transform: 'translateY(-3px)' }}/>
                        </MenuItem>}
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
            )}
        </nav>
    );
}

export default Navbar;

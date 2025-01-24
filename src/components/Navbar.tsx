import { Button, Menu, MenuDivider, MenuList, MenuItem, MenuPopover, MenuTrigger, Persona, Tooltip, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { ArrowExitFilled, HistoryFilled, PersonFilled, PersonRegular, WalletCreditCardFilled, NotebookEyeFilled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { Hamburger } from "@fluentui/react-nav-preview";
import "../assets/styles/login.css";
import PersonData from "../interfaces/PersonData"
import { useEffect, useState} from "react";
import axios from "../../axiosConfig.ts"
import {isExpired} from "react-jwt";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [person, setPerson] = useState<PersonData | null>(null);
    const handleLogout = () => {
        axios.post('/user/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'x-auth-token': localStorage.getItem("token")
            }
        }).then(response => {
            if(response.data.message === "User logged out successfully!") {
                localStorage.removeItem('token');
                window.location.replace("/");
            }
        })
    };

    useEffect(() => {
        setIsLoggedIn(!isExpired(localStorage.getItem('token') as string));
        if (isLoggedIn) {
            axios.get("/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': ' application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            })
                .then(response => {
                    setPerson(response.data);
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
                                secondaryText={'Dostępne środki: ' + person?.balance.toFixed(2) + " zł"}
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

import {Button, Menu, MenuDivider, MenuList, MenuItem, MenuPopover, MenuTrigger, Persona} from "@fluentui/react-components";
import {ArrowExitFilled, PersonFilled, PersonRegular, VehicleCarFilled} from "@fluentui/react-icons"
import {isExpired} from "react-jwt";
import {Link} from "react-router-dom";

function Navbar() {
    return <nav>
        <div className={"logoDiv"}>
            <h1 className={"logo"}>Inteligentny parking</h1>
        </div>
        {!isExpired(localStorage.getItem('token') || '') ?
            <Button icon={<PersonRegular />} style={{padding: '0 20px'}}>Zaloguj się</Button> :
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
                        <MenuItem icon={<ArrowExitFilled />}>Wyloguj się</MenuItem>
                        <MenuDivider />
                        <Link to={"/account/cars"}>
                            <MenuItem icon={<VehicleCarFilled />}>Pojazdy</MenuItem>
                        </Link>
                    </MenuList>
                </MenuPopover>
            </Menu>


        }
    </nav>
}

export default Navbar
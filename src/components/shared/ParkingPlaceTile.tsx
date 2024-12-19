import ParkingPlace from "../../interfaces/ParkingPlace.tsx";
import SectorData from "../../interfaces/SectorData.tsx";
import { Button, MessageBar, MessageBarActions, MessageBarBody, Persona, Popover, PopoverSurface, PopoverTrigger } from "@fluentui/react-components";
import {CalendarAddFilled} from "@fluentui/react-icons";
import {Link} from "react-router-dom";

function ParkingPlaceTile({ parkingPlace, sectorData }: { parkingPlace: ParkingPlace, sectorData: SectorData }) {
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button size={"large"} disabled={parkingPlace.use} className={'buttonStyle'}>
                        <Persona presenceOnly size="huge" name={"Miejsce nr " + (parkingPlace.place + 1)}
                                 presence={parkingPlace.use ? {status: "do-not-disturb"} : parkingPlace.reserved ? {status: "busy"} : {status: "available"}}
                                 secondaryText={(parkingPlace.charger !== 0) ? "Dla pojazdów elektrycznych" : "Dla wszystkich samochodów"} />
                    </Button>
                </PopoverTrigger>
                <PopoverSurface>
                    <h3>Piętro {sectorData.floor}, Sektor {sectorData.sector} ({sectorData.sectorColor}), Miejsce {parkingPlace.place + 1}</h3>
                    <ul>
                        <li>{(parkingPlace.charger !== 0) ? "Miejsce dla pojazdów elektrycznych (ładowarka " + parkingPlace.charger + " W)" : "Dla wszystkich pojazdów"}</li>
                        <li>Opłata za postój: {parkingPlace.priceHour} zł/h</li>
                    </ul>
                    {(!parkingPlace.use && !parkingPlace.reserved) && (
                        localStorage.getItem('token') ? <Button icon={<CalendarAddFilled />} appearance="primary">Zarezerwuj</Button> :
                            <MessageBar intent="warning">
                                <MessageBarBody>
                                    Aby zarezerwować to miejsce, należy się zalogować
                                </MessageBarBody>
                                <MessageBarActions>
                                    <Link to={'/login'}>
                                        <Button>Zaloguj się</Button>
                                    </Link>
                                </MessageBarActions>
                            </MessageBar>
                    )}
                </PopoverSurface>
            </Popover>
        </>
    )
}

export default ParkingPlaceTile

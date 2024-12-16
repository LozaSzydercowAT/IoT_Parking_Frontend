import {useEffect, useState} from "react";
import axios from "../../../axiosConfig.ts";
import SectorData from "../../interfaces/SectorData";
import SpaceSkeleton from "../shared/SpaceSkeleton";
import { Persona, Button, Popover, PopoverTrigger, PopoverSurface, MessageBar, MessageBarBody, MessageBarActions } from "@fluentui/react-components";
import '../../assets/styles/homepage.css'
import {CalendarAddFilled} from "@fluentui/react-icons";
import {Link} from "react-router-dom";

function Homepage() {
    const [isLoading, setIsLoading] = useState(false);
    const [sectorsData, setSectorsData] = useState<SectorData[]>([]);

    const handleDataFetching = () => {
        setIsLoading(true);
        axios.get('/data/readAllDataBase')
            .then((response) => {
                setSectorsData(response.data);
                setIsLoading(false);
                console.log(response.data);
            })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleDataFetching();
    }, []);

    return (
        <>
            {isLoading && <SpaceSkeleton />}
            {!isLoading && (
                <div className={"tableAlignment"}>
                    {sectorsData.map((sector, key) => (
                        <div key={key} className={"sectorAlignment"}>
                            <div style={{backgroundColor: sector.sectorColor}} className={"sectorName"}>
                                <h1>Sektor {sector.sector} ({sector.sectorColor})</h1>
                            </div>
                            {sector.parkingSpaces.map((parking, key) => (
                                <Popover key={key}>
                                    <PopoverTrigger>
                                        <Button size={"large"} disabled={parking.use} className={'buttonStyle'}>
                                            <Persona presenceOnly size="huge" key={key}
                                                     name={"Miejsce nr " + parking.place}
                                                     presence={parking.use ? {status: "do-not-disturb"} : parking.reserved ? {status: "busy"} : {status: "available"}}
                                                     secondaryText={(parking.charger !== 0) ? "Dla pojazdów elektrycznych" : "Dla wszystkich samochodów"}>
                                            </Persona></Button>
                                    </PopoverTrigger>
                                    <PopoverSurface>
                                        <h3>Piętro {sector.floor}, Sektor {sector.sector} ({sector.sectorColor}), Miejsce {parking.place}</h3>
                                        <ul>
                                            <li>{(parking.charger !== 0) ? "Miejsce dla pojazdów elektrycznych (ładowarka " + parking.charger + " W)" : "Dla wszystkich pojazdów"}</li>
                                            <li>Opłata za postój: {parking.priceHour} zł/h</li>
                                        </ul>
                                        {(!parking.use && !parking.reserved) && (
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
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Homepage

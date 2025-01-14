import ParkingPlace from "../../interfaces/ParkingPlace.tsx";
import SectorData from "../../interfaces/SectorData.tsx";
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, MessageBar, MessageBarActions, MessageBarBody, Persona, Popover, PopoverSurface, PopoverTrigger } from "@fluentui/react-components";
import {CalendarAddFilled} from "@fluentui/react-icons";
import {Link} from "react-router-dom";
import axios from "../../../axiosConfig.ts";

function ParkingPlaceTile({ parkingPlace, sectorData }: { parkingPlace: ParkingPlace, sectorData: SectorData }) {
    const handleReserve = async(parkingPlace: number, sectorNum: number) => {
        axios.put('/data/setTakeReserve', {
            place: parkingPlace,
            sector: sectorNum
        }).then(response => {
            if(response.data.message === 'get booked') {
                console.log('Zarezerwowano!');
            }
        });
    }

    const handleFree = async(parkingPlace: number, sectorNum: number) => {
        axios.put('/data/setDropReserve', {
            place: parkingPlace,
            sector: sectorNum
        }).then(response => {
            if(response.data.message === 'drop book') {
                console.log('Rezerwacja odwołana!');
            }
        });
    }

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
                    {!parkingPlace.use && (
                        localStorage.getItem('token') ? (
                            <Dialog modalType={"alert"}>
                                <DialogTrigger disableButtonEnhancement>
                                    {!parkingPlace.reserved ? <Button icon={<CalendarAddFilled />} appearance="primary" style={{marginTop: '10px'}}>Zarezerwuj</Button> : <Button appearance="primary" style={{marginTop: '10px'}}>Odwołaj rezerwacje</Button>}
                                </DialogTrigger>
                                <DialogSurface>
                                    <DialogTitle>{!parkingPlace.reserved ? "Zarezerwuj miejsce" : "Odwołaj rezerwację"}</DialogTitle>
                                    <DialogBody>
                                        <DialogContent>
                                            {!parkingPlace.reserved ? "Czy napewno chcesz zarezerwować to miejsce?" : "Czy chcesz odwołać rezerwację?"}
                                            Czy napewno chcesz zarezerwować to miejsce?
                                            <ul>
                                                <li>Piętro {sectorData.floor}</li>
                                                <li>Sektor {sectorData.sector} ({sectorData.sectorColor})</li>
                                                <li>Miejsce {parkingPlace.place + 1}</li>
                                            </ul>
                                        </DialogContent>
                                    </DialogBody>
                                    <DialogActions>
                                        <DialogTrigger disableButtonEnhancement>
                                            <Button appearance="secondary">Anuluj</Button>
                                        </DialogTrigger>
                                        <DialogTrigger disableButtonEnhancement>
                                            {!parkingPlace.reserved ?
                                            <Button icon={<CalendarAddFilled />} appearance="primary" onClick={() => handleReserve(parkingPlace.place, sectorData.sector)}>Zarezerwuj</Button> : <Button appearance="primary" onClick={() => handleFree(parkingPlace.place, sectorData.sector)}>Odwołaj</Button>}

                                        </DialogTrigger>
                                    </DialogActions>
                                </DialogSurface>
                            </Dialog>
                            ) :
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

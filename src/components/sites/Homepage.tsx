import {useEffect, useState} from "react";
import axios from "../../../axiosConfig.ts";
import SectorData from "../../interfaces/SectorData";
import SpaceSkeleton from "../shared/SpaceSkeleton";
import '../../assets/styles/homepage.css'
import ParkingPlaceTile from "../shared/ParkingPlaceTile.tsx";

function Homepage() {
    const [isLoading, setIsLoading] = useState(false);
    const [sectorsData, setSectorsData] = useState<SectorData[]>([]);

    const handleDataFetching = () => {
        setIsLoading(true);
        axios.get('/data/readParkingInfo')
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
                                <ParkingPlaceTile parkingPlace={parking} sectorData={sector} key={key} />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Homepage

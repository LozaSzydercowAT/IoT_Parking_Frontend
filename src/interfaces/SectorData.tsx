import ParkingPlace from "./ParkingPlace.tsx";

export default interface SectorData {
    floor: number;
    sector: number;
    sectorColor: string;
    parkingSpaces: ParkingPlace[];
}

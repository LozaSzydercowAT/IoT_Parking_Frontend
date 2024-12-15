interface ParkingPlace {
    id: string;
    place: number;
    charger: number;
    use: boolean;
    time_use: Date;
    reserved: boolean;
    priceHour: number;
}

export default interface SectorData {
    floor: number;
    sector: number;
    sectorColor: string;
    parkingSpaces: ParkingPlace[];
}

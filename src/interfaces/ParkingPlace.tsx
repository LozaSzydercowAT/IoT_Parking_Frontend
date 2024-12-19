export default interface ParkingPlace {
    id: string;
    place: number;
    charger: number;
    use: boolean;
    time_use: Date;
    reserved: boolean;
    priceHour: number;
}

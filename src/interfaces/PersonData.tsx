export default interface PersonData {
    id: string;
    name: string;
    surname: string;
    balance: number;
    role: "user" | "admin";
}

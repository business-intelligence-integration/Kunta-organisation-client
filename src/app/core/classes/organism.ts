import { User } from "./user";

export class Organism{
    id: number = 0;
    name: string = "";
    creationDate: any;
    center: any;
    areas: any;
    area: any;
    club: any;
    observation: string = "";
    reference: string = "";
    member: User = new User();
    members: User[] = [];
    clubs: Organism[] = [];
    city: string = "";

    email: string = "";
    firstName: string = "";
    lastName: string = "";
    phoneNumber: string = "";
    userName: string = "";
}
import { Status } from "./status";
import { User } from "./user";

export class Organism{
    id: number = 0;
    name: string = "";
    organismName: string = "";
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
    cityRepre: string = "";

    emailRepre: string = "";
    firstNameRepre: string = "";
    lastNameRepre: string = "";
    phoneNumberRepre: string = "";
    userNameRepre: string = "";
    status: Status = new Status();
}
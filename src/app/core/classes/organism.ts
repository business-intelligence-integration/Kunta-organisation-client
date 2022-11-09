import { User } from "./user";

export class Organism{
    id: number = 0;
    name: string = "";
    creationDate: string = "";
    center: any
    areas: any;
    area: any;
    club: any;
    member: User = new User();
    members: User[] = [];
    clubs: Organism[] = [];;
}
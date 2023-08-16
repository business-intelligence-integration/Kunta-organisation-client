import { Account } from "./account";

export class Club{
    id: number = 0;
    name: string = "";
    creationDate: any;
    center: any
    areas: any;
    area: any;
    club: any;
    observation: string = "";
    reference: string = "";
    clubs: Club[] = [];
    accounts: Account[] = [];
    status: string = "";
}
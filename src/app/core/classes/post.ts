import { User } from "./user";

export class Post{
    id: number = 0;
    name: string = "";
    maxNumberOfUser: number = 0;
    description: string = "";
    organisationLevelEnum: string = "";
    operators: User[] = [];
    canBeDelete: boolean = false;

}
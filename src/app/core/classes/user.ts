import { Role } from "./role";

export class User{
    email:	string = "";
    firstName:	string = "";
    id:	number = 0;
    lastName:	string = "";
    password:	string = "";
    phoneNumber:	string = "";
    userName:	string = "";
    city: string = "";
    sponsoredUsers: User[] = []
    roles: Role[] = [];
}
import { Beneficiary } from "./beneficiary";
import { Civility } from "./civility";
import { Country } from "./country";
import { FamilySituation } from "./familySituation";
import { PieceType } from "./pieceType";
import { Post } from "./post";
import { Role } from "./role";
import { Status } from "./status";

export class User{
    email:	string = "";
    firstName:	string = "";
    id:	number = 0;
    lastName:	string = "";
    password:	string = "";
    phoneNumber:	string = "";
    userName:	string = "";
    city: string = "";
    dateOfIssue: any;
    dateOfValidity: any;
    mainAddress: string = "";
    nationalIDNumber: string = "";
    nationality: string = "";
    numberOfChildren: number = 0;
    pieceId: string = "";
    placeOfIssue: string = "";
    postalBox: string = "";
    secondPhoneNumber: string = "";
    secondaryAddress: string = "";
    secondaryEmail: string = "";
    whatsappPhoneNumber: string = "";
    remainingToPayByUser: number = 0;
    toBePaidByUser: number = 0;
    upToDate: boolean = false;
    sponsoredUsers: User[] = []
    beneficiaries: Beneficiary[] = [];
    roles: Role[] = [];
    status: Status = new Status();
    pieceType: PieceType = new PieceType();
    familySituation: FamilySituation = new FamilySituation();
    civility: Civility = new Civility();
    country: Country = new Country();
    post: Post = new Post();
}
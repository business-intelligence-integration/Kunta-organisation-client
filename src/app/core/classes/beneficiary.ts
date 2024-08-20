import { User } from "./user";

export class Beneficiary extends User{
    whatsAppNumber: string = "";
    phoneNumber:	string = "";
    override country: any;
    birthDate: string = "";
}
import { User } from "./user";

export class Beneficiary extends User{
    whatsAppNumber: string = "";
    country: string = "";
    pieceId: string = "";
    postalBox: string = "";
    birthDate: string = "";
}
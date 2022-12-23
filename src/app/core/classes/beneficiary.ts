import { PieceType } from "./pieceType";
import { User } from "./user";

export class Beneficiary extends User{
    whatsAppNumber: string = "";
    override country: any;
    birthDate: string = "";
}
import { PieceType } from "./pieceType";
import { User } from "./user";

export class Beneficiary extends User{
    whatsAppNumber: string = "";
    country: string = "";
    birthDate: string = "";
}
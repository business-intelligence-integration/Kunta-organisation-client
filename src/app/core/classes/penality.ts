import { PenalityType } from "./penalityType";
import { User } from "./user";

export class Penality{
    id: number = 0;
    date: any;
    paid: boolean = false;
    proof: string = "";
    penaltyType: PenalityType = new PenalityType();
    user: User = new User();
} 


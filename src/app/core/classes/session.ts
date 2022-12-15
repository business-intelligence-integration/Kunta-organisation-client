import { Payment } from "./payment";
import { Penality } from "./penality";
import { User } from "./user";

export class Session{
    contributionDeadline: any;
    date: any;
    id: number = 0;
    totalPaid :number = 0
    totalPenalties: number = 0
    totalToBePaid: number = 0
    hour: Hour = new Hour();
    payments: Payment[] = [];
    penalties: Penality[] = [];
    userPaymentStates: User[] = [];
}

class Hour {
    hour: string = "";
    minute: string = "";
    nano: number = 0;
    second: string = "";
}

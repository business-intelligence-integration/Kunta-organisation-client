import { Payment } from "./payment";
import { RiskProfile } from "./riskProfile";
import { User } from "./user";

export class Subscription {
    id: number = 0;
    riskProfile: RiskProfile = new RiskProfile();
    date: any;
    paid: boolean = false;
    proof: string = "";
    amount: number = 0;
    amountPaid: number = 0;
    payments: Payment[] = [];
    status: string = "";
    amountOfProfitability: number = 0;
    totalAmountReceivable: number = 0;
    totalAmountReceived: number = 0;
    subscriber: User = new User();
}
import { Payment } from "./payment";
import { RiskProfile } from "./riskProfile";

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
}
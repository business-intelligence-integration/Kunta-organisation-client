import { Payment } from "./payment";
import { User } from "./user";

export class SecurityDeposit {
    id: number = 0;
    amount: number = 0;
    depositUser: User = new User();
    amountPaid: number = 0;
    amountReceived: number = 0;
    amountToPay: number = 0;
    refundStatus: string = "";
    refundAmounts: Payment[] = [];
}
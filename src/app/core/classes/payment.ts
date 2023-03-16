import { PaymentMethod } from "./paymentMethod";
import { PaymentStatus } from "./PaymentStatus";
import { User } from "./user";

export class Payment{
    id: number = 0;
    date: any;
    paid: number = 0;
    proof: string = "";
    remainingToPay: number = 0;
    toBePaid: number = 0;
    paymentStatus: PaymentStatus = new PaymentStatus()
    paymentMethod: PaymentMethod = new PaymentMethod();
    user: User = new User();
} 
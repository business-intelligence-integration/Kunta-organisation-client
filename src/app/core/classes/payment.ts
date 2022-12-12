import { PaymentStatus } from "./PaymentStatus";

export class Payment{
    id: number = 0;
    date: any;
    paid: number = 0;
    proof: string = "";
    remainingToPay: number = 0;
    toBePaid: number = 0;
    paymentStatus: PaymentStatus = new PaymentStatus()
} 
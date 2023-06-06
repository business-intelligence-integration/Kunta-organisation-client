import { ReceivingParty } from "./receivingParty";

export class AllocationKey{
    id: number = 0;
    percentage: number = 0;
    receivingAmount: number = 0;
    receivingParty: ReceivingParty = new ReceivingParty();
}
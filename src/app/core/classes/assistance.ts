import { AllocationKey } from "./allocationKey";
import { Club } from "./club";
import { ProfitabilityType } from "./profitabilityType";
import { Refund } from "./refund";
import { RefundFrequency } from "./refundFrequency";
import { RefundType } from "./refundType";
import { SecurityDeposit } from "./securityDeposit";

export class Assistance {
    id: number = 0;
    assistanceAmount: number = 0;
    assistanceStatus: string = "";
    amountToBeRefunded: number = 0;
    amountRefunded: number = 0;
    distributionStatus: string = "";
    profitabilityAmount: number = 0;
    profitabilityRate: number = 0;
    profitabilityType: ProfitabilityType = new ProfitabilityType();
    refundType: RefundType = new RefundType();
    refundFrequency: RefundFrequency = new RefundFrequency();
    refundStatus: string = "";
    refundDateStatus: string = "";
    refunds: Refund[] = [];
    echeanceDurationInMonths: number = 0;
    assistanceClub: Club = new Club();
    endDate: any;
    startDate: any;
    status: string = "";
    allocationKeys: AllocationKey[] = [];
    securityDeposits: SecurityDeposit[] = [];
}
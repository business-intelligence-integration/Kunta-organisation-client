import { AllocationKey } from "./allocationKey";
import { Club } from "./club";
import { ProfitabilityType } from "./profitabilityType";
import { RefundType } from "./refundType";
import { SecurityDeposit } from "./securityDeposit";

export class Assistance {
    id: number = 0;
    assistanceAmount: number = 0;
    profitabilityAmount: number = 0;
    profitabilityRate: number = 0;
    profitabilityType: ProfitabilityType = new ProfitabilityType();
    refundType: RefundType = new RefundType();
    refundFrequency: string = "";
    echeanceDurationInMonths: number = 0;
    assistanceClub: Club = new Club();
    endDate: any;
    startDate: any;
    allocationKeys: AllocationKey[] = [];
    securityDeposits: SecurityDeposit[] = [];
    assistanceStatus: string = "";
}
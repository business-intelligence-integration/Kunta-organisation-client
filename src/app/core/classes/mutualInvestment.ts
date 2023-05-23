import { Account } from "./account";
import { Center } from "./center";
import { Organism } from "./organism";
import { ProfitabilityType } from "./profitabilityType";
import { Refund } from "./refund";
import { RefundType } from "./refundType";
import { RiskProfile } from "./riskProfile";
import { SecurityDeposit } from "./securityDeposit";
import { SubscriptionOffer } from "./subscriptionOffer";
import { User } from "./user";

export class MutualInvestment{
    echeanceDurationInMonths: number = 0;
    endDate: any;
    id: number = 0;
    minimumAmount: number = 0;
    name: string = ""
    organism: Organism = new Organism();
    profitabilityRate: number = 0;
    rating: number = 0;
    startDate: any;
    status: string = "";
    profitabilityType: ProfitabilityType[] = [];
    riskProfile: RiskProfile[] = [];
    profitabilityAmount: number = 0;
    securityDeposits: SecurityDeposit[] = [];
    offers: SubscriptionOffer[] = [];
    mutualCenter: Center = new Center();
    mutualInvestmentAccount: Account = new Account();
    collectedAmount: number = 0;
    amountRefunded: number = 0;
    amountToBeRefunded: number = 0;
    refundType: RefundType = new RefundType();
    // refundFrequency: RefundFrequency = new RefundFrequency();
    physicalPerson: User = new User();
    mutualInvesmentStatus: string = "";
    refundStatus: string = "";
    // firstRefundDate: string = "";
    refundDate: string = "";
    percentageMutual: number = 0;
    percentageOfFunders: number = 0;
    percentageOfGuarantees: number = 0;
    percentageOfPassiveIncomeFund: number = 0;
    refunds: Refund[] = [];
    distributionStatus: string = "";
    refundDateStatus: string = "";
  }
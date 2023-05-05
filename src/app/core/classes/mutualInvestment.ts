import { Account } from "./account";
import { Center } from "./center";
import { ProfitabilityType } from "./profitabilityType";
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
    organism: string = ""
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
    mutualist: User = new User();
  }
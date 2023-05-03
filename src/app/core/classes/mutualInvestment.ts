import { Center } from "./center";
import { ProfitabilityType } from "./profitabilityType";
import { RiskProfile } from "./riskProfile";
import { SecurityDeposit } from "./securityDeposit";
import { SubscriptionOffer } from "./subscriptionOffer";

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
    profitabilityType: ProfitabilityType[] = [];
    riskProfile: RiskProfile[] = [];
    profitabilityAmount: number = 0;
    securityDeposits: SecurityDeposit[] = [];
    offers: SubscriptionOffer[] = [];
    mutualCenter: Center = new Center();
  }
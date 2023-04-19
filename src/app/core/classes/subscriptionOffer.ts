import { ProfitabilityType } from "./profitabilityType";
import { RiskProfile } from "./riskProfile";
import { Subscription } from "./subscription";
import { User } from "./user";

export class SubscriptionOffer {
    id: number = 0;
    profitabilityType: ProfitabilityType = new ProfitabilityType();
    riskProfile: RiskProfile = new RiskProfile();
    profitabilityRate: number = 0;
    subscription: Subscription = new Subscription();
}
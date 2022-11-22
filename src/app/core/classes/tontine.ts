import { Frequency } from "./frequency";
import { Gain } from "./gain";
import { Level } from "./level";

export class Tontine{
  id: number = 0;
  accountBalance: number = 0;
  awardedLots: number = 0;
  collectedAmount: number = 0;
  collectedPenalties: number = 0;
  lotsToBeAwarded: number = 0;
  membersWithoutPenalties: number = 0;
  name: string =  "";
  peb: number = 0;
  registeredMembers: number = 0;
  level: Level = new Level();
  contributionFrequency: Frequency = new Frequency();
  tontineSessionFrequency: Frequency = new Frequency();
  gainMode: Gain = new Gain();
}
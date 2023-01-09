import { Account } from "./account";
import { Cycle } from "./cycle";
import { Frequency } from "./frequency";
import { Gain } from "./gain";
import { Level } from "./level";
import { Organism } from "./organism";
import { Status } from "./status";
import { TontineMembers } from "./tontineMembers";

export class Tontine{
  id: number = 0;
  accountBalance: number = 0;
  awardedLots: number = 0;
  collectedAmount: number = 0;
  collectedPenalties: number = 0;
  lotsToBeAwarded: number = 0;
  membersWithoutPenalties: number = 0;
  name: string =  "";
  durationInMonths: number = 0;
  peb: number = 0;
  registeredMembers: number = 0;
  observation: string = "";
  sessionsNumber: number = 0;
  status: Status = new Status();
  level: Level = new Level();
  contributionFrequency: Frequency = new Frequency();
  tontineSessionFrequency: Frequency = new Frequency();
  cycles: Cycle[] = [];
  gainMode: Gain = new Gain();
  clubOwner: Organism = new Organism();
  account: Account = new Account();
  tontineMembers: TontineMembers[] = [];
}
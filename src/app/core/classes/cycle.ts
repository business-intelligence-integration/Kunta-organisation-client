import { Session } from "./session";
import { Status } from "./status";

export class Cycle{
    id: number = 0;
    name: string = "";
    startDate: any;
    numberOfSessionPassed: number = 0;
    numberOfSessionRemaining: number = 0;
    echeanceNumber: number = 0;
    lotAmount: number = 0;
    endDate: any;
    sessions: Session[] = [];
    status: Status = new Status();
}
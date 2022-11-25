export class Session{
    contributionDeadline: any;
    date: any;
    id: number = 0;
   totalPaid :number = 0
    totalPenalties: number = 0
    totalToBePaid: number = 0
    hour: Hour = new Hour();
}

class Hour {
    hour: string = "";
    minute: string = "";
    nano: number = 0;
    second: string = "";
}

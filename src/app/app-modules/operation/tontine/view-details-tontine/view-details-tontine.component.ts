import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operation } from 'src/app/core/classes/operation';
import { Tontine } from 'src/app/core/classes/tontine';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-details-tontine',
  templateUrl: './view-details-tontine.component.html',
  styleUrls: ['./view-details-tontine.component.scss']
})
export class ViewDetailsTontineComponent implements OnInit {

  operation: Operation = new Operation();
  tontine: Tontine = new Tontine();
  totalExpectedContribution: number = 0;
  totalContributionReceived: number = 0;
  penaltyAfflicted : number = 0;
  penaltyPaid: number = 0;
  totalExpectedGain: number = 0;
  totalGainMade: number = 0;
  startDate: any;
  endDate: any;
  constructor(private activatedRoute: ActivatedRoute, 
    private tontineService: TontineService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTotine();
  }

  backBack(){this.location.back()}
  
  getTotine(){
    let totalExpectedContribution: number = 0;
    let totalContributionReceived: number = 0;
    let penaltyAfflicted : number = 0;
    let penaltyPaid: number = 0;
    let numberOfGainMade: number =0;
    let lotAmount: number = 0;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.findTontineById(params['id']).subscribe((res)=>{
        console.log("tontine::", res);
        
        this.tontine = res.data
        this.startDate = res.data.cycles[0].startDate;
        this.endDate = res.data.cycles[res.data.cycles.length - 1].endDate;
        this.totalExpectedGain = res.data.cycles.length * res.data.cycles[0].lotAmount * res.data.cycles[0].sessions.length;
        lotAmount = res.data.cycles[0].lotAmount;
        res.data.cycles.map((cycle:any)=>{
            cycle.sessions.map((session:any)=>{
              if(session.winner != null){
                numberOfGainMade = numberOfGainMade + 1;
              }
              totalExpectedContribution = totalExpectedContribution + session.totalToBePaid;
              totalContributionReceived = totalContributionReceived + session.totalPaid;
              session.penalties.map((penalty:any)=>{
                penaltyAfflicted = penaltyAfflicted + penalty.penaltyType.amount;
                if(penalty.paid == true){
                  penaltyPaid = penaltyPaid + penalty.penaltyType.amount;
                }
              })

            })          
          })

          this.totalExpectedContribution = totalExpectedContribution;
          this.totalContributionReceived = totalContributionReceived
          this.penaltyAfflicted = penaltyAfflicted;
          this.penaltyPaid = penaltyPaid;
          this.totalGainMade = lotAmount * numberOfGainMade;
      });
    })
  }

}

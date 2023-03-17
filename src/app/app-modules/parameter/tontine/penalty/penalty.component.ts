import { Component, OnInit } from '@angular/core';
import { ManagePenalty } from 'src/app/core/classes/managePenalty';
import { Penality } from 'src/app/core/classes/penality';
import { PenaltyService } from 'src/app/core/services/penalty/penalty.service';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss']
})
export class PenaltyComponent implements OnInit {

  penalties: Penality[] = [];
  managePenalties: ManagePenalty[] = [];

  constructor(private penaltyService: PenaltyService) { }

  ngOnInit(): void {
    this.getAllPenalties();
  }

  getAllPenalties(){
    this.penaltyService.findAllPenalties().subscribe((res)=>{
      this.penalties = res.data;
      console.log("managePenalties::", res);
      
    })
  }
}

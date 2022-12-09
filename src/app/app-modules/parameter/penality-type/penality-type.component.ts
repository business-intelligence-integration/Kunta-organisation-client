import { Component, OnInit } from '@angular/core';
import { PenalityType } from 'src/app/core/classes/penalityType';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';

@Component({
  selector: 'app-penality-type',
  templateUrl: './penality-type.component.html',
  styleUrls: ['./penality-type.component.scss']
})
export class PenalityTypeComponent implements OnInit {

  penaltyTypes: PenalityType[] = [];

  constructor(private penaltyTypeService: PenaltyTypeService) { }

  ngOnInit(): void {
    this.getAllPenalType();
  }

  getAllPenalType(){
    this.penaltyTypeService.findAllPenaltyTypes().subscribe((res)=>{
      this.penaltyTypes = res.data;
    })
  }

}

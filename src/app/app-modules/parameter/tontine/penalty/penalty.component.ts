import { Component, OnInit } from '@angular/core';
import { ManagePenalty } from 'src/app/core/classes/managePenalty';
import { Penality } from 'src/app/core/classes/penality';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PenaltyService } from 'src/app/core/services/penalty/penalty.service';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss']
})
export class PenaltyComponent implements OnInit {

  show: boolean = false;
  penalties: Penality[] = [];
  managePenalties: ManagePenalty[] = [];

  constructor(private penaltyService: PenaltyService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllPenalties();
  }

  getAllPenalties(){
    this.penaltyService.findAllPenalties().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.penalties = res.data;
        if( this.penalties.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }
}

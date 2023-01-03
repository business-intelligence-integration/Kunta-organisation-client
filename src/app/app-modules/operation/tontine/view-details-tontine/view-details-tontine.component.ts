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
  constructor(private activatedRoute: ActivatedRoute, 
    private tontineService: TontineService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTotine();
  }

  backBack(){this.location.back()}
  
  getTotine(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.findTontineById(params['id']).subscribe((res)=>{
        this.tontine = res.data
      });
    })
  }

}

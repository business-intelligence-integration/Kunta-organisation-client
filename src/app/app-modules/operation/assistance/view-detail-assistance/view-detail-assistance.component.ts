import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from "@angular/common";
import { Assistance } from 'src/app/core/classes/assistance';
import { AssistanceService } from 'src/app/core/services/assistance/assistance.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-view-detail-assistance',
  templateUrl: './view-detail-assistance.component.html',
  styleUrls: ['./view-detail-assistance.component.scss']
})
export class ViewDetailAssistanceComponent implements OnInit {

  assistance: Assistance = new Assistance();

  constructor(private activatedRoute: ActivatedRoute, 
    private assistanceService: AssistanceService,
    private location: Location,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAssistance();
  }

  backBack(){this.location.back()}

  getAssistance(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.assistanceService.findAssistanceById(params['id']).subscribe((res) => {
        this.assistance = res.data;
      })
      this.loaderService.hideLoader();
    })
    this.loaderService.hideLoader();
  }

}

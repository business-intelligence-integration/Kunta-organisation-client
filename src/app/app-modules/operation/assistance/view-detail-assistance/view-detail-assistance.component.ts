import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from "@angular/common";
import { Assistance } from 'src/app/core/classes/assistance';
import { AssistanceService } from 'src/app/core/services/assistance/assistance.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';

@Component({
  selector: 'app-view-detail-assistance',
  templateUrl: './view-detail-assistance.component.html',
  styleUrls: ['./view-detail-assistance.component.scss']
})
export class ViewDetailAssistanceComponent implements OnInit {

  assistance: Assistance = new Assistance();
  clubBalance: number = 0;

  constructor(private activatedRoute: ActivatedRoute, 
    private assistanceService: AssistanceService,
    private clubService: ClubService,
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
        this.clubService.getclubById(res.data.assistanceClub.id).subscribe((res) => {
          this.clubBalance = res.data.accounts[0].balance;          
        })
      })
      this.loaderService.hideLoader();
    })
    this.loaderService.hideLoader();
  }

}

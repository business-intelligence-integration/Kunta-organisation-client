import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from "@angular/common";
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';

@Component({
  selector: 'app-view-detail-mutual-investment',
  templateUrl: './view-detail-mutual-investment.component.html',
  styleUrls: ['./view-detail-mutual-investment.component.scss']
})
export class ViewDetailMutualInvestmentComponent implements OnInit {

  mutualInvestment: MutualInvestment = new MutualInvestment();

  constructor(private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMutualInvestment();
  }

  backBack(){this.location.back()}

  getMutualInvestment(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mutualInvestmentService.findMutualInvestmentById(params['id']).subscribe((res) => {
        this.mutualInvestment = res.data;
      })
    })
  }

}

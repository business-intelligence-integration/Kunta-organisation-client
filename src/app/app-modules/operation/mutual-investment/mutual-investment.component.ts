import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';

@Component({
  selector: 'app-mutual-investment',
  templateUrl: './mutual-investment.component.html',
  styleUrls: ['./mutual-investment.component.scss']
})
export class MutualInvestmentComponent implements OnInit {

  openCreateModal: string = ""
  createMutualInvestmentForm!: FormGroup
  endDate: any;
  startDate: any;

  constructor(private mutualInvestmentService: MutualInvestmentService) { }

  ngOnInit(): void {
    this.getAllMutualInvestments();
  }

  getAllMutualInvestments(){
    this.mutualInvestmentService.findAllMutualInvestments().subscribe((res)=>{
      console.log("res::", res);
      
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  onCloseCreateModal(){
    this.openCreateModal = "";
  }

  onSubmitCreateMutualInvestmentForm(){

  }

}

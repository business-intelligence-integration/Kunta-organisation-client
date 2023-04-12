import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DroweeForm } from 'src/app/core/classes/droweeForm';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';
import { ProfitabilityType } from 'src/app/core/classes/profitabilityType';
import { RefundType } from 'src/app/core/classes/refundType';
import { DraweeFormService } from 'src/app/core/services/mutual-investment/drawee-form/drawee-form.service';
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { ProfitabilityTypeService } from 'src/app/core/services/mutual-investment/profitability-type/profitability-type.service';
import { RefundTypeService } from 'src/app/core/services/mutual-investment/refund-type/refund-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-mutual-investment',
  templateUrl: './mutual-investment.component.html',
  styleUrls: ['./mutual-investment.component.scss']
})
export class MutualInvestmentComponent implements OnInit {
  ngSelect1 = 0;
  ngSelect2 = 0;
  ngSelect3 = 0;
  openCreateModal: string = ""
  createMutualInvestmentForm!: FormGroup
  endDate: any;
  startDate: any;
  createMutualInvestment: boolean = false;
  isSaving: boolean = false;
  draweeForms: DroweeForm[] = [];
  profitabilityTypes: ProfitabilityType[] = [];
  refundTypes: RefundType[] = [];
  mutualInvestment: MutualInvestment = new MutualInvestment();
  mutualInvestments: MutualInvestment[] = []
  constructor(private mutualInvestmentService: MutualInvestmentService,
    private draweeFormService: DraweeFormService,
    private formBuilder: FormBuilder, 
    private profitabilityTypeService: ProfitabilityTypeService,
    private refundTypeService: RefundTypeService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllMutualInvestments();
    this.getAllDroweeForm();
    this.getAllProfitabilityType();
    this.getAllRefundTypes();
    this.formInit();
  }

  formInit() {
    this.createMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organism: new FormControl(null, Validators.required),
      minimumAmount: new FormControl(null, Validators.required),
      idDraweeForm: new FormControl(null, Validators.required),
      idProfitabilityType: new FormControl(null, Validators.required),
      idRefundType: new FormControl(null, Validators.required),
      profitabilityRate: new FormControl(null, Validators.required),
      echeanceDurationInMonths: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })
  }

  getAllMutualInvestments(){
    this.mutualInvestmentService.findAllMutualInvestments().subscribe((res)=>{
      this.mutualInvestments = res.data;
    })
  }

  getAllDroweeForm(){
    this.draweeFormService.findAllDraweeForm().subscribe((res)=>{
      this.draweeForms = res.data;
    })
  }

  getAllProfitabilityType(){
    this.profitabilityTypeService.findAllProfitabilityTypes().subscribe((res)=>{
      this.profitabilityTypes = res.data;
    })
  }

  getAllRefundTypes(){
    this.refundTypeService.findAllRefundTypes().subscribe((res)=>{
      this.refundTypes = res.data;
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  onCloseCreateModal(){
    this.openCreateModal = "";
  }

  onSubmitMutualInvestment(){
    const formValue = this.createMutualInvestmentForm.value;
    this.mutualInvestment.echeanceDurationInMonths = formValue.echeanceDurationInMonths;
    this.mutualInvestment.minimumAmount = formValue.minimumAmount;
    this.mutualInvestment.name = formValue.name;
    this.mutualInvestment.endDate = formValue.endDate;
    this.mutualInvestment.startDate = formValue.startDate;
    this.mutualInvestment.organism = formValue.organism;
    this.mutualInvestment.profitabilityRate = formValue.profitabilityRate;
    this.mutualInvestment.rating = formValue.rating;
    this.createAMutualInvestment(this.mutualInvestment, formValue.idDraweeForm, formValue.idRefundType, formValue.idProfitabilityType);
    
  }

  createAMutualInvestment(mutualInvestment: MutualInvestment, idDraweeForm: number, idRefundType: number, idProfitabilityType: number){
    this.mutualInvestmentService.createMutualInvestment(mutualInvestment, idDraweeForm, idRefundType, idProfitabilityType).subscribe(()=>{
      this.utilityService.showMessage(
        'success',
        'Placement mutualisé crée avec succès !',
        '#06d6a0',
        'white'
      );
      this.getAllMutualInvestments();
    },(error)=>{
      console.log("error::", error);
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onCreateMutualInvestment(){
    this.createMutualInvestment = true;
  }

  cancelCreatingMutualInvestment(){
    this.createMutualInvestment = false;
  }

  onSelectIsstartDate(event: any){

  }

  onSelectIsendDate(event: any){

  }
  onCreate(){
    this.onSubmitMutualInvestment();
  }
}

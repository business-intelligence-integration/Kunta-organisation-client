import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { Refund } from 'src/app/core/classes/refund';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { RefundService } from 'src/app/core/services/refund/refund.service';

@Component({
  selector: 'app-view-detail-refund',
  templateUrl: './view-detail-refund.component.html',
  styleUrls: ['./view-detail-refund.component.scss']
})
export class ViewDetailRefundComponent implements OnInit {
  show: boolean = false;
  ngSelect1 = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  refunds: Refund[] = [];
  mutualInvestment: MutualInvestment = new MutualInvestment();
  idInvestment: number = 0;
  idRefund: number = 0;
  refundForm!: FormGroup;
  isSaving: boolean = false;
  openRefundModal: string = "";
  openViewRefundsModal: string = "";
  payment: Payment = new Payment();
  paymentMethods: PaymentMethod[] = [];
  dateNow: any;
  amountCollecteds: Payment[] = [];

  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private mutualInvestmentService: MutualInvestmentService,
    private refundService: RefundService,
    private paymentMethodService: PaymentMethodService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getMutualInvestment();
    this.getAllPaymentMethod();
    this.formInit();
  }

  formInit() {
    this.refundForm = this.formBuilder.group({
      paid: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      idPaymentMethod: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

  activeHomeSider() {
    if (this.activeToggle == "") {
      this.activeToggle = "active";
      this.homeSider = "is-active";
      this.isPushed = "is-pushed-full";
    } else {
      this.activeToggle = "";
      this.homeSider = "";
      this.isPushed = "";
    }
  }

  getMutualInvestment(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mutualInvestmentService.findMutualInvestmentById(params['id']).subscribe((res)=>{
        if (res == null) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.mutualInvestment = res.data;
          this.refunds = res.data.refunds;
          this.idInvestment = params['id'];
          if( this.refunds.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = true;
            this.loaderService.hideLoader();
          }
        }
        
      });
    })
  }

  getAllPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data;
    })
  }

  //////////////////////////////// onRefund User
  onSelectDate(event: any){

  }

  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  onRefund(idRefund: number){
    this.openRefundModal = "is-active";
    this.idRefund = idRefund;
  }

  onCloseRefundModal(){
    this.openRefundModal = "";
  }

  onSubmitRefund(){
    // let idPaymentMethod: number = 0;
    this.isSaving = true;
    const formValue = this.refundForm.value;
    this.payment.paid = formValue.paid;
    this.payment.proof = formValue.proof;
    this.payment.date = formValue.date;
    this.mutualInvestmentService.refundOfAmountsCollected(this.idRefund, formValue.idPaymentMethod, this.payment).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getMutualInvestment();
          this.refundForm.reset();
          this.onCloseRefundModal();
          this.utilityService.showMessage(
            'success',
            'Remboursement payé avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
    },()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  ////////////////////////////// View Collected Refunds
  onViewRefunds(idRefund: number){
    this.openViewRefundsModal = "is-active";
    this.idRefund = idRefund;
    this.findRefundById();
  }

  findRefundById() {
    this.refundService.findRefundById(this.idRefund).subscribe((res) => {
      this.amountCollecteds = res.data.amountCollecteds;
    })
  }

  closeViewRefundsModal(){
    this.openViewRefundsModal = "";
  }

}

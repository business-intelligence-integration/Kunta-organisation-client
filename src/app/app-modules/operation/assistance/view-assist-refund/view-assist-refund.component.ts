import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';import { Assistance } from 'src/app/core/classes/assistance';
import { Refund } from 'src/app/core/classes/refund';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { RefundService } from 'src/app/core/services/refund/refund.service';
import { Picture } from 'src/app/core/classes/picture';
import { DomSanitizer } from '@angular/platform-browser';
import { AmountCollectedService } from 'src/app/core/services/mutual-investment/amount-collected/amount-collected.service';
import { AssistanceService } from 'src/app/core/services/assistance/assistance.service';

@Component({
  selector: 'app-view-assist-refund',
  templateUrl: './view-assist-refund.component.html',
  styleUrls: ['./view-assist-refund.component.scss']
})
export class ViewAssistRefundComponent implements OnInit {

  show: boolean = false;
  ngSelect1 = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  refunds: Refund[] = [];
  assistance: Assistance = new Assistance();
  idAssistance: number = 0;
  idRefund: number = 0;
  idAmountCollected: number = 0;
  refundForm!: FormGroup;
  isSaving: boolean = false;
  openImageModal: string = "";
  openRefundModal: string = "";
  openViewRefundsModal: string = "";
  payment: Payment = new Payment();
  paymentMethods: PaymentMethod[] = [];
  dateNow: any;
  amountCollecteds: Payment[] = [];
  dateStatus: string = "";
  picture = new Picture();

  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private assistanceService: AssistanceService,
    private refundService: RefundService,
    private paymentMethodService: PaymentMethodService,
    public amountCollectedService: AmountCollectedService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAssistance();
    this.getAllPaymentMethod();
    this.initDates();
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

  getAssistance(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.assistanceService.findAssistanceById(params['id']).subscribe((res)=>{
        if (res == null) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.assistance = res.data;
          this.dateStatus = res.data.refundDateStatus;
          this.refunds = res.data.refunds;
          this.idAssistance = params['id'];
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
    this.assistanceService.refundOfAmountsCollected(this.idRefund, formValue.idPaymentMethod, this.payment).subscribe((res)=>{
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
          this.getAssistance();
          this.refundForm.reset();
          this.onCloseRefundModal();
          this.utilityService.showMessage(
            'success',
            'Remboursement payé avec succès',
            '#06d6a0',
            'white'
          );
          this.onSavePicture(res.data.id);
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

  ////////////////////// Upload Image
  onSelectPicture(event: any){
   
    if(!event.target.files[0] || event.target.files.length == 0){
      return;
    }

    let mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) == null){
      return;
    }

    if(event.target.files.length){
      const picture: Picture = {
        file: event.target.files[0],
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(event.target.files[0])
        ),
      };
      this.picture = picture;
    }
  }

  onSavePicture(idAmountCollected: number){
    const photoFormData = this.prepareFormData(this.picture);
    this.amountCollectedService.uploadAmountCollectedPicture(photoFormData, idAmountCollected).subscribe((res: any)=>{

    })
  }

  prepareFormData(picture: Picture): FormData {
    const formData = new FormData();
    formData.append('file', picture.file, picture.file.name);
    return formData;
  }

  ////////////////////// Image Modal Box
  onImageModalBox(id: number) {
    this.idAmountCollected = id;
    this.openImageModal = "is-active";
  }

  closeImageModal() {
    this.openImageModal = "";
  }

}

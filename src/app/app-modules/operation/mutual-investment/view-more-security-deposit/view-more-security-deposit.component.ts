import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {DatePipe, Location} from "@angular/common";
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { User } from 'src/app/core/classes/user';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { Payment } from 'src/app/core/classes/payment';
import { SecurityDepositService } from 'src/app/core/services/security-deposit/security-deposit.service';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from 'src/app/core/classes/picture';
import { RefundAmountService } from 'src/app/core/services/refund-amount/refund-amount.service';

@Component({
  selector: 'app-view-more-security-deposit',
  templateUrl: './view-more-security-deposit.component.html',
  styleUrls: ['./view-more-security-deposit.component.scss']
})
export class ViewMoreSecurityDepositComponent implements OnInit {

  show: boolean = false;
  ngSelect1 = 0;
  ngSelectPayment = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  securityDeposits: SecurityDeposit[] = [];
  idDeposit: number = 0;
  idRefundAmount: number = 0;
  idInvestment: number = 0;
  openImageModal: string = "";
  openDepositModal: string = "";
  openRefundDepositModal: string = "";
  openViewAmountsModal: string = "";
  centerUserOfSelect: any;
  addSecurityDepositForm!: FormGroup;
  refundDepositForm!: FormGroup;
  isSaving: boolean = false;
  securityDeposit: SecurityDeposit = new SecurityDeposit();
  mutualInvestment: MutualInvestment = new MutualInvestment();
  dateNow: any;
  paymentMethods: PaymentMethod[] = [];
  payment: Payment = new Payment();
  amountCollecteds: Payment[] = [];
  picture = new Picture();

  constructor( private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private securityDepositService: SecurityDepositService,
    private paymentMethodService: PaymentMethodService,
    public refundAmountService: RefundAmountService,
    private centerService: CenterService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getMutualSecurityDeposit();
    this.getAllPaymentMethod();
    this.initDates();
    this.formInit();
  }

  formInit() {
    this.addSecurityDepositForm = this.formBuilder.group({
      idUser: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })

    this.refundDepositForm = this.formBuilder.group({
      idPaymentMethod: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      paid: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

  getMutualSecurityDeposit(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mutualInvestmentService.findMutualInvestmentById(params['id']).subscribe((res)=>{
        this.idInvestment = params['id'];
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.mutualInvestment = res.data;
          this.securityDeposits = res.data.securityDeposits;
          console.log("securityDeposits:: ", res.data.securityDeposits);
          
          if( this.securityDeposits.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = false;
            this.loaderService.hideLoader();
          }
        }
      });
    })
  }

  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

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

  getAllPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data;
    })
  }

  onDeleteSecurityDeposit(id: number){
    this.deleteMessage(id);
  }

  deleteMessage(idDeposit: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, retirer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mutualInvestmentService.deleteSecurityDeposit(this.idInvestment, idDeposit).subscribe(
            () => {
              this.getMutualSecurityDeposit();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Caution a été retiré.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'La suppression a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  ///////////////// Add Security Deposit
  onOpenAddSecurityDeposit(){
    this.openDepositModal = "is-active";
    this.getMutualInvestmentById(this.idInvestment);
  }

  getMutualInvestmentById(idInvestment: number){
    this.mutualInvestmentService.findMutualInvestmentById(idInvestment).subscribe((res)=>{
      this.getAllUsersByIdCenter(res.data.mutualCenter.id);
    });
  }

  getAllUsersByIdCenter(idMutualCenter: number){
    this.centerService.findMutualistsByIdCenter(idMutualCenter).subscribe((res)=>{
      this.centerUserOfSelect = res.data.map((user:any)=>({value: user.id, label: user.firstName + " " + user.lastName}));
    })
  }

  closeSecurityDepositModal() {
    this.openDepositModal = "";
  }

  onAddSecurtiyDeposit() {
    const formValue = this.addSecurityDepositForm.value;
    this.securityDeposit.amount = formValue.amount;
    this.addSecurityDeposit(this.idInvestment, formValue.idUser, this.securityDeposit)
  }

  addSecurityDeposit(idInvestment: number, idUser: number, securityDeposit: SecurityDeposit) {
    this.isSaving = true;
    this.mutualInvestmentService.addSecurityDeposit(idInvestment, idUser, securityDeposit).subscribe((res) => {
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
          this.getMutualSecurityDeposit();
          this.closeSecurityDepositModal();
          this.utilityService.showMessage(
            'success',
            'Caution ajoutée avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.closeSecurityDepositModal();
        this.addSecurityDepositForm.reset();
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
    }, (error) => {
      console.log("error: ", error);
      this.isSaving = false;
      this.closeSecurityDepositModal();
      this.addSecurityDepositForm.reset();
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }
  
  /////////////////////////////// Refunds Funders
  onRefundDeposit(idDeposit: number){
    this.idDeposit = idDeposit;
    this.openRefundDepositModal = "is-active";
  }

  closeRefundDepositModal() {
    this.openRefundDepositModal = "";
  }

  onSubmitRefundDeposit() {
    this.isSaving = true;
    const formValue = this.refundDepositForm.value;
    this.payment.paid = formValue.paid;
    this.payment.proof = formValue.proof;
    this.payment.date = formValue.date;
    this.securityDepositService.refundAmountSecutityDeposit(this.idDeposit, formValue.idPaymentMethod ,this.payment).subscribe((res)=>{
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
          this.getMutualSecurityDeposit();
          this.refundDepositForm.reset();
          this.closeRefundDepositModal();
          this.utilityService.showMessage(
            'success',
            'Caution remboursée avec succès',
            '#06d6a0',
            'white'
          );
          this.onSavePicture(res.data.id)
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite, verifier votre saisis',
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

  ////////////////////////////// View Collected Amounts
  onViewPayments(idDeposit: number){
    this.openViewAmountsModal = "is-active";
    this.idDeposit = idDeposit;
    this.findDepositById();
  }

  findDepositById() {
    this.securityDepositService.findSecurityDepositById(this.idDeposit).subscribe((res) => {
      this.amountCollecteds = res.data.refundAmounts;
    })
  }

  closeViewAmountsModal(){
    this.openViewAmountsModal = "";
  }

  //////////////////////////// Upload Picture
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

  onSavePicture(idPayment: number){
    const photoFormData = this.prepareFormData(this.picture);
    this.refundAmountService.uploadRefundAmountPicture(photoFormData, idPayment).subscribe((res: any)=>{
      console.log("res:: ", res);
    })
  }

  prepareFormData(picture: Picture): FormData {
    const formData = new FormData();
    formData.append('file', picture.file, picture.file.name);
    return formData;
  }

    ////////////////////// Image Modal Box
    onImageModalBox(id: number) {
      this.idRefundAmount = id;
      this.openImageModal = "is-active";
    }
  
    closeImageModal() {
      this.openImageModal = "";
    }
}

import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { SubscriptionPaymentService } from 'src/app/core/services/mutual-investment/subscription-payment/subscription-payment.service';
import { SubscriptionService } from 'src/app/core/services/mutual-investment/subscription/subscription.service';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-detail-payment',
  templateUrl: './view-detail-payment.component.html',
  styleUrls: ['./view-detail-payment.component.scss']
})
export class ViewDetailPaymentComponent implements OnInit {

  show: boolean = false;
  ngSelectPaymentMethod = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  updatePaymentForm!: FormGroup;
  addPaymentForm!: FormGroup;
  isSaving: boolean = false;
  payment: Payment = new Payment();
  payments: Payment[] = [];
  openUpdateModal: string = "";
  openPaymentModal: string = "";
  idSubscriptionOffer: number = 0;
  idSubscription: number = 0;
  idInvestment: number = 0;
  subscription: Subscription = new Subscription();
  subscriptions: Subscription[] = [];
  dateNow: any;
  date: any;
  paymentMethods: PaymentMethod[] = [];

  constructor( private activatedRoute: ActivatedRoute, 
    private subscriptionPaymentService: SubscriptionPaymentService,
    private paymentMethodService: PaymentMethodService,
    private subscriptionService: SubscriptionService,
    private formBuilder: FormBuilder,
    private location: Location,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }
  
    ngOnInit(): void {
      this.loaderService.showLoader();
      this.getSubscriptionPayment();
      this.getPaymentMethod();
      this.initDates();
      this.formInit();
  }

  formInit() {
    this.addPaymentForm = this.formBuilder.group({
      date: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      paid: new FormControl(null, Validators.required),
      idPaymentMethod: new FormControl(null, Validators.required),
    });

    this.updatePaymentForm = this.formBuilder.group({
      proof: new FormControl(null, Validators.required),
    });

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

  getSubscriptionPayment(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.subscriptionService.findPaymentSubscriptionPaymentById(params['id']).subscribe((res)=>{
        this.idSubscription = params['id'];
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.payments = res.data.payments;
          if( this.payments.length <= 0 ) {
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

  // getAllSubscriptionPayments(){
  //   this.subscriptionPaymentService.findAllSubscriptionsPayments().subscribe((res) => {
  //     this.payments = res.data;
  //     console.log("payments:: ", res.data);
      
  //   })
  // }

  ///////////////// Update Payment
  onSelectDate(event: any){

  }

  onOpenUpdateModal(id: number){
    this.subscriptionPaymentService.findPaymentSubscriptionPaymentById(id).subscribe((res)=>{
      this.payment = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdatePaymentForm(id: number){
    this.isSaving = true;
    const formValue = this.updatePaymentForm.value;
    this.payment.proof =formValue.proof;
    this.subscriptionPaymentService.updateSubscriptionPayment(id, this.payment).subscribe((res)=>{
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
          this.getSubscriptionPayment();
          this.closeUpdatePaymentModal();
          this.isSaving = false;
          this.utilityService.showMessage(
            'success',
            'Paiement modifié avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.closeUpdatePaymentModal()
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
    },()=>{
      this.isSaving = false;
      this.closeUpdatePaymentModal()
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  closeUpdatePaymentModal(){
    this.openUpdateModal = "";
  }

  ///////////// Delete Offer
  onDelete(id: number){
    this.deleteMessage(id);
  }

  deleteMessage(id: number) {
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
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.subscriptionPaymentService.deletePaymentSubscriptionPayment(id).subscribe(
            (res) => {
              this.getSubscriptionPayment();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Paiement supprimé avec succès !',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\est produite',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'Vous avez annulé la suppression',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  ///////////////////// Create Payment
  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  getPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data
    })
  }

  onOpenAddPayment(){
    this.openPaymentModal = "is-active";
    this.idSubscription = this.idSubscription;
  }

  closePaymentModal(){
    this.openPaymentModal = "";
  }

  onAddPayment(){
    const formValue = this.addPaymentForm.value;
    this.payment.date = formValue.date;
    this.payment.proof = formValue.proof;
    this.payment.paid = formValue.paid;
    this.addPayment(this.idSubscription, formValue.idPaymentMethod, this.payment);
  }

  addPayment( idSubscription: number, idPaymentMethod: number, payment: Payment){
    this.isSaving = true;
    this.subscriptionService.createPaymentForSubscription(idSubscription, idPaymentMethod, payment).subscribe((res)=>{
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
          this.getSubscriptionPayment();
          this.closePaymentModal();
          this.utilityService.showMessage(
            'success',
            'Paiement effectue avec succes !',
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

}

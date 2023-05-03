import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { RiskProfile } from 'src/app/core/classes/riskProfile';
import { Subscription } from 'src/app/core/classes/subscription';
import { User } from 'src/app/core/classes/user';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { RiskProfileService } from 'src/app/core/services/mutual-investment/risk-profile/risk-profile.service';
import { SubscriptionOfferService } from 'src/app/core/services/mutual-investment/subscription-offer/subscription-offer.service';
import { SubscriptionService } from 'src/app/core/services/mutual-investment/subscription/subscription.service';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-detail-subscription',
  templateUrl: './view-detail-subscription.component.html',
  styleUrls: ['./view-detail-subscription.component.scss']
})
export class ViewDetailSubscriptionComponent implements OnInit {

  ngSelect1 = 0;
  ngSelect2 = 0;
  ngSelect3 = 0;
  ngSelect4 = 0;
  ngSelectPaymentMethod = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  subscription: Subscription = new Subscription();
  payment: Payment = new Payment();
  subscriptions: Subscription[] = [];
  idSubscriptionOffer: number = 0;
  idSubscription: number = 0;
  idInvestment: number = 0;
  updateSubscriptionForm!: FormGroup;
  addPaymentForm!: FormGroup;
  addSubscriptionForm!: FormGroup;
  isSaving: boolean = false;
  openUpdateModal: string = "";
  openSubscriptionModal: string = "";
  openPaymentModal: string = "";
  riskProfiles: RiskProfile[] = [];
  geUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/money_f3bgzk.png";
  users: User[] =[];
  paymentMethods: PaymentMethod[] = [];
  date: any;
  dateNow: any;

  constructor( private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private centerService: CenterService,
    private subscriptionOfferService: SubscriptionOfferService,
    private riskProfileService: RiskProfileService,
    private subscriptionService: SubscriptionService,
    private paymentMethodService: PaymentMethodService,
    private formBuilder: FormBuilder,
    private location: Location,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getOfferSubscription();
    this.getAllRiskProfiles();
    this.getMutualInvestment();
    this.getPaymentMethod();
    this.initDates();
    this.formInit();
  }

  formInit() {
    this.updateSubscriptionForm = this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
    });

    this.addPaymentForm = this.formBuilder.group({
      date: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      paid: new FormControl(null, Validators.required),
      idPaymentMethod: new FormControl(null, Validators.required),
    });

    this.addSubscriptionForm = this.formBuilder.group({
      idRiskProfile: new FormControl(null, Validators.required),
      idSubscriber: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

  getOfferSubscription(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.subscriptionOfferService.findSubscriptionOfferById(params['id']).subscribe((res)=>{
        this.idSubscriptionOffer = params['id'];
        this.subscriptions = res.data.subscriptions;
      });
    })
  }

  getAllRiskProfiles(){
    this.riskProfileService.findAllRiskProfiles().subscribe((res)=>{
      this.riskProfiles = res.data;
    })
  }

  getMutualInvestment(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mutualInvestmentService.findMutualInvestmentById(params['idInvestment']).subscribe((res)=>{
        this.idInvestment = params['idInvestment'];
        this.getAllUsersByIdCenter(res.data.mutualCenter.id);
      });
    })
  }

  getAllUsersByIdCenter(idMutualCenter: number){
    this.centerService.findUsersByIdCenter(idMutualCenter).subscribe((res)=>{
      this.users = res.data;
    })
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

  ///////////////// Update Subscription
  onOpenUpdateModal(id: number){
    this.subscriptionService.findPaymentSubscriptionPaymentById(id).subscribe((res)=>{
      console.log("subscription:..", res.data);
      this.subscription = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateSubscriptionForm(id: number){
    this.isSaving = true;
    const formValue = this.updateSubscriptionForm.value;
    this.subscription.amount =formValue.amount;
    this.subscriptionService.updateSubscriptionPayment(id, this.subscription).subscribe((res)=>{
      this.getOfferSubscription();
      this.closeUpdateSubscriptionModal();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Souscription modifiée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.closeUpdateSubscriptionModal()
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  closeUpdateSubscriptionModal(){
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
          this.subscriptionService.deletePaymentSubscriptionPayment(id).subscribe(
            (res) => {
              this.getOfferSubscription();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Souscription supprimée avec succès !',
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

  ///////////////// Add Payment
  onSelectDate(event: any){

  }

  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  getPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data
    })
  }

  onOpenAddPayment(id: number){
    this.openPaymentModal = "is-active";
    this.idSubscription = id;
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
      console.log("subscription::", res.data);
      this.isSaving = false;
      this.getOfferSubscription();
      this.closePaymentModal();
      this.utilityService.showMessage(
        'success',
        'Paiement effectue avec succes !',
        '#06d6a0',
        'white'
      );
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

  ///////////////////// Create Subscription
  onOpenAddSubscription(){
    this.openSubscriptionModal = "is-active";
  }

  closeSubscriptionModal(){
    this.openSubscriptionModal = "";
  }

  onAddSubscription() {
    const formValue = this.addSubscriptionForm.value;
    this.subscription.amount = formValue.amount;
    this.addSubscription(this.subscription, this.idSubscriptionOffer, formValue.idSubscriber, formValue.idRiskProfile)
  }

  addSubscription(subscription: Subscription, idSubscriptionOffer: number, idSubscriber: number, idRiskProfile: number) {
    this.isSaving = true;
    this.subscriptionService.createSubscription(subscription, idSubscriptionOffer, idSubscriber, idRiskProfile).subscribe((res) => {
      this.isSaving = false;
      this.getOfferSubscription();
      this.addSubscriptionForm.reset();
      this.closeSubscriptionModal();
      this.utilityService.showMessage(
        'success',
        'Offre ajoutée avec succès',
        '#06d6a0',
        'white'
      );
    }, (error) => {
      console.log("error: ", error);
      this.isSaving = false;
      this.closeSubscriptionModal();
      this.addSubscriptionForm.reset();
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  /////////////////////// Release Payment
  onRelease(id: number){
    this.releaseMessage(id);
  }

  releaseMessage(id: number) {
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
        confirmButtonText: 'Oui, liberer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.subscriptionService.releaseSubscription(id).subscribe(
            (res) => {
              this.getOfferSubscription();
              swalWithBootstrapButtons.fire({
                title: 'Liberé !',
                text: 'Souscription liberée avec succès !',
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
            text: 'Vous avez annulé la liberation de cette souscription',
            confirmButtonColor: '#d33',
          });
        }
      });
  }


}

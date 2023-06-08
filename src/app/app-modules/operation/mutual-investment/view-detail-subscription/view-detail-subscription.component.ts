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
import { LoaderService } from 'src/app/core/services/loader/loader.service';
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

  show: boolean = false;
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
  centerUserOfSelect: any;
  paymentMethods: PaymentMethod[] = [];
  date: any;
  dateNow: any;
  totalPaid: number = 0;
  amountToPay: number = 0;
  riskLevel: number = 0;
  mutualInvesmentStatus: string = "";

  constructor( private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private centerService: CenterService,
    private subscriptionOfferService: SubscriptionOfferService,
    private riskProfileService: RiskProfileService,
    private subscriptionService: SubscriptionService,
    private paymentMethodService: PaymentMethodService,
    private formBuilder: FormBuilder,
    private location: Location,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
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
      idSubscriber: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

  getOfferSubscription(){
    let totalPaid: number = 0;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.subscriptionOfferService.findSubscriptionOfferById(params['id']).subscribe((res)=>{
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          console.log("Souscriptions:: ", res.data.subscriptions);
          
          this.idSubscriptionOffer = params['id'];
          this.riskLevel = res.data.riskProfile.riskLevel;
          this.subscriptions = res.data.subscriptions;
          // this.subscriptions.forEach((element)=>{
          //   element.payments.forEach((el)=>{
          //     totalPaid = totalPaid + el.paid;
          //   })
          // })
          // this.totalPaid = totalPaid;
          if( this.subscriptions.length <= 0 ) {
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

  getAllRiskProfiles(){
    this.riskProfileService.findAllRiskProfiles().subscribe((res)=>{
      this.riskProfiles = res.data;
    })
  }

  getMutualInvestment(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mutualInvestmentService.findMutualInvestmentById(params['idInvestment']).subscribe((res)=>{
        this.idInvestment = params['idInvestment'];
        this.mutualInvesmentStatus = res.data.mutualInvesmentStatus;
        this.getAllMutualistsByIdCenter(res.data.mutualCenter.id);
      });
    })
  }

  getAllMutualistsByIdCenter(idMutualCenter: number){
    this.centerService.findMutualistsByIdCenter(idMutualCenter).subscribe((res)=>{
      this.centerUserOfSelect = res.data;
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
      this.subscription = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateSubscriptionForm(id: number){
    this.isSaving = true;
    const formValue = this.updateSubscriptionForm.value;
    this.subscription.amount =formValue.amount;
    this.subscriptionService.updateSubscriptionPayment(id, this.subscription).subscribe((res)=>{
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
          this.getOfferSubscription();
          this.closeUpdateSubscriptionModal();
          this.utilityService.showMessage(
            'success',
            'Souscription modifiée avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.closeUpdateSubscriptionModal()
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
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
          this.getOfferSubscription();
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
    this.addSubscription(this.subscription, this.idSubscriptionOffer, formValue.idSubscriber)
  }

  addSubscription(subscription: Subscription, idSubscriptionOffer: number, idSubscriber: number) {
    this.isSaving = true;
    this.subscriptionService.createSubscription(subscription, idSubscriptionOffer, idSubscriber).subscribe((res) => {
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
          this.getOfferSubscription();
          this.addSubscriptionForm.reset();
          this.closeSubscriptionModal();
          this.utilityService.showMessage(
            'success',
            'Souscription ajoutée avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.closeSubscriptionModal();
        this.addSubscriptionForm.reset();
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
    }, (error) => {
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

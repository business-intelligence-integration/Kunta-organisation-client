import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/core/classes/center';
import { RiskProfile } from 'src/app/core/classes/riskProfile';
import { SubscriptionOffer } from 'src/app/core/classes/subscriptionOffer';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { RiskProfileService } from 'src/app/core/services/mutual-investment/risk-profile/risk-profile.service';
import { SubscriptionOfferService } from 'src/app/core/services/mutual-investment/subscription-offer/subscription-offer.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-more-subscription-offer',
  templateUrl: './view-more-subscription-offer.component.html',
  styleUrls: ['./view-more-subscription-offer.component.scss']
})
export class ViewMoreSubscriptionOfferComponent implements OnInit {

  ngSelect1 = 0;
  ngSelect2 = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  offer: SubscriptionOffer = new SubscriptionOffer();
  offers: SubscriptionOffer[] = [];
  idInvestment: number = 0;
  updateOfferForm!: FormGroup;
  addSubscriptionForm!: FormGroup;
  isSaving: boolean = false;
  openUpdateModal: string = "";
  openSubscriptionModal: string = "";
  riskProfiles: RiskProfile[] = [];
  centers: Center[] = [];

  constructor( private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private subscriptionOfferService: SubscriptionOfferService,
    private riskProfileService: RiskProfileService,
    private centerService: CenterService,
    private formBuilder: FormBuilder,
    private location: Location,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getMutualSubscriptionOffer();
    this.formInit();
  }

  formInit() {
    this.updateOfferForm = this.formBuilder.group({
      profitabilityRate: new FormControl(null, Validators.required),
    });

    this.addSubscriptionForm = this.formBuilder.group({
      idRiskProfile: new FormControl(null, Validators.required),
      idSubscriber: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

  getMutualSubscriptionOffer(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mutualInvestmentService.findMutualInvestmentById(params['id']).subscribe((res)=>{
        this.idInvestment = params['id'];
        this.offers = res.data.offers;
      });
    })
  }

  getAllRiskProfiles(){
    this.riskProfileService.findAllRiskProfiles().subscribe((res)=>{
      this.riskProfiles = res.data;
    })
  }

  getAllCenterUsers(id: number){
    this.centerService.getAllCenterUsersId(id).subscribe((res)=>{
      this.centers = res.data;
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
  
  ///////////////// Update Offer
  onOpenUpdateModal(id: number){
    this.subscriptionOfferService.findSubscriptionOfferById(id).subscribe((res)=>{
      console.log("offer:..", res.data);
      this.offer = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateOfferForm(id: number){
    this.isSaving = true;
    const formValue = this.updateOfferForm.value;
    this.offer.profitabilityRate =formValue.profitabilityRate;
    this.subscriptionOfferService.updateSubscriptionOffer(this.offer, id).subscribe((res)=>{
      this.getMutualSubscriptionOffer();
      this.closeUpdateOfferModal();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Offre de souscription modifiée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.closeUpdateOfferModal()
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  closeUpdateOfferModal(){
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
          this.subscriptionOfferService.deleteSubscriptionOffer(id).subscribe(
            () => {
              this.getMutualSubscriptionOffer();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Profile du risque supprimé avec succès !',
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

  ///////////////// Add Subscription
  onOpenAddSubscription(id: number){
    this.openSubscriptionModal = "is-active";
  }

  closeSubscriptionModal(){
    this.openSubscriptionModal = "";
  }

  onAddSubscription(){

  }

}

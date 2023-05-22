import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionOffer } from 'src/app/core/classes/subscriptionOffer';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { SubscriptionOfferService } from 'src/app/core/services/mutual-investment/subscription-offer/subscription-offer.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-offer',
  templateUrl: './subscription-offer.component.html',
  styleUrls: ['./subscription-offer.component.scss']
})
export class SubscriptionOfferComponent implements OnInit {

  show: boolean = false;
  offer: SubscriptionOffer = new SubscriptionOffer();
  offers: SubscriptionOffer[] = [];
  openUpdateModal: string = "";
  updateOfferForm!: FormGroup;
  isSaving: boolean = false;
  
  constructor(private subscriptionOfferService: SubscriptionOfferService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllSubscriptionOffers();
    this.formInit();
  }

  formInit() {
    this.updateOfferForm = this.formBuilder.group({
      profitabilityRate: new FormControl(null, Validators.required),
    })
  }

  getAllSubscriptionOffers() {
    this.subscriptionOfferService.findAll().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.offers = res.data;
        if( this.offers.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      } 
    })
  }


  ///////////////// Update Offer
  onOpenUpdateModal(id: number){
    this.subscriptionOfferService.findSubscriptionOfferById(id).subscribe((res)=>{
      this.offer = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateOfferForm(id: number){
    this.isSaving = true;
    const formValue = this.updateOfferForm.value;
    this.offer.profitabilityRate =formValue.profitabilityRate;
    this.subscriptionOfferService.updateSubscriptionOffer(this.offer, id).subscribe((res)=>{
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
          this.getAllSubscriptionOffers();
          this.closeUpdateOfferModal();
          this.utilityService.showMessage(
            'success',
            'Offre de souscription modifiée avec succès !',
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
              this.getAllSubscriptionOffers();
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

}

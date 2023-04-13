import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RiskProfile } from 'src/app/core/classes/riskProfile';
import { RiskProfileService } from 'src/app/core/services/mutual-investment/risk-profile/risk-profile.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent implements OnInit {

  riskProfile: RiskProfile = new RiskProfile();
  riskProfiles: RiskProfile[] = [];
  openCreateModal: string = "";
  openUpdateModal: string = "";
  createRiskProfileForm!: FormGroup;
  updateRiskProfileForm!: FormGroup;
  isSaving: boolean = false;

  constructor(private riskProfileService: RiskProfileService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllRiskProfiles();
    this.formInit();
  }

  formInit() {
    this.createRiskProfileForm = this.formBuilder.group({
      riskLevel: new FormControl(null, Validators.required),
    })
    this.updateRiskProfileForm = this.formBuilder.group({
      riskLevel: new FormControl(null, Validators.required),
    })
  }

  getAllRiskProfiles(){
    this.riskProfileService.findAllRiskProfiles().subscribe((res)=>{
      this.riskProfiles = res.data;
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  closeRiskProfileModal(){
    this.openCreateModal = "";
  }

  closeUpdateRiskProfileModal(){
    this.openUpdateModal = "";
  }

  onSubmitCreateRiskProfileForm(){
    this.isSaving = true;
    const formValue = this.createRiskProfileForm.value;
    this.riskProfile.riskLevel =formValue.riskLevel;
    this.riskProfileService.createRiskProfile(this.riskProfile).subscribe((res)=>{
      this.isSaving = false;
      this.getAllRiskProfiles();
      this.closeRiskProfileModal();
      this.utilityService.showMessage(
        'success',
        'Profile de risque crée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.closeRiskProfileModal();
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onOpenUpdateModal(id: number){
    this.riskProfileService.findRiskProfileById(id).subscribe((res)=>{
      this.riskProfile = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateRiskProfileForm(id: number){
    this.isSaving = true;
    const formValue = this.updateRiskProfileForm.value;
    this.riskProfile.riskLevel =formValue.riskLevel;
    this.riskProfileService.updateRiskProfile(this.riskProfile, id).subscribe((res)=>{
      this.getAllRiskProfiles();
      this.closeUpdateRiskProfileModal()
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Profile de risque modifié avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.closeUpdateRiskProfileModal()
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

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
          this.riskProfileService.deleteRiskProfile(id).subscribe(
            () => {
              this.getAllRiskProfiles();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Type de remboussement supprimé avec succès !',
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

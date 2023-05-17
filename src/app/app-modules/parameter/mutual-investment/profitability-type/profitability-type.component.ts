import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfitabilityType } from 'src/app/core/classes/profitabilityType';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ProfitabilityTypeService } from 'src/app/core/services/mutual-investment/profitability-type/profitability-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profitability-type',
  templateUrl: './profitability-type.component.html',
  styleUrls: ['./profitability-type.component.scss']
})
export class ProfitabilityTypeComponent implements OnInit {

  show: boolean = false;
  profitabilityType: ProfitabilityType = new ProfitabilityType();
  profitabilityTypes: ProfitabilityType[] = [];
  openCreateModal: string = "";
  openUpdateModal: string = "";
  createProfitabilityForm!: FormGroup;
  updateProfitabilityForm!: FormGroup;
  isSaving: boolean = false;
  constructor(private profitabilityTypeService: ProfitabilityTypeService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllProfitabilityType();
    this.formInit();
  }

  formInit() {
    this.createProfitabilityForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })
    this.updateProfitabilityForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })
  }
  getAllProfitabilityType(){
    this.profitabilityTypeService.findAllProfitabilityTypes().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.profitabilityTypes = res.data;
        if( this.profitabilityTypes.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  closeCreateProfitabilityModal(){
    this.openCreateModal = "";
  }

  openCreateProfitabilityModal(){
    this.openCreateModal = "is-active";
  }

  closeUpdateProfitabilityModal(){
    this.openUpdateModal = "";
  }

  openUpdateProfitabilityModal(){
    this.openUpdateModal = "is-active";
  }

  onSubmitUpdateProfitabilityForm(idType: number){
    this.isSaving = true;
    const formValue = this.createProfitabilityForm.value;
    this.profitabilityType.label =formValue.label;
    this.profitabilityTypeService.updateProfitabilityType(this.profitabilityType, idType).subscribe((res)=>{
      this.getAllProfitabilityType();
      this.closeUpdateProfitabilityModal();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Le type de rentabilité a été modifié avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
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
    this.profitabilityTypeService.findProfitabilityTypeById(id).subscribe((res)=>{
      this.profitabilityType = res.data;
      this.openUpdateModal = "is-active";
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
          this.profitabilityTypeService.deleteProfitabilityType(id).subscribe(
            () => {
              this.getAllProfitabilityType();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Type de rentabilité supprimé avec succès !',
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

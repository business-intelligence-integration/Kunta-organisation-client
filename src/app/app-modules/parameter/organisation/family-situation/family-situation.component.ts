import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilySituation } from 'src/app/core/classes/familySituation';
import { FamilySituationService } from 'src/app/core/services/family-situation/family-situation.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family-situation',
  templateUrl: './family-situation.component.html',
  styleUrls: ['./family-situation.component.scss']
})
export class FamilySituationComponent implements OnInit {

  show: boolean = false;
  openCreateModal: string = "";
  openUpdateModal: string = "";
  familySituation: FamilySituation = new FamilySituation();
  familySituations: FamilySituation[] = [];
  isSaving: boolean = false

  createFamilySituationForm!: FormGroup;
  updateFamilySituationForm!: FormGroup;

  constructor(private familySituationService: FamilySituationService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllSituationFamily();
    this.formInit();
  }

  formInit() {
    this.createFamilySituationForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })

    this.updateFamilySituationForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  closeCreateModal(){
    this.openCreateModal = "";
  }

  closeUpdateModal(){
    this.openUpdateModal = ""
  }

  getAllSituationFamily(){
    this.familySituationService.findAllFamilySituations().subscribe((res)=> {
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.familySituations = res.data;
        if( this.familySituations.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    }) 
  }

  onOpenUpdateModal(id: number){
    this.familySituationService.findFamilySituationById(id).subscribe((res)=>{
      this.familySituation = res.data
      this.openUpdateModal = "is-active"
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
          this.familySituationService.deleteFamilySituation(id).subscribe(
            () => {
              this.getAllSituationFamily();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'La situation familiale a bien été supprimé !.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite !',
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

  onSubmitFamilySituation(){
    const formValue = this.createFamilySituationForm.value;
    this.familySituation.label =formValue.label;
    this.createFamilySituation(this.familySituation);
  }

  createFamilySituation(familySituation: FamilySituation){
    this.isSaving = true;
    this.familySituationService.createFamilySituation(familySituation).subscribe((res)=>{
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
          this.getAllSituationFamily();
          this.closeCreateModal();
          this.utilityService.showMessage(
            'success',
            'Situation familiale crée avec succès !',
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
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur d\'est produites',
        '#e62965',
        'white'
      );
    })
  }

  onSubmitUpdateFamilySituation(id: number){
    const formValue = this.updateFamilySituationForm.value;
    this.familySituation.label = formValue.label;
    this.updateFamilySituation(id, this.familySituation);
  }

  updateFamilySituation(id: number, famlilySituation: FamilySituation){
    this.isSaving = true;
    this.familySituationService.updateFamilySituation(id, famlilySituation).subscribe((res)=>{
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
          this.getAllSituationFamily();
          this.closeUpdateModal();
          this.utilityService.showMessage(
            'success',
            'Situation familiale modifiée avec succès !',
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
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur d\'est produites',
        '#e62965',
        'white'
      );
    })
  }
}

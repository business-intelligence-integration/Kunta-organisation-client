import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilySituation } from 'src/app/core/classes/familySituation';
import { FamilySituationService } from 'src/app/core/services/family-situation/family-situation.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-family-situation',
  templateUrl: './family-situation.component.html',
  styleUrls: ['./family-situation.component.scss']
})
export class FamilySituationComponent implements OnInit {

  openCreateModal: string = "";
  openUpdateModal: string = "";
  familySituation: FamilySituation = new FamilySituation();
  familySituations: FamilySituation[] = [];
  isSaving: boolean = false

  createFamilySituationForm!: FormGroup;
  updateFamilySituationForm!: FormGroup;

  constructor(private familySituationService: FamilySituationService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
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
      this.familySituations = res.data;
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
        title: 'Vous êtes sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
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
                title: 'Deleted !',
                text: 'La situation familiale a bien été supprimé !.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'une erreur s\'est produite !',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'you have cancelled the deletion',
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
    this.familySituationService.createFamilySituation(familySituation).subscribe(()=>{
      this.getAllSituationFamily();
      this.closeCreateModal();
      this.utilityService.showMessage(
        'success',
        'Situation familiale crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'une erreur d\'est produites',
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
    this.familySituationService.updateFamilySituation(id, famlilySituation).subscribe(()=>{
      this.isSaving = false;
      this.getAllSituationFamily();
      this.closeUpdateModal();
      this.utilityService.showMessage(
        'success',
        'Situation familiale modifiée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'une erreur d\'est produites',
        '#e62965',
        'white'
      );
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DroweeForm } from 'src/app/core/classes/droweeForm';
import { DraweeFormService } from 'src/app/core/services/mutual-investment/drawee-form/drawee-form.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drawee-form',
  templateUrl: './drawee-form.component.html',
  styleUrls: ['./drawee-form.component.scss']
})
export class DraweeFormComponent implements OnInit {

  draweeForm: DroweeForm = new DroweeForm();
  draweeForms: DroweeForm[] = [];
  openCreateModal: string = "";
  openUpdateModal: string = "";
  createDraweeFormForm!: FormGroup;
  updateDraweeFormForm!: FormGroup;
  isSaving: boolean = false;
  constructor(private draweeFormService: DraweeFormService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllDroweeForm();
    this.formInit();  
  }

  formInit() {
    this.createDraweeFormForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
    this.updateDraweeFormForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }
  getAllDroweeForm(){
    this.draweeFormService.findAllDraweeForm().subscribe((res)=>{
      this.draweeForms = res.data;
    })
  }

  closeCreateDraweeFormModal(){
    this.openCreateModal = "";
  }
  closeUpdateDraweeFormModal(){
    this.openUpdateModal = "";
  }

  onOpenCreateDraweeModal(){
    this.openCreateModal = "is-active";
  }


  onSubmitCreateDraweeForm(){
    this.isSaving = true;
    const formValue = this.createDraweeFormForm.value;
    this.draweeForm.label =formValue.label;
    this.draweeForm.description =formValue.description;
    this.draweeFormService.createDraweeForm(this.draweeForm).subscribe(()=>{
      this.isSaving = false;
      this.getAllDroweeForm();
      this.closeCreateDraweeFormModal();
      this.utilityService.showMessage(
        'success',
        'Formulaire de tirage au sort crée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.closeCreateDraweeFormModal();
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
    this.draweeFormService.findDraweeFormById(id).subscribe((res)=>{
      this.draweeForm = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateDraweeForm(id: number){
    this.isSaving = true;
    const formValue = this.updateDraweeFormForm.value;
    this.draweeForm.label =formValue.label;
    this.draweeForm.description =formValue.description;
    this.draweeFormService.updateDraweeForm(this.draweeForm, id).subscribe((res)=>{
      this.isSaving = false;
      this.getAllDroweeForm();
      this.closeUpdateDraweeFormModal();
      this.utilityService.showMessage(
        'success',
        'Formulaire de tirage au sort modifié avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.closeUpdateDraweeFormModal();
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onDelete(id: number){
    this.deleteMessage(id)
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
          this.draweeFormService.deleteDraweeForm(id).subscribe(
            () => {
              this.getAllDroweeForm();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Formulaire de tirage supprimé avec succès !',
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

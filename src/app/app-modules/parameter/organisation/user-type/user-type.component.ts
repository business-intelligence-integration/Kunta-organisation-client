import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/app/core/classes/userType';
import { UserTypeService } from 'src/app/core/services/user-type/user-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  createTypeForm!: FormGroup
  updateTypeForm!: FormGroup
  openCreateModal: string = "";
  openUpdateModal: string = "";
  isSaving: boolean = false;
  types: UserType[] = [];
  type: UserType = new UserType();

  constructor(private formBuilder: FormBuilder, 
    private userTypeService: UserTypeService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.formInit();
    this.finAllUsersType();
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active"
  }

  closeCreateModal(){
    this.openCreateModal = ""
  }

  finAllUsersType(){
    this.userTypeService.getAllUsersType().subscribe((res)=>{
      this.types = res.data;      
    })
  }

  formInit() {
    this.createTypeForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

    this.updateTypeForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }

  onCreateType(){
    this.isSaving = true
    const formValue = this.createTypeForm.value;
    this.type.label = formValue.label;
    this.type.description = formValue.description;
    this.createType(this.type);
  }

  createType(type: UserType){
    this.userTypeService.createUserType(type).subscribe((res)=>{
      this.closeCreateModal();
      this.finAllUsersType();
      this.createTypeForm.reset();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Type crée avec succès',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onDeleteType(id: number){
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
          this.userTypeService.deleteUserType(id).subscribe(
            () => {
              this.finAllUsersType();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Le type a bien été supprimé !.',
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

  onOpenUpdateType(id: number){
    this.userTypeService.findUsersTypeById(id).subscribe((res)=>{
      this.openUpdateModal = "is-active";
      this.type = res.data;
      console.log("Open update...", res.data);
      
    })
  }

  closeUpdateModal(){
    this.openUpdateModal = "";
  }

  onUpdateType(id: number){
    this.isSaving = true
    const formValue = this.updateTypeForm.value;
    this.type.label = formValue.label;
    this.type.description = formValue.description;
    this.updateType(this.type, id);
  }

  updateType(Type: UserType, idType: number){
    this.userTypeService.updateUserType(Type, idType).subscribe((res)=>{
      this.finAllUsersType();
      this.closeUpdateModal()
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Type modifié avec succès',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

}

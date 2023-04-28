import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCategory } from 'src/app/core/classes/userCategory';
import { UserCategoryService } from 'src/app/core/services/user-category/user-category.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-category',
  templateUrl: './user-category.component.html',
  styleUrls: ['./user-category.component.scss']
})
export class UserCategoryComponent implements OnInit {

  createCategoryForm!: FormGroup
  updateCategoryForm!: FormGroup
  openCreateModal: string = "";
  openUpdateModal: string = "";
  isSaving: boolean = false;
  categories: UserCategory[] = [];
  category: UserCategory = new UserCategory();

  constructor(private formBuilder: FormBuilder, 
    private userCategoryService: UserCategoryService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.formInit();
    this.finAllUsersCategory();
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active"
  }

  closeCreateModal(){
    this.openCreateModal = ""
  }

  finAllUsersCategory(){
    this.userCategoryService.getAllUsersCategory().subscribe((res)=>{
      this.categories = res.data;
    })
  }

  formInit() {
    this.createCategoryForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
    })

    this.updateCategoryForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
    })
  }

  onCreateCategory(){
    this.isSaving = true
    const formValue = this.createCategoryForm.value;
    this.category.name = formValue.name;
    this.category.description = formValue.description;
    this.createCategory(this.category);
  }

  createCategory(category: UserCategory){
    this.userCategoryService.createUserCategory(category).subscribe((res)=>{
      this.closeCreateModal();
      this.finAllUsersCategory();
      this.isSaving = false;
      this.createCategoryForm.reset();
      this.utilityService.showMessage(
        'success',
        'Categorie crée avec succès',
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

  onDeleteCategory(id: number){
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
          this.userCategoryService.deleteUserCategory(id).subscribe(
            (res) => {
              console.log("response...", res);
              
              this.finAllUsersCategory();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'La Category a bien été supprimé !.',
                confirmButtonColor: '#198AE3',
              });
            },
            (error) => {
              console.log("error...", error);
              
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

  onOpenUpdateCategory(id: number){
    this.userCategoryService.findUsersCategoryById(id).subscribe((res)=>{
      this.openUpdateModal = "is-active";
      this.category = res.data;
    })
  }

  closeUpdateModal(){
    this.openUpdateModal = "";
  }

  onUpdateCategory(id: number){
    this.isSaving = true
    const formValue = this.updateCategoryForm.value;
    this.category.name = formValue.name;
    this.category.description = formValue.description;
    this.updateCategory(this.category, id);
  }

  updateCategory(category: UserCategory, idCategory: number){
    this.userCategoryService.updateUserCategory(category, idCategory).subscribe((res)=>{
      this.finAllUsersCategory();
      this.closeUpdateModal()
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Categorie modifiée avec succès',
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

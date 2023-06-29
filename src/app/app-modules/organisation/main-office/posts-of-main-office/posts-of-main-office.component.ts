import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Function } from 'src/app/core/classes/function';
import { Post } from 'src/app/core/classes/post';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts-of-main-office',
  templateUrl: './posts-of-main-office.component.html',
  styleUrls: ['./posts-of-main-office.component.scss']
})
export class PostsOfMainOfficeComponent implements OnInit {

  show: boolean = false;
  posts: Post[] = []
  operators: any;
  openOperatorModal: string = "";
  addOperatorForm!: FormGroup;
  isSaving: boolean = false;
  functions: Function[] = [];
  ngSelectFunction = 0;
  idPost: number = 0;
  idMainOffice: number = 0;

  constructor(private postService: PostService, 
    private mainOfficeService: MainOfficeService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private fonctionService: FonctionService,
    private loaderService: LoaderService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    // this.getAllPostsOfMainOffice();
    this.loaderService.showLoader();
    this.getAllMainOffices();
    this.getAllOperators(); 
    this.formInit();
    this.getAllFunctions();
  }

  formInit() {
    this.addOperatorForm = this.formBuilder.group({
      idOperator: new FormControl(null, Validators.required),
      idFunction: new FormControl(null, Validators.required)
    })
  }

  getAllMainOffices(){
    this.mainOfficeService.findAllOffices().subscribe((res)=>{
      this.idMainOffice = res.data[0].id;
      this.getAllPostByIdMainOffice(this.idMainOffice);
    })
  }

  getAllPostByIdMainOffice(id: number){
    this.postService.finAllPostByIdMainOffice(id).subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        console.log("Liste de posts:: ", res.data);
        
        this.posts = res.data;
        if( this.posts.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    });
  }

  onOpenAddOperatorModal(id: number){
    this.openOperatorModal = "is-active";
    this.idPost = id;
  }

  closeOperatorModal(){
    this.openOperatorModal = "";
  }

  onSubmitOperator(){
    const formValue = this.addOperatorForm.value;
    this.addOperatorToMainOffice(formValue.idOperator, formValue.idFunction)
  }

  getAllOperators(){
    this.userService.findUsersByRoleName('OPERATOR').subscribe((res)=>{
      this.operators = res.data.map((operator: any)=>({value: operator.id, label: operator.firstName + " " + operator.lastName}))
    })
  }

  getAllFunctions(){
    this.fonctionService.findAllFunctions().subscribe((res)=>{
      this.functions = res.data;
    })
  }

  addOperatorToMainOffice(idOperator: number, idFunction: number){
    this.isSaving = true;
    this.postService.addOperatorToPost(idOperator, this.idPost, idFunction).subscribe((res)=>{
      this.isSaving = false;
      if(res.data == null){
        this.utilityService.showMessage(
          'warning',
          'Un membre ne peut appartenir à 2 postes !',
          '#e62965',
          'white'
        );
      }else{
        this.getAllMainOffices();
        this.closeOperatorModal();
        this.utilityService.showMessage(
          'success',
          'Opérateur ajouté au poste avec succès !',
          '#06d6a0',
          'white'
        );
      }
    },(res)=>{
      if(res.error.status == "BAD_REQUEST"){
        this.isSaving = false;
        this.utilityService.showMessage(
          'warning',
          res.error.message,
          '#e62965',
          'white'
        );
      }else{
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
      
    })
  }

  ////////////////// Delete Mutual Investment
  onDeletePost(id: number) {
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
          this.postService.deletePost(id).subscribe(
            () => {
              this.getAllMainOffices();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Le post a été supprimé avec succès !.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'La supprission a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

}

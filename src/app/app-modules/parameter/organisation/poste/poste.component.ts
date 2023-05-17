import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/core/classes/post';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent implements OnInit {
  show: boolean = false;
  ngSelect1 = 0;
  ngSelect2 = 0;
  createPosteForm!: FormGroup
  updatePosteForm!: FormGroup
  openCreateModal: string = ""
  openUpdateModal: string = ""
  isTheNumberOfUsersLimited: boolean = false;
  isSaving: boolean = false;
  posts: Post[] = [];
  post: Post = new Post();
  constructor(private formBuilder: FormBuilder, 
    private postService: PostService,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.formInit();
    this.finAllPosts();
  }



  onOpenCreateModal(){
    this.openCreateModal = "is-active"
  }

  closeCreateModal(){
    this.openCreateModal = ""
  }

  formInit() {
    this.createPosteForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organisationLevel: new FormControl(null, Validators.required),
      description: new FormControl(null),
      maxNumberOfUser: new FormControl(null),
    })

    this.updatePosteForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organisationLevel: new FormControl(null, Validators.required),
      description: new FormControl(null),
      maxNumberOfUser: new FormControl(null),
    })
  }

  isLimited(){
    this.isTheNumberOfUsersLimited = true
  }

  isNotLimited(){
    this.isTheNumberOfUsersLimited = false;
  }

  finAllPosts(){
    this.postService.findAllPosts().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.posts = res.data;
        if( this.posts.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      } 
    })
  }

  onCreatePoste(){
    this.isSaving = true
    const formValue = this.createPosteForm.value;
    this.post.name = formValue.name;
    this.post.maxNumberOfUser = formValue.maxNumberOfUser;
    this.post.organisationLevelEnum = formValue.organisationLevel;
    this.post.description = formValue.description;
    this.createPost(this.post);
  }

  createPost(post: Post){
    this.postService.createPost(post).subscribe((res)=>{
      this.closeCreateModal();
      this.finAllPosts();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Poste crée avec succès',
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

  onDeletePoste(id: number){
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
              this.finAllPosts();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Le poste a bien été supprimé !.',
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

  onUpdatePost(id: number){
    this.postService.findPostById(id).subscribe((res)=>{
      this.post = res.data;
      if(this.post.maxNumberOfUser > 0){
        this.isTheNumberOfUsersLimited = true
      }else{
        this.isTheNumberOfUsersLimited = false
      }
      this.openUpdateModal = "is-active";
    })
  }

  closeUpdateModal(){
    this.openUpdateModal = "";
  }

  onUpdatePoste(id: number){
    this.isSaving = true
    const formValue = this.updatePosteForm.value;
    this.post.name = formValue.name;
    if(this.isTheNumberOfUsersLimited){
      if(formValue.maxNumberOfUser <= 0){
        this.isSaving = false;
        this.utilityService.showMessage(
          'warning',
          'Le nombre limité d\'utilisateur ne peut pas être inférieur ou égale à 0',
          '#e62965',
          'white'
        )
      }else{
        this.post.maxNumberOfUser = formValue.maxNumberOfUser;
        this.post.organisationLevelEnum = formValue.organisationLevel;
        this.post.description = formValue.description;
        this.updatePost(this.post, id);
      };
    }else{
      this.post.maxNumberOfUser = 0;
      this.post.organisationLevelEnum = formValue.organisationLevel;
      this.post.description = formValue.description;
      this.updatePost(this.post, id);
    };
   
  }

  updatePost(post: Post, id: number){
    this.postService.updatePost(post, id).subscribe((res)=>{
      this.finAllPosts();
      this.closeUpdateModal()
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Poste modifié avec succès',
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

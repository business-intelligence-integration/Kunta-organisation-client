import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Club } from 'src/app/core/classes/club';
import { Organism } from 'src/app/core/classes/organism';
import { Post } from 'src/app/core/classes/post';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
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
  ngSelectLevelCreate: any = 0;
  ngSelectLevelUpdate = 0;
  ngSelectClub = 0;
  ngSelectArea = 0;
  ngSelectCenter = 0;
  ngSelectMainOffice = 0;
  createPosteForm!: FormGroup
  updatePosteForm!: FormGroup
  searchForm!: FormGroup
  openCreateModal: string = ""
  openUpdateModal: string = ""
  isTheNumberOfUsersLimited: boolean = false;
  isSaving: boolean = false;
  posts: Post[] = [];
  post: Post = new Post();
  idClub: number = 0;
  idArea: number = 0;
  idCenter: number = 0;
  idMainOffice: number = 0;
  clubs: Organism[] = [];
  areas: Organism[] = [];
  centers: Organism[] = [];
  mainOffices: Organism[] = [];
  isClub: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private postService: PostService,
    private clubService: ClubService,
    private areaService: AreaService,
    private centerService: CenterService,
    private mainOfficeService: MainOfficeService,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.findAllPosts();
    this.findAllClubs();
    this.findAllAreas();
    this.findAllCenters();
    this.findAllMainOffices();
    this.formInit();
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
      idClub: new FormControl(null),
      idArea: new FormControl(null),
      idCenter: new FormControl(null),
      idMainOffice: new FormControl(null),
    })

    this.updatePosteForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organisationLevel: new FormControl(null, Validators.required),
      description: new FormControl(null),
      maxNumberOfUser: new FormControl(null),
    })

    this.searchForm = this.formBuilder.group({
      name: new FormControl(null),
    })
  }

  searchPosts(){
    this.findPostByName(this.searchForm.value.name);
  }

  findPostByName(name: string){
    this.postService.findPostByName(name).subscribe((res)=>{
      this.posts = [];
      this.posts = res?.data;
    })
  }

  isLimited(){
    this.isTheNumberOfUsersLimited = true
  }

  isNotLimited(){
    this.isTheNumberOfUsersLimited = false;
  }

  findAllPosts(){
    this.postService.findAllPosts().subscribe((res)=>{
      console.log("List Posts:: ", res)
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

  findAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data;
    })
  }

  findAllAreas(){
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data;
    })
  }

  findAllCenters(){
    this.centerService.findAllCenters().subscribe((res)=>{
      this.centers = res.data;
    })
  }

  findAllMainOffices(){
    this.mainOfficeService.findAllOffices().subscribe((res)=>{
      this.mainOffices = res.data;
    })
  }

  levelSelected(val: any) {
    this.ngSelectLevelCreate = val;
  }

  onCreatePoste(){
    this.isSaving = true
    const formValue = this.createPosteForm.value;
    this.post.name = formValue.name;
    this.post.maxNumberOfUser = formValue.maxNumberOfUser;
    this.post.organisationLevelEnum = formValue.organisationLevel;
    this.post.description = formValue.description;
    if(this.ngSelectLevelCreate == 'CLUB') {
      this.idClub = formValue.idClub;
    } else if(this.ngSelectLevelCreate == 'AREA') {
      this.idArea = formValue.idArea;
    } else if(this.ngSelectLevelCreate == 'CENTER') {
      this.idCenter = formValue.idCenter;
    } else if(this.ngSelectLevelCreate == 'MAINOFFICE') {
      this.idMainOffice = formValue.idMainOffice;
    }
    this.createPost(this.post);
  }

  createPost(post: Post){
    this.postService.createPost(post, this.idClub, this.idArea, this.idCenter, this.idMainOffice).subscribe((res)=>{
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
          this.closeCreateModal();
          this.findAllPosts();
          this.utilityService.showMessage(
            'success',
            'Poste crée avec succès',
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
              this.findAllPosts();
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
          this.findAllPosts();
          this.closeUpdateModal()
          this.utilityService.showMessage(
            'success',
            'Poste modifié avec succès',
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";
import Swal from 'sweetalert2';
import { Post } from 'src/app/core/classes/post';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-view-more-are-club',
  templateUrl: './view-more-are-club.component.html',
  styleUrls: ['./view-more-are-club.component.scss']
})
export class ViewMoreAreClubComponent implements OnInit {
  ngSelect = 0;
  selectMenuForm!: FormGroup;
  ngSelectMenu = 0;
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  addClubForm!: FormGroup;
  openClubModal: string = "";
  idArea: number = 0;
  clubsOfArea: Organism [] = [];
  clubs: Organism [] = [];
  clubName: string = "";
  activeListClub: string = "";
  wrapdwonArea: string ="display-block";
  isListClubs: boolean = true;
  isListPosts: boolean = false;
  isCummunicationAgentList: boolean = false;
  isAgentEntryList: boolean = false;
  dynamicTitle = "Liste des clubs";
  communicationAgent: User;
  dataEntryAgent: User;
  posts: Post[] = [];
  constructor(private areaService: AreaService, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private location: Location,
    private postService: PostService,
    private utilityService: UtilityService) {
      this.communicationAgent = new User();
      this.dataEntryAgent = new User();
     }

  ngOnInit(): void {
    this.getArea();
    this.getAllClubs();
    this.formInit();
    // this.finAllPostByIdArea();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

    this.selectMenuForm = this.formBuilder.group({
      selectedMenu: new FormControl(null),
    })
  }

  activeHomeSider() {
    if (this.activeToggle == "") {
      this.activeToggle = "active";
      this.homeSider = "is-active";
      this.isPushed = "is-pushed-full";
    } else {
      this.activeToggle = "";
      this.homeSider = "";
      this.isPushed = "";
    }

  }

  onSelectMenuRole(menuName: any){
    if(menuName == "CLUB" || menuName == "0"){
      this.onShowClubList();
    }else{
      this.onShowAllPosts();
    }
  }

  getArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        this.idArea = res.data.id;
        this.clubName = res.data.name;
        this.clubsOfArea = res.data.clubs;
        this.communicationAgent = res.data.communicationAgent;
        this.dataEntryAgent = res.data.dataEntryAgent;
      });
    })
  }

  closeClubModal(){
    this.openClubModal = "";
  }

  onAddClub(){
    this.openClubModal = "is-active";
  }

  onSubmitclub(){
    const formValue = this.addClubForm.value;
    this.addClubToArea(this.idArea, formValue.id);
  }

  addClubToArea(idArea: number, idClub: number){
    this.areaService.addClubToArea(idArea, idClub).subscribe(()=>{
      this.getArea();
      this.closeClubModal();
      this.utilityService.showMessage(
        'success',
        'Club ajouté avec succès a la Zone !',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data
    })
  }

  deleteMessage(idArea: number, idClub: number) {
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
        confirmButtonText: 'Oui, retirer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.areaService.removeClubFromArea(idArea, idClub).subscribe(
            () => {
              this.getArea();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Club a été retiré Zone.',
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
            text: 'Vous avez annulé le retrait',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  onDeleteClub(id: number){
    this.deleteMessage(this.idArea, id)
  }

  // onListCenter(){
  //   if(this.activeListClub == ""){
  //     this.activeListClub = "active" 
  //     this.wrapdwonArea ="block"
  //   }else{
  //     this.activeListClub =""
  //     this.wrapdwonArea ="none"
  //   }
  // }

  onShowClubList(){
    // this.isCummunicationAgentList = false;
    // this.isAgentEntryList = false;
    this.isListPosts = false;
    this.isListClubs = true;
    this.dynamicTitle = "Liste des clubs";
    console.log("isListPosts::", this.isListPosts);
    console.log("isListClubs::", this.isListClubs);
  }

  // onShowAgentCommunicationList(){
  //   this.isAgentEntryList = false;
  //   this.isListClubs = false;
  //   this.isCummunicationAgentList = true;
  //   this.dynamicTitle = "Agent de communication";
  // }

  // onShowDataEntryAgent(){
  //   this.isListClubs = false;
  //   this.isCummunicationAgentList = false;
  //   this.isAgentEntryList = true;
  //   this.dynamicTitle = "Agent de saisie de données";
  // }
  comeBack(){this.location.back()}

  onShowAllPosts(){
    this.isListClubs = false;
    this.isListPosts = true;
    this.dynamicTitle = "Listes des poste"
    console.log("isListPosts::", this.isListPosts);
    console.log("isListClubs::", this.isListClubs);
  }

  // finAllPostByIdArea(){
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //       this.postService.finAllPostByIdArea(params['id']).subscribe((res)=>{
  //         this.posts = res.data
  //       })
  //     });
   
  // }
}

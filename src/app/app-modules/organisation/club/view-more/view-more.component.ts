import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";
import { StatusService } from 'src/app/core/services/organisation/status/status.service';
import { Status } from 'src/app/core/classes/status';
import { Organism } from 'src/app/core/classes/organism';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {
  ngSelect = 0;
  ngSelectStatus = 0;
  isSaving: boolean = false;
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListUser: string = "";
  idClub: number = 0;
  clubName: string = "";
  pilot: User;

  adminIsConnected: boolean = true;
  operatorIsConnected: boolean = true;

  openMemberModal: string = "";
  openPilotModal: string = "";
  dynamicTitle: string = "";

  selectMenuForm!: FormGroup;
  ngSelectMenu = 0;

  openStatusModal: string = "";
  changeStatusForm!: FormGroup;
  status: Status[] = [];
  idUser: number = 0; 

  changeClubForm!: FormGroup;
  openChangeClubModal: string = "";
  clubs: Organism[] = [];
  ngSelectChangeClub = 0;

  addMemberForm!: FormGroup;
  isPilote: boolean = false;
  isMember: boolean = true;
  isListPosts: boolean = false;
  pilotIsNull: boolean = false;
  clubMembers: User[] = [];
  members: any;
  pilots: User[] = [];
  user: User;
  wrapdwonListUser: string ="display-block";

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private userService: UserService,
    private statusService: StatusService,
    private utilityService: UtilityService,
    private location: Location) {
      this.user = new User();
      this.pilot = new User();
     }

  ngOnInit(): void {
    this.getClub();
    this.formInit();
    this.getAllMembers();
    this.getAllStatus();
    this.getAllClubs();
  }

  
  formInit() {
    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

    this.selectMenuForm = this.formBuilder.group({
      selectedMenu: new FormControl(null),
    })

    this.changeStatusForm = this.formBuilder.group({
      idStatus: new FormControl(null, Validators.required),
    })

    this.changeClubForm = this.formBuilder.group({
      idClub: new FormControl(null, Validators.required),
    })

  }
  
  comeBack(){this.location.back()}
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
    if(menuName == "MEMBER" || menuName == "0"){
      this.clickOnMemeber();
    }else{
      this.clickOnPosts();
    }
  }

  onDisplayUserList(){
    if(this.activeListUser == ""){
      this.activeListUser = "active" 
      this.wrapdwonListUser ="block"
    }else{
      this.activeListUser =""
      this.wrapdwonListUser ="none"
    }
  }

  getClub(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.clubService.getclubById(params['id']).subscribe((res)=>{
        this.clubMembers = res.data.members;
        this.pilots = res.data.pilots;
        this.idClub = res.data.id;
        this.clubName = res.data.name;
        this.pilot = res.data.pilot;
        if(this.pilot == null || this.pilot == undefined){
          this.pilotIsNull = true
        }else{
          this.pilotIsNull = false
        }
      });
    })
  }

  clickOnMemeber(){
    this.isListPosts = false;
    this.isMember = true;
    this.dynamicTitle = "Membres du club";
  }

  clickOnPosts(){
    this.isMember = false;
    this.isListPosts = true;
    this.dynamicTitle = "Liste des postes";
  }

  // clickOnPilot(){
  //   this.isMember = false;
  //   this.isPilote = true
  // }

  onOpenAddUser(){
    this.openMemberModal = "is-active";
  }

  onOpenAddPilot(){
    if(this.pilotIsNull == false){
      this.openPilotModal = "";
    }else{
      this.openPilotModal = "is-active";
    }
  
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }
  
  closePilotModal(){
    this.openPilotModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToClub(this.idClub, formValue.id);
  }

  onAddPilot(){
    const formValue = this.addMemberForm.value;
    this.addPilotToClub(this.idClub, formValue.id);
  }

  addMemberToClub(idClub: number, idMember: number){
    this.isSaving = true;
    this.clubService.addMemberToClub(idClub, idMember).subscribe(()=>{
        this.isSaving = false;
      this.getClub();
      this.closeMemberModal();
      this.addMemberForm.reset();
      this.utilityService.showMessage(
        'success',
        'Membre ajouté avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
    })
  }

  addPilotToClub(idClub: number, idMember: number){
    this.isSaving = true;
    this.clubService.addPilotToClub(idClub, idMember).subscribe(()=>{
      this.isSaving = false;
      this.getClub();
      this.closePilotModal();
      this.addMemberForm.reset();
      this.utilityService.showMessage(
        'success',
        'Membre ajouté avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      
    })
  }

  // getAllMembers(){
  //   this.userService.getAllMambers().subscribe((res)=>{
  //     this.members= res.data;
  //   })
  // }

  getAllMembers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.members = res.data.map((member:any)=>({value:member.id, label:member.firstName}))
    })
  }

  onDeleteMember(idMember: number){
    this.deleteMessage(idMember);
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
          this.clubService.removeMemberFromClub(this.idClub, id).subscribe(
            () => {
              this.getClub();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Membre a été retiré.',
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

  onDeletePilot(idPilot: number){
    this.deletePilotMessage(idPilot);
  }

  deletePilotMessage(id: number) {
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
          this.clubService.removePilot(this.idClub).subscribe(
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Retiré. !',
                text: 'Membre a été retiré.',
                confirmButtonColor: '#198AE3',
              });
              this.getClub();
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

  ///// Status 
  getAllStatus(){
    this.statusService.findAllStatus().subscribe((res)=>{
      this.status = res.data
    })
  }

  onUpdateUserStatus(idUser: number){
   this.openStatusModal = "is-active";
   this.idUser = idUser;
  }

  onSubmitUpdateStatus(){
    const formValue = this.changeStatusForm.value;
    this.updateStatusUser(this.idUser, formValue.idStatus)
  }

  updateStatusUser(idUser: number, idStatus: number){
    this.isSaving = true;
    this.userService.changeUserStatus(idUser, idStatus).subscribe(()=>{
      this.isSaving = false;
      this.closeStatusModal();
      this.getAllMembers();
      this.utilityService.showMessage(
        'success',
        'Le status de l\'utilisateur a été modifié avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
       this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  closeStatusModal(){
    this.openStatusModal = "";
  }

  
 //////////////    Change User's Club
 closeChangeClubModal(){
  this.openChangeClubModal = ""
 }

 onChangeClub(idUser: number){
  this.openChangeClubModal = "is-active";
  this.idUser = idUser;

 }

 getAllClubs(){
  this.clubService.findAllClubs().subscribe((res)=>{
    this.clubs = res.data;
  })
 }

 onSubmitChangeClub(){
  const formValue = this.changeClubForm.value;
  this.isSaving = true;
  this.userService.addMember(formValue.idClub, this.idUser).subscribe((res)=>{
    this.closeChangeClubModal()
    this.getClub();
    this.isSaving = false;
    this.utilityService.showMessage(
      'success',
      'L\'utilisateur a été transferé avec succès !',
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

}

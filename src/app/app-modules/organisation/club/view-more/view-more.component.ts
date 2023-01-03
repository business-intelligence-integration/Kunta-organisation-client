import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {
  ngSelect = 0;
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListUser: string = "";
  idClub: number = 0;
  pilot: User;

  openMemberModal: string = "";
  openPilotModal: string = "";

  addMemberForm!: FormGroup;
  isPilote: boolean = false;
  isMember: boolean = true;
  pilotIsNull: boolean = false;
  clubMembers: User[] = [];
  members: User[] = [];
  pilots: User[] = [];
  user: User;
  wrapdwonListUser: string ="display-block";

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private userService: UserService,
    private utilityService: UtilityService,
    private location: Location) {
      this.user = new User();
      this.pilot = new User();
     }

  ngOnInit(): void {
    this.getClub();
    this.formInit();
    this.getAllMembers();
  }

  
  formInit() {
    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
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
    this.isPilote = false;
    this.isMember = true;
  }

  clickOnPilot(){
    this.isMember = false;
    this.isPilote = true
  }

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
    this.clubService.addMemberToClub(idClub, idMember).subscribe(()=>{
      this.getClub();
      this.closeMemberModal();
      this.addMemberForm.reset();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    })
  }

  addPilotToClub(idClub: number, idMember: number){
    this.clubService.addPilotToClub(idClub, idMember).subscribe(()=>{
      this.getClub();
      this.closePilotModal();
      this.addMemberForm.reset();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllMembers(){
    //à remplacer avec member
    this.userService.getAllMambers().subscribe((res)=>{
      this.members= res.data;
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
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
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
                title: 'Deleted !',
                text: 'Member has been removed.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'An error has occurred',
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
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clubService.removePilot(this.idClub).subscribe(
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Member has been removed.',
                confirmButtonColor: '#198AE3',
              });
              this.getClub();
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'An error has occurred',
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


}

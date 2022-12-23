import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { Post } from 'src/app/core/classes/post';
import { User } from 'src/app/core/classes/user';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-assembly',
  templateUrl: './general-assembly.component.html',
  styleUrls: ['./general-assembly.component.scss']
})
export class GeneralAssemblyComponent implements OnInit {
  ngSelect = 0;
  ngSelect2 = 0;
  clubMembers: User[] = [];
  members: any;
  openMemberModal: string = "";
  user: User;
  addMemberForm!: FormGroup;
  idMainOffice: number = 0;
  mainOffices: Organism[] = [];
  isSaving: boolean = false;
  users: User[] = [];
  posts: Post[] = [];
  mainOffice: Organism;

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mainOfficeService: MainOfficeService,
    private userService: UserService,
    private utilityService: UtilityService,
    private fonctionService: FonctionService) {
      this.user = new User();
      this.mainOffice = new Organism();
     }

  ngOnInit(): void {
    this.formInit();
    this.getAllMainOffice();
    this.getAllMembers();
    this.getAllFonction();
  }

  formInit() {
    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      idFonction: new FormControl(null, Validators.required),
    })

  }

  onOpenAddUser(){
    this.openMemberModal = "is-active";
  }


  getAllMainOffice(){
    this.mainOfficeService.findAllOffices().subscribe((res)=>{
      this.mainOffices =  res.data;
      this.idMainOffice = res.data[0].id;
      this.users = res.data[0].centersGeneralAssembly;
      
    })
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToAssambly(this.idMainOffice, formValue.id, formValue.idFonction);
  }

  addMemberToAssambly(idMainOffice: number, idMember: number, idFonction: number){
    this.isSaving = true;
    this.mainOfficeService.addMemeberToCGA(idMainOffice, idMember, idFonction).subscribe(()=>{
      this.isSaving = false;
      this.getAllMainOffice();
      this.closeMemberModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  getAllMembers(){
    this.userService.getAllMambers().subscribe((res)=>{
      this.members = res.data.map((member:any)=>({value:member.id, label:member.firstName}))
    })
  }

  onDeleteUser(idUser: number){
    this.deleteMessage(idUser)
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
          this.mainOfficeService.removeFromExecutiveBoard(this.idMainOffice, id).subscribe(
            () => {
              this.getAllMainOffice();
              swalWithBootstrapButtons.fire({
                title: 'Removed !',
                text: 'User has been removed.',
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
  getAllFonction(){
    this.fonctionService.findAllPosts().subscribe((res)=>{
      this.posts = res.data
    })
  }
}

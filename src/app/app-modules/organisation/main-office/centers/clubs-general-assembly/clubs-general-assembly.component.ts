import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clubs-general-assembly',
  templateUrl: './clubs-general-assembly.component.html',
  styleUrls: ['./clubs-general-assembly.component.scss']
})
export class ClubsGeneralAssemblyComponent implements OnInit {

  ngSelect = 0;
  clubMembers: User[] = [];
  admins: User[] = [];
  openMemberModal: string = "";
  user: User;
  addMemberForm!: FormGroup;
  idCenter: number = 0;
  centers: Organism[] = [];
  users: User[] = [];
  center: Organism;

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private userService: UserService,
    private utilityService: UtilityService) {
      this.user = new User();
      this.center = new Organism();
     }

  ngOnInit(): void {
    this.formInit();
    // this.getAllMainOffice();
    this.getAllMembers();
    this.getCenter();
  }

  formInit() {
    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

  }

  onOpenAddUser(){
    this.openMemberModal = "is-active";
  }

  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.centerService.getCenterById(params['id']).subscribe((res)=>{
        this.center = res;
        this.idCenter = res.data.id;
        console.log("res::", res);
        console.log("res::", res.data.clubsGeneralAssembly);
        this.users = res.data.clubsGeneralAssembly;
        console.log("res::",  this.user);
      });
    })
  }



  // getAllMainOffice(){
  //   this.mainOfficeService.findAllOffices().subscribe((res)=>{
  //     this.mainOffices =  res.data;
  //     this.idMainOffice = res.data[0].id;
  //     this.users = res.data[0].centersGeneralAssembly;
  //     console.log("Main::", res.data[0].centersGeneralAssembly);
      
  //   })
  // }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToCenter(this.idCenter, formValue.id);
  }

  addMemberToCenter(idCenter: number, idMember: number){
    this.centerService.addToClubsGeneralAssembly(idCenter, idMember).subscribe(()=>{
      this.getCenter();
      this.closeMemberModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  getAllMembers(){
    this.userService.getAllUsers().subscribe((res)=>{
      console.log("res::", res);
      this.admins = res.data;
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
          this.centerService.removeFromClubsGeneralAssembly(this.idCenter, id).subscribe(
            () => {
              this.getCenter();
              swalWithBootstrapButtons.fire({
                title: 'Removed !',
                text: 'Admin has been removed.',
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


}

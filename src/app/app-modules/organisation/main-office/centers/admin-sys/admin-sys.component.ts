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
  selector: 'app-admin-sys',
  templateUrl: './admin-sys.component.html',
  styleUrls: ['./admin-sys.component.scss']
})
export class AdminSysComponent implements OnInit {

  ngSelect = 0;
  clubMembers: User[] = [];
  members: any;
  openMemberModal: string = "";
  user: User;
  addMemberForm!: FormGroup;
  idCenter: number = 0;
  centers: Organism[] = [];
  users: User[] = [];
  center: Organism;
  adminSystIsNull: boolean = true;

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
    this.getAllMembers();
    this.getCenter();
  }

  formInit() {
    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

  }

  onOpenAddUser(){
    if(this.adminSystIsNull == true){
      this.openMemberModal = "is-active";
    }else{
      this.openMemberModal = "";
    }
  }

  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.centerService.getCenterById(params['id']).subscribe((res)=>{
        this.center = res;
        this.idCenter = res.data.id;
        this.user = res.data.adminSys;
        if(this.user == null || this.user == undefined){
          this.adminSystIsNull = true;
        }else{
          this.adminSystIsNull = false;
        }
      });
    })
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToCenter(this.idCenter, formValue.id);
  }

  addMemberToCenter(idCenter: number, idMember: number){
    this.centerService.addAdminSys(idCenter, idMember).subscribe(()=>{
      this.getCenter();
      this.closeMemberModal();
      this.utilityService.showMessage(
        'success',
        'Membre ajouté avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
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
          this.centerService.removeAccountant(this.idCenter, id).subscribe(
            () => {
              this.getCenter();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Admin a été retiré',
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

}

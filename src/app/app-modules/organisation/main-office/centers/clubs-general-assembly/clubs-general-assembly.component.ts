import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { Post } from 'src/app/core/classes/post';
import { User } from 'src/app/core/classes/user';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
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
  ngSelect2 = 0;
  clubMembers: User[] = [];
  members: any;
  openMemberModal: string = "";
  user: User;
  addMemberForm!: FormGroup;
  idCenter: number = 0;
  centers: Organism[] = [];
  users: User[] = [];
  center: Organism;
  posts: Post[] = [];
  isSaving: boolean = false;

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private userService: UserService,
    private utilityService: UtilityService,
    private fonctionService: FonctionService) {
      this.user = new User();
      this.center = new Organism();
     }

  ngOnInit(): void {
    this.formInit();
    // this.getAllMainOffice();
    this.getAllMembers();
    this.getCenter();
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

  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.centerService.getCenterById(params['id']).subscribe((res)=>{
        this.center = res;
        this.idCenter = res.data.id;
        this.users = res.data.clubsGeneralAssembly;
      });
    })
  }


  closeMemberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToCenter(this.idCenter, formValue.id, formValue.idFonction);
  }

  addMemberToCenter(idCenter: number, idMember: number, idFonction: number){
    this.isSaving = true;
    this.centerService.addToClubsGeneralAssembly(idCenter, idMember, idFonction).subscribe(()=>{
       this.isSaving = false;
      this.getCenter();
      this.closeMemberModal();
      this.utilityService.showMessage(
        'success',
        'Membre ajouté avec succès !',
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
          this.centerService.removeFromClubsGeneralAssembly(this.idCenter, id).subscribe(
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

  getAllFonction(){
    this.fonctionService.findAllPosts().subscribe((res)=>{
      this.posts = res.data
    })
  }

}

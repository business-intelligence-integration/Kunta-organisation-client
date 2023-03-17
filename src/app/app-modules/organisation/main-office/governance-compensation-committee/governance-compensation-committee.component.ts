import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { Post } from 'src/app/core/classes/post';
import { User } from 'src/app/core/classes/user';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-governance-compensation-committee',
  templateUrl: './governance-compensation-committee.component.html',
  styleUrls: ['./governance-compensation-committee.component.scss']
})
export class GovernanceCompensationCommitteeComponent implements OnInit {

  ngSelect = 0;
  ngSelect2 = 0;
  clubMembers: User[] = [];
  members: any;
  openMemberModal: string = "";
  user: User;
  addMemberForm!: FormGroup;
  idMainOffice: number = 0;
  mainOffices: Organism[] = [];
  users: User[] = [];
  posts: Post[] = [];
  mainOffice: Organism;
  isSaving: boolean = false;

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
      this.users = res.data[0].governanceAndCompensationCommittee;
      
    })
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToaddToGcc(this.idMainOffice, formValue.id, formValue.idFonction);
  }

  addMemberToaddToGcc(idMainOffice: number, idMember: number, idFonction: number){
    this.isSaving = true;
    this.mainOfficeService.addMemberToGcc(idMainOffice, idMember, idFonction).subscribe(()=>{
      this.isSaving = false;
      this.getAllMainOffice();
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
        text: "Cet action est irreversible!",
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
          this.mainOfficeService.removeFromGcc(this.idMainOffice, id).subscribe(
            () => {
              this.getAllMainOffice();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Utilisateur a été retiré',
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Operation } from 'src/app/core/classes/operation';
import { Tontine } from 'src/app/core/classes/tontine';
import { Organism } from 'src/app/core/classes/organism';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/users/user.service';
import { User } from 'src/app/core/classes/user';
import { FrequencyService } from 'src/app/core/services/frequencies/frequency.service';
import { Frequency } from 'src/app/core/classes/frequency';
import { TransversalityLevelService } from 'src/app/core/services/transversality-level/transversality-level.service';
import { Level } from 'src/app/core/classes/level';

@Component({
  selector: 'app-tontine',
  templateUrl: './tontine.component.html',
  styleUrls: ['./tontine.component.scss']
})
export class TontineComponent implements OnInit {
  ngSelect2 = 0; 
  ngSelect3 = 0;
  ngSelect4 = 0;
  ngSelect5 = 0;
  ngSelect = 0;
  tontine: Tontine = new Tontine();
  tontines: Tontine[] = [];
  operations: Operation[] = [];
  clubs: Organism[] = [];
  openCreateModal: string = "";
  createTontineForm!: FormGroup;
  addMemberForm!: FormGroup;
  openMemberModal: string = "";
  members: User[] = [];
  usersClub: User[] = [];
  usersArea: User[] = [];
  usersCenter: User[] = [];
  frequencies: Frequency[] = [];
  levels: Level[] = [];
  constructor(private tontineService: TontineService,
    private formBuilder: FormBuilder, 
    private clubServices: ClubService,
    private utilityService: UtilityService,
    private userService: UserService,
    private frequencyService: FrequencyService,
    private transversalityService: TransversalityLevelService) { }

  ngOnInit(): void {
    this.getAllTontine();
    this.formInit();
    this.getAllClubs();
    this.getAllMembers();
    this.getAllUserOfClub(1);
    this.getAllFrequency();
    this.getAllLevel();
  }

  formInit() {
    this.createTontineForm = this.formBuilder.group({
      peb: new FormControl(null, Validators.required),
      idClub: new FormControl(null, Validators.required),
      idFrequenceCot: new FormControl(null, Validators.required),
      idFrequenceSea: new FormControl(null, Validators.required),
      idTransv: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })
  }

  getAllTontine(){
    this.tontineService.findAllTontines().subscribe((res)=>{
      console.log("data::", res);
      this.operations = res.data;
    })
  }

  
  onOpenCreateTontine(){
    this.openCreateModal = "is-active";
  }

  closeCreateTontineModal(){
    this.openCreateModal = "";
  }

  getAllClubs(){
    this.clubServices.findAllClubs().subscribe((res)=>{
      this.clubs = res.data;
    })
  }

  onSubmitCreateTontine(){
    const formValue = this.createTontineForm.value;
    this.tontine.peb =formValue.peb;
    this.tontine.name =formValue.name;
    this.createTontine(this.tontine, formValue.idClub, formValue.idTransv, formValue.idFrequenceCot, formValue.idFrequenceSea)
  }

  createTontine(tontine: Tontine, idClub: number, idLevel: number, idContributionFrequency: number, idSessionFrequency: number){
    this.tontineService.createNewTontine(tontine, idClub, idLevel, idContributionFrequency, idSessionFrequency).subscribe(()=>{
      this.getAllTontine();
      this.closeCreateTontineModal();
      this.utilityService.showMessage(
        'success',
        'Tontine successfully created',
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

  onDelate(id: number){
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
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.tontineService.deleteTontineById(id).subscribe(
            () => {
              this.getAllTontine();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Tontine has been deleted.',
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

  closeMemberModal(){
    this.openMemberModal = "";
  }

  onOpenAddMember(){
    this.openMemberModal = "is-active";
  }

  onAddMember(){

  }

  getAllMembers(){
    this.userService.getAllMambers().subscribe((res)=>{
      this.members = res.data;
    })
  }

  getAllUserOfClub(idClub: number){
    let usersClub: User[] = [];
    this.clubServices.getAllClubUsersId(idClub).subscribe({
      next:(res) => res.data.map((memberId: any)=>{
        this.members.forEach((member)=>{
          if(memberId == member.id){
            usersClub.push(member);
          }
        })
      })
    })

    this.usersClub = usersClub;
    console.log("usersClub::", this.usersClub);
    
  }

  getAllFrequency(){
    this.frequencyService.findAllFrequencies().subscribe((res)=>{
      this.frequencies = res.data;
    })
  }

  getAllLevel(){
    this.transversalityService.findAllLevels().subscribe((res)=>{
      this.levels = res.data;
    })
  }
}

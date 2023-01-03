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
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { GainService } from 'src/app/core/services/gains/gain.service';
import { Gain } from 'src/app/core/classes/gain';
import { Cycle } from 'src/app/core/classes/cycle';
import { DatePipe } from '@angular/common';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { CycleDto } from 'src/app/core/classes/cycleDto';

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
  ngSelect6 = 0;
  ngSelect = 0;
  tontine: Tontine = new Tontine();
  tontines: Tontine[] = [];
  operations: Operation[] = [];
  clubs: Organism[] = [];
  clubsArray: any[] = [];
  openCreateModal: string = "";
  createTontineForm!: FormGroup;
  updateTontineForm!: FormGroup;
  addMemberForm!: FormGroup;
  createCycleForm!: FormGroup;
  openMemberModal: string = "";
  openCycleModal: string = "";
  members: User[] = [];
  users: User[] = [];
  allUser: User[] = [];
  frequencies: Frequency[] = [];
  levels: Level[] = [];
  areas: Organism []= [];
  idTontine: number = 0;
  operation: Operation = new Operation();
  openDetailModal: string = "";
  gains: Gain[] = [];
  openUpdateModal:  string = "";
  clubArray: [] = [];
  membersArray: any[] = [];
  startDate: any;
  cycle: Cycle = new Cycle();
  cycleDto: CycleDto = new CycleDto();
  userIsEmpty: any = "disabled";
  startDateMin: any
  isSaving: boolean = false;
  creatTontine:boolean = false;
  isList:boolean = true;
  constructor(private tontineService: TontineService,
    private formBuilder: FormBuilder, 
    private clubServices: ClubService,
    private utilityService: UtilityService,
    private userService: UserService,
    private frequencyService: FrequencyService,
    private transversalityService: TransversalityLevelService,
    private areaService: AreaService,
    private centerSeervice: CenterService,
    private gainService: GainService,
    private cycleService: CycleService,) { }

  ngOnInit(): void {
    this.getAllTontine();
    this.formInit();
    this.getAllClubs();
    this.getAllMembers();
    this.getAllFrequency();
    this.getAllLevel();
    this.getAllArea();
    this.getAllUsers();
    this.getAllGains();
    this.initDatesPicker();
  }

  formInit() {
    this.createTontineForm = this.formBuilder.group({
      peb: new FormControl(null, Validators.required),
      idClub: new FormControl(null, Validators.required),
      idFrequenceCot: new FormControl(null, Validators.required),
      idFrequenceSea: new FormControl(null, Validators.required),
      durationInMonths: new FormControl(null, Validators.required),
      idTransv: new FormControl(null, Validators.required),
      idGain: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required),
    })


    this.updateTontineForm = this.formBuilder.group({
      idTontine: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      planValue: new FormControl(null, Validators.required),
    })

    this.createCycleForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
    })
  }

  initDatesPicker() {
    this.startDateMin = new DatePipe('en-US').transform(
      new Date(Date.now()),
      'yyyy-MM-dd'
    );
  }

  getAllTontine(){
    this.tontineService.findAllTontines().subscribe((res)=>{
      this.tontines = res.data;
      console.log("listTontines::", res);
      
    })
  }

  
  onOpenCreateTontine(){
    this.creatTontine = true;
    this.isList = false;
  }

  cancelCreatingTontine(){
    this.isList = true;
    this.creatTontine = false;
  }

  // closeCreateTontineModal(){
  //   this.openCreateModal = "";
  // }

  getAllClubs(){
    this.clubServices.findAllClubs().subscribe((res)=>{
      this.clubsArray = res.data.map((club:any)=>({value:club.id, label:club.name}));
    })
  }

  onSubmitCreateTontine(){
    this.isSaving = true;
    const formValue = this.createTontineForm.value;
    this.tontine.peb =formValue.peb;
    this.tontine.name =formValue.name;
    this.tontine.durationInMonths = formValue.durationInMonths;
    this.tontine.observation = formValue.observation;
   
    
    this.createTontine(this.tontine, formValue.idClub, formValue.idTransv, formValue.idFrequenceCot, formValue.idFrequenceSea, formValue.idGain)
  }

  createTontine(tontine: Tontine, idClub: number, idLevel: number, idContributionFrequency: number, idSessionFrequency: number, idGain: number){
    this.tontineService.createNewTontine(tontine, idClub, idLevel, idContributionFrequency, idSessionFrequency, idGain).subscribe(()=>{
      this.isSaving = false;
      this.getAllTontine();
      // this.closeCreateTontineModal();
      this.utilityService.showMessage(
        'success',
        'Tontine successfully created',
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

  onOpenAddMember(id: number, label: string, idTontine: number){
    this.idTontine = idTontine;
    if(label == 'CLUB'){
      this.getAllUserOfClub(id);
    }else if(label == 'ZONE'){
      this.getAllUserOfZone(id);
    }else if(label == 'CENTRE'){
      this.getAllUserOfCenter(id);
    }
  }

  getAllMembers(){
    this.userService.getAllMambers().subscribe((res)=>{
      this.members = res.data;
    })
  }

  getAllArea(){
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data
    })
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.allUser = res.data;
    })
  }

  getAllUserOfClub(idClub: number){
    let usersClub: User[] = [];
    this.clubServices.getAllClubUsersId(idClub).subscribe({
      next:(res) => res.data.map((memberId: any)=>{
        this.allUser.forEach((member)=>{
          if(memberId == member.id){
            usersClub.push(member);
          }
        })
      })
    })
    this.users = usersClub;
    this.openMemberModal = "is-active";
  }

  getAllUserOfZone(idClub: number){
    let usersArea: User[] = [];
   
    
    this.areas.forEach((area)=>{
      area.clubs.forEach((club)=>{
        if(idClub == club.id){
          this.areaService.getAllAreaUsersId(area.id).subscribe((res)=>{
          res.data.forEach((memberId: any)=>{
            this.allUser.forEach((member)=>{
              if(memberId == member.id){
                usersArea.push(member);
              }
            })
          })
          })
        }
      })
    })
    this.users = usersArea;
    this.openMemberModal = "is-active";
    
  }

  getAllUserOfCenter(idClub: number){
    let usersCenter: User[] = [];
    this.centerSeervice.findAllCenters().subscribe((res)=>{
      res.data.forEach((center: any)=>  {
        center.areas.forEach((area: any)=>{
          area.clubs.forEach((club: any)=>{
            if(idClub == club.id){
              this.areaService.getAllAreaUsersId(area.id).subscribe((res)=>{
              res.data.forEach((memberId: any)=>{
                this.allUser.forEach((member)=>{
                  if(memberId == member.id){
                    usersCenter.push(member);
                  }
                })
              })
              })
            }
          })
        })
      })
    })

    this.users = usersCenter;
    this.openMemberModal = "is-active";
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

  onAddMember(){
    this.isSaving = true;
    const formValue = this.addMemberForm.value;
    this.tontineService.addParticipant(this.idTontine, formValue.id, formValue.planValue).subscribe(()=>{
      this.isSaving = false;
      this.getAllTontine();
      this.openMemberModal = "";
      this.utilityService.showMessage(
        'success',
        'Membre ajouté avec succès',
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
    // this.addMemberToExecutiveBoard(this.idMainOffice, formValue.id);
  }
  onOpenDetailModel(id: number){
    this.tontineService.findTontineById(id).subscribe((res)=>{
      this.operation = res.data
      this.openDetailModal = "is-active";
    })
   
  }
  
  closeDetailModal(){
    this.openDetailModal = "";
  }

  getAllGains(){
    this.gainService.findAllGainModes().subscribe((res)=>{
      this.gains = res.data;
    })
  }

  onUpdateTontine(id: number){
    this.tontineService.findTontineById(id).subscribe((res)=>{
      this.tontine = res.data;
      console.log("UpdateT::", res);
      
      this.openUpdateModal = "is-active"
    })
  }

  closeUpdateTontineModal(){
    this.openUpdateModal = ""
  }

  onSubmitUpdateTontine(){
    const formValue = this.updateTontineForm.value;
    this.tontine.name = formValue.name;
    this.updateTontine(this.tontine, formValue.idTontine);
  }

  updateTontine(tontine: Tontine, idTontine: number){
    this.isSaving = true;
    this.tontineService.updateTontine(tontine, idTontine).subscribe((res)=>{
      this.isSaving = false;
      this.getAllTontine();
      this.closeUpdateTontineModal();
      this.utilityService.showMessage(
        'success',
        'Tontine successfully updated',
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

  onOpenCreateCycle(id: number){
    this.idTontine = id;
    this.openCycleModal = "is-active";
  }

  closeCycleModal(){
    this.openCycleModal = "";
  }

  onSelectCreateDate(event: any){

  }

  onSubmitCreateCycle(){
    this.isSaving = true;
    const formValue = this.createCycleForm.value;
    this.cycleDto.name = formValue.name;
    let startDate = new Date(formValue.startDate);
    let startDateFormated = new DatePipe('en-US').transform(startDate,'yyyy-MM-dd');
    this.cycleDto.startDate = startDateFormated;
    this.createCycle(this.idTontine,  this.cycleDto)
  }

  createCycle(idTontine: number, cycle: CycleDto){
    this.tontineService.createCycleForTontine(idTontine, cycle).subscribe((cycleDb)=>{
      this.isSaving = false;
      this.closeCycleModal();
      this.getAllTontine();
      if(cycleDb.data == null){
        this.utilityService.showMessage(
          'warning',
          'Cette tontine n\'a pas de membres !',
          '#e62965',
          'white'
        );
      }else{
        this.utilityService.showMessage(
          'success',
          'Cycle créé avec succès',
          '#06d6a0',
          'white'
        );
      }
      
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

  onSetSatus(idStontine: number, idStatus: number, label: string){  
    this.tontineService.findTontineById(idStontine).subscribe((res)=>{

      if(label == "OUVERT"){
        if(res.data.registeredMembers < 2){
          this.utilityService.showMessage(
            'warning',
            'Cette tontine ne peut être fermée car elle doit contenir au moins 2 membres.',
            '#e62965',
            'white'
          );
        }else{
          if(idStatus == 1){
            this.setStatus(idStontine, 2)
          }else if(idStatus == 2){
            this.setStatus(idStontine, 1)
          }
        }
      }else if(label == "FERMÉ"){
        if(res.data.cycles.length > 0){
          this.utilityService.showMessage(
            'warning',
            'Vous ne pouvez plus ouvrir cette tontine car un cycle a déjà été créé..',
            '#e62965',
            'white'
          );
        }else{
          if(idStatus == 1){
            this.setStatus(idStontine, 2)
          }else if(idStatus == 2){
            this.setStatus(idStontine, 1)
          }
        }
      }
     
    })
  }

  setStatus(idStontine: number, idStatus: number){
    this.tontineService.setStatus(idStontine, idStatus).subscribe((res)=>{
      this.getAllTontine();
      if(res.data.status.label == "FERMÉ"){
        this.utilityService.showMessage(
          'success',
          'Fermeture réussie de la Tontine',
          '#06d6a0',
          'white'
        );
      }else if(res.data.status.label == "OUVERT"){
        this.utilityService.showMessage(
          'success',
          'Ouverture réussie de la Tontine',
          '#06d6a0',
          'white'
        );
      }
      
    })
  }

  onCreate(){
    this.onSubmitCreateTontine();
  }

  cancelCreatingUser(){
    this.creatTontine = false;
    this.isList = true;
  }

}

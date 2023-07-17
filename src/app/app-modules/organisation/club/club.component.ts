import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  show: boolean = false;
  ngSelect = 0;
  ngSelect5 = 0;
  Clubs: string = "Clubs";
  openAddClub: string = "";
  openUpdateClub: string = "";
  openMemberModal: string = "";
  addClubForm!: FormGroup;
  addMemberForm! : FormGroup;
  updateClubForm!: FormGroup;
  searchForm!: FormGroup;
  members: any;
  clubs: Organism[] = [];
  areas: any;
  createDate: string = "";
  club: Organism;
  idMember: number = 0;
  idClub: number = 0 ;
  maxCreationClubDate: any;
  isSaving: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private clubService: ClubService,
    private userService: UserService,
    private utilityService: UtilityService,
    private loaderService: LoaderService,
    private areaService: AreaService) {
      this.club = new Organism();
     }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.formInit();
    this.getAllClubs();
    this.getAllMembers();
    this.getAllAreas();
    this.getMaxCreationClubDate();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      creationDate:new FormControl(null, Validators.required),
      reference:new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required)
    })

    this.updateClubForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      reference:new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required)
    })

    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

    this.searchForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })
  }

  onAddClub(){
    this.openAddClub = "is-active";
  }

  onCloseAddModal(){
    this.openAddClub = "";
  }

  onSubmitClub(){
    const formValue = this.addClubForm.value;
    this.club.name = formValue.name
    this.club.reference = formValue.reference;
    this.club.observation = formValue.observation;
    this.createClub(this.club);
  }

  createClub(club: Organism){
    this.isSaving = true;
    this.clubService.createclub(club).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllClubs()
          this.onCloseAddModal()
          this.addClubForm.reset();
          this.utilityService.showMessage(
            'success',
            'Club crée avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
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

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.clubs = res.data;
        if( this.clubs.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  onUpdateClub(id: number){
    this.clubService.getclubById(id).subscribe((res)=>{
      this.openUpdateClub = "is-active"
      this.club = res.data
    }, (error)=>{
      console.log(error);
        
    })
  }

  onDeleteClub(id: number){
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
          this.clubService.deleteclubById(id).subscribe(
            (res) => {
              console.log("Supression:: ", res);
              
              this.getAllClubs();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Club a été supprimé',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite',
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

  onCloseUpdateModal(){
    this.openUpdateClub = ""
  }

  onSubmitUpdateClub(){
    this.isSaving = true;
    const formValue  = this.updateClubForm.value;
    this.club.name = formValue.name;
    this.club.reference = formValue.reference;
    this.club.observation = formValue.observation;
    this.clubService.updateclubById(this.club, formValue.id).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllClubs();
          this.onCloseUpdateModal();
          this.utilityService.showMessage(
            'success',
            'Club mis à jour avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
    },()=>{
      this.isSaving = false;
    })
  }

  onAddMember(idClub: number){
    this.idClub = idClub;
    this.openMemberModal = "is-active";
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  addMembr(idClub: number, idMember: number){
    this.isSaving = true;
    this.clubService.addMemberToClub(idClub, idMember).subscribe((res)=>{
      this.isSaving = false;
      if(res == null){
        this.utilityService.showMessage(
          'warning',
          'Un utilisateur ne peut appartenir à deux(2) clubs',
          '#e62965',
          'white'
        );
      }else{
        this.getAllClubs();
        this.closeMemberModal();
        this.utilityService.showMessage(
          'success',
          'Membre ajouté au club avec succès',
          '#06d6a0',
          'white'
        );
      }
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\est produite !',
        '#e62965',
        'white'
      );
    })
  }

  getAllMembers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.members = res.data.map((member:any)=>({value:member.id, label:member.firstName + "  " + member.lastName}))
    })
  }

  onSubmitMember(){
    const formValue  = this.addMemberForm.value;
    this.addMembr(this.idClub, formValue.id)
  }

   getAllAreas(){
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data.map((area:any)=>({value: area.id, label:area.name}));
    })
  }

  getMaxCreationClubDate(){
    this.maxCreationClubDate = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  onSelectCreateDate(event: any){

  }

  searchClubs(){
    this.findClubsByName(this.searchForm.value.name)
  }

  findClubsByName(name: string){
    this.clubService.findClubsByName(name).subscribe((res)=>{
      this.clubs = [];
      this.clubs = res?.data;
    })
  }
}

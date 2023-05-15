import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  show: boolean = false;
  ngSelect = 0;
  ngSelectCenter = 0;
  ngSelectClub = 0;
  Zones: string = "Zones";
  openAddArea: string = "";
  openUpdateArea: string = "";
  addAreaForm!: FormGroup;
  updateAreaForm!: FormGroup;
  addClubForm!: FormGroup;
  searchForm!: FormGroup;
  areas: Organism[] = [];
  clubs: Organism[] = [];
  area: Organism;
  idArea:number = 0;
  club: Organism;
  openClubModal: string = "";
  createDate: string = "";
  centers: any;
  CreationAreaDate: any;
  isSaving: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private areaService: AreaService,
    private utilityService: UtilityService,
    private clubService: ClubService,
    private loaderService: LoaderService,
    private centerService: CenterService,) { 
      this.area = new Organism();
      this.club = new Organism();
    }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.formInit();
    this.getAllAreas();
    this.getAllClubs();
    this.getAllCenters();
    this.getMaxCreationAreaDate();
  }

  formInit() {
    this.addAreaForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      creationDate: new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required),
    })

    this.updateAreaForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required),
    })

    this.addClubForm = this.formBuilder.group({
      idClub: new FormControl(null, Validators.required),
    })

    this.searchForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required)
    })
  }

getAllCenters(){
  this.centerService.findAllCenters().subscribe((res)=>{
    this.centers = res.data.map((centre:any)=>({value: centre.id, label:centre.name}));
  })
}

  onAddArea(){
    this.openAddArea = "is-active";
  }

  onCloseAddModal(){
    this.openAddArea = "";
  }

  onSubmitArea(){
    const formValue = this.addAreaForm.value;
    this.area.name = formValue.name;
    this.area.reference = formValue.reference;
    this.area.observation = formValue.observation;
    this.areaService.createArea(this.area).subscribe((res)=>{
      this.onCloseAddModal();
      this.getAllAreas();
      this.utilityService.showMessage(
        'success',
        'Zone crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, (error)=>{
      console.log(error);
      
    })
  }

  getAllAreas(){
    let tabArea: Organism[]= [];
    this.areaService.findAllAreas().subscribe({
      next:res => res.data.map((area: any)=>{
        let newclubs: Organism[] = area.clubs
        let members: User[] = [];
        let clubs:Organism[] = []
        let uniqArea: Organism;
        if(newclubs.length >0){
          newclubs.forEach((club:any)=>{
            let newmembers: User[] = club.members
            if(newmembers.length > 0){
              newmembers.forEach((member:any)=>{
                members.push(member)
              }) 
            }
            clubs.push(club)
        })} else {
          this.show = true;
        }
        uniqArea = { ...area, clubs, members}
        tabArea.push(uniqArea);
      })
    })
    this.areas = tabArea;
    this.loaderService.hideLoader();

  }

  onUpdateArea(id: number){
    this.areaService.getAreaById(id).subscribe((res)=>{
      this.area = res.data;
      this.openUpdateArea = 'is-active';
    })
    
  }
  

  updateAre(area: Organism, id: number){
    this.isSaving = true;
    this.areaService.updateAreaById(area, id).subscribe(()=>{
      this.isSaving = false;
      this.onCloseUpdateModal();
      this.getAllAreas();
      this.utilityService.showMessage(
        'success',
        'Zone mise a jour avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
    })
  }

  onSubmitUpdateArea(){
    const formValue = this.updateAreaForm.value;
    this.area.name = formValue.name;
    this.area.reference = formValue.reference;
    this.area.observation = formValue.observation;
    this.updateAre(this.area, formValue.id);
  }

  onDeleteArea(id: number){
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
          this.areaService.deleteAreaById(id).subscribe(
            () => {
              this.getAllAreas();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Zone a été supprimé.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreure s\'est produite',
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
    this.openUpdateArea = '';
  }

  closeClubModal(){
    this.openClubModal = "";
  }

  onAddClub(id: number){
    this.idArea = id;
    this.openClubModal = "is-active";
  }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data
    })
  }

  onSubmitClub(){
    const formValue = this.addClubForm.value;
    this.addClubToArea(this.idArea, formValue.idClub);
  }

  addClubToArea(idArea: number, idClub: number){
    this.isSaving = true;
    this.areaService.addClubToArea(idArea, idClub).subscribe((res)=>{      
      this.isSaving = false;
      if(res.data == null){
        this.utilityService.showMessage(
          'warning',
          'Un club ne peut appartenir à plusieurs zones',
          '#e62965',
          'white'
        );
      }else{
        this.getAllAreas();
        this.closeClubModal();
        this.utilityService.showMessage(
          'success',
          'Club ajouté à la Zone avec succès.',
          '#06d6a0',
          'white'
        );
      }
      
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreure s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onSelectCreateDate(event: any){

  }

  getMaxCreationAreaDate(){
    this.CreationAreaDate = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  searchAres(){
    this.findAreasByName(this.searchForm.value.name);
  }

  findAreasByName(name: string){
    this.areaService.findAreasByName(name).subscribe((res)=>{
      this.areas = [];
      this.areas = res?.data;
    })
  }
}

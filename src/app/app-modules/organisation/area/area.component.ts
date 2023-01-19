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

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  ngSelect = 0;
  ngSelectCenter = 0;
  Zones: string = "Zones";
  openAddArea: string = "";
  openUpdateArea: string = "";
  addAreaForm!: FormGroup;
  updateAreaForm!: FormGroup;
  addClubForm!: FormGroup;
  areas: Organism[] = [];
  clubs: Organism[] = [];
  area: Organism;
  idArea:number = 0;
  club: Organism;
  openClubModal: string = "";
  createDate: string = "";
  centers: Organism[] =  [];
  CreationAreaDate: any;
  isSaving: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private areaService: AreaService,
    private utilityService: UtilityService,
    private clubService: ClubService,
    private centerService: CenterService) { 
      this.area = new Organism();
      this.club = new Organism();
    }

  ngOnInit(): void {
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
      idCenter: new FormControl(null, Validators.required),
    })

    this.updateAreaForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.addClubForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      creationDate: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      observation: new FormControl(null),
    })
  }

getAllCenters(){
  this.centerService.findAllCenters().subscribe((res)=>{
    this.centers = res.data;
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
    this.areaService.createArea(this.area, formValue.idCenter).subscribe(()=>{
      this.onCloseAddModal();
      this.getAllAreas();
      this.utilityService.showMessage(
        'success',
        'Area successfully created',
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
        })}  
        uniqArea = { ...area, clubs, members}
        tabArea.push(uniqArea);
      })
    })
    this.areas = tabArea;
  }

  onUpdateArea(id: number){
    this.areaService.getAreaById(id).subscribe((res)=>{
      this.area = res.data;
      this.openUpdateArea = 'is-active';
    })
    
  }
  

  updateAre(area: Organism, id: number){
    this.areaService.updateAreaById(area, id).subscribe(()=>{
      this.onCloseUpdateModal();
      this.getAllAreas();
      this.utilityService.showMessage(
        'success',
        'Area successfully updated',
        '#06d6a0',
        'white'
      );
    })
  }

  onSubmitUpdateArea(){
    const formValue = this.updateAreaForm.value;
    this.area.name = formValue.name;
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
          this.areaService.deleteAreaById(id).subscribe(
            () => {
              this.getAllAreas();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Area has been deleted.',
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
    this.club.name = formValue.name
        this.club.reference = formValue.reference;
    this.club.observation = formValue.observation;
    let createDate = new Date(formValue.creationDate);
    let moveDateFormated = new DatePipe('en-US').transform(createDate,'yyyy-MM-dd');
    this.club.creationDate = moveDateFormated
    this.createClub(this.club);
  }

  createClub(club: Organism){
    this.isSaving = true;
    this.clubService.createclub(club, this.idArea).subscribe(()=>{
      this.isSaving = false;
      this.getAllAreas();
      this.closeClubModal();
      this.utilityService.showMessage(
        'success',
        'Club successfully added to are',
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

  onSelectCreateDate(event: any){

  }

  getMaxCreationAreaDate(){
    this.CreationAreaDate = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }


}

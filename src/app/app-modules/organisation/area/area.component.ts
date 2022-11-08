import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
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
  constructor(private formBuilder: FormBuilder,
    private areaService: AreaService,
    private utilityService: UtilityService,
    private clubService: ClubService) { 
      this.area = new Organism();
      this.club = new Organism();
    }

  ngOnInit(): void {
    this.formInit();
    this.getAllAreas();
    this.getAllClubs()
  }

  formInit() {
    this.addAreaForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })

    this.updateAreaForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.addClubForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
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
    this.areaService.createArea(this.area).subscribe((res)=>{
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
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data;
      console.log("this.areas::", res);
      
    })
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
    console.log("this.area::", this.area);
    
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

  // onSubmitclub(){
  //   const formValue = this.addClubForm.value;
  //   this.addClubToArea(this.idArea, formValue.id);
  // }

  // addClubToArea(idArea: number, idClub: number){
  //   this.areaService.addClubToArea(idArea, idClub).subscribe(()=>{
  //     this.getAllAreas();
  //     this.closeClubModal();
  //     this.utilityService.showMessage(
  //       'success',
  //       'Club successfully added to are',
  //       '#06d6a0',
  //       'white'
  //     );
  //   })
  // }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data
    })
  }

  onSubmitClub(){
    const formValue = this.addClubForm.value;
    this.club.name = formValue.name
    this.createClub(this.club);
  }

  createClub(club: Organism){
    this.clubService.createclub(club).subscribe((clubFromDb)=>{
      this.areaService.addClubToArea(this.idArea, clubFromDb.data.id).subscribe(()=>{
        this.getAllAreas();
        this.closeClubModal();
        this.utilityService.showMessage(
          'success',
          'Club successfully added to are',
          '#06d6a0',
          'white'
        );
      })

    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }
}

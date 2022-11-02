import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-more-are-club',
  templateUrl: './view-more-are-club.component.html',
  styleUrls: ['./view-more-are-club.component.scss']
})
export class ViewMoreAreClubComponent implements OnInit {
  ngSelect = 0;
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  addClubForm!: FormGroup;
  openClubModal: string = "";
  idArea: number = 0;
  clubsOfArea: Organism [] = [];
  clubs: Organism [] = [];
  constructor(private areaService: AreaService, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getArea();
    this.getAllClubs();
    this.formInit();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })
  }

  activeHomeSider() {
    if (this.activeToggle == "") {
      this.activeToggle = "active";
      this.homeSider = "is-active";
      this.isPushed = "is-pushed-full";
    } else {
      this.activeToggle = "";
      this.homeSider = "";
      this.isPushed = "";
    }

  }

  getArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        this.idArea = res.data.id
        this.clubsOfArea = res.data.clubs
      });
    })
  }

  closeClubModal(){
    this.openClubModal = "";
  }

  onAddClub(){
    this.openClubModal = "is-active";
  }

  onSubmitclub(){
    const formValue = this.addClubForm.value;
    this.addClubToArea(this.idArea, formValue.id);
  }

  addClubToArea(idArea: number, idClub: number){
    this.areaService.addClubToArea(idArea, idClub).subscribe(()=>{
      this.getArea();
      this.closeClubModal();
      this.utilityService.showMessage(
        'success',
        'Club successfully added to are',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data
    })
  }

  deleteMessage(idArea: number, idClub: number) {
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
          this.areaService.removeClubFromArea(idArea, idClub).subscribe(
            () => {
              this.getArea();
              swalWithBootstrapButtons.fire({
                title: 'Removed !',
                text: 'Club has been moved from main area.',
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
            text: 'you have cancelled the remiving',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  onDeleteClub(id: number){
    this.deleteMessage(this.idArea, id)
  }

}

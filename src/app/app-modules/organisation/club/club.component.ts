import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  openAddClub: string = "";
  openUpdateClub: string = "";
  addClubForm!: FormGroup;
  updateClubForm!: FormGroup;
  clubs: Organism[] = [];
  club: Organism;
  constructor(private formBuilder: FormBuilder, 
    private clubService: ClubService,
    private utilityService: UtilityService,) {
      this.club = new Organism();
     }

  ngOnInit(): void {
    this.formInit();
    this.getAllClubs();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })

    this.updateClubForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
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
    this.createClub(this.club);
  }

  createClub(club: Organism){
    this.clubService.createclub(club).subscribe(()=>{
      this.getAllClubs();
      this.onCloseAddModal();
      this.utilityService.showMessage(
        'success',
        'Club successfully created',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((result)=>{
      console.log("clubs::", result);
      this.clubs = result.data
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
          this.clubService.deleteclubById(id).subscribe(
            () => {
              this.getAllClubs();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Club has been deleted.',
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
    this.openUpdateClub = ""
  }

  onSubmitUpdateClub(){
    const formValue  = this.updateClubForm.value;
    this.club.name = formValue.name;
    this.clubService.updateclubById(this.club, formValue.id).subscribe((club)=>{
      this.getAllClubs();
      this.onCloseUpdateModal();
      this.utilityService.showMessage(
        'success',
        'Club successfully updated',
        '#06d6a0',
        'white'
      );
    })



    
  }


}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  ngSelect = 0;
  ngSelect5 = 0;
  Clubs: string = "Clubs";
  openAddClub: string = "";
  openUpdateClub: string = "";
  openMemberModal: string = "";
  addClubForm!: FormGroup;
  addMemberForm! : FormGroup;
  updateClubForm!: FormGroup;
  members: any;
  clubs: Organism[] = [];
  areas: any;
  createDate: string = "";
  club: Organism;
  idMember: number = 0;
  idClub: number = 0 ;
  maxCreationClubDate: any;
  constructor(private formBuilder: FormBuilder, 
    private clubService: ClubService,
    private userService: UserService,
    private utilityService: UtilityService,
    private areaService: AreaService) {
      this.club = new Organism();
     }

  ngOnInit(): void {
    this.formInit();
    this.getAllClubs();
    this.getAllMembers();
    this.getAllAreas();
    this.getMaxCreationClubDate();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      idArea: new FormControl(null, Validators.required),
      creationDate:new FormControl(null, Validators.required),
      reference:new FormControl(null, Validators.required),
      observation: new FormControl(null)
    })

    this.updateClubForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
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
    this.createClub(this.club, formValue.idArea);
  }

  createClub(club: Organism, idArea: number){
    this.clubService.createclub(club, idArea).subscribe((res)=>{
      this.getAllClubs()
      this.onCloseAddModal()
      this.utilityService.showMessage(
        'success',
        'Club successfully created',
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

  // addClubToArea(idArea: number, idClub: number){
  //   this.areaService.addClubToArea(idArea, idClub).subscribe(()=>{
  //     this.getAllClubs();
  //     this.onCloseAddModal();
  //     this.utilityService.showMessage(
  //       'success',
  //       'Club successfully created',
  //       '#06d6a0',
  //       'white'
  //     );
  //   }, ()=>{
  //     this.utilityService.showMessage(
  //       'warning',
  //       'An error has occurred',
  //       '#e62965',
  //       'white'
  //     );
  //   })
  // }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((result)=>{
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

  onAddMember(idClub: number){
    this.idClub = idClub;
    this.openMemberModal = "is-active";
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  addMembr(idClub: number, idMember: number){
    this.clubService.addMemberToClub(idClub, idMember).subscribe(()=>{
      this.getAllClubs();
      this.closeMemberModal();
      this.utilityService.showMessage(
        'success',
        'Area successfully added to center',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllMembers(){
    this.userService.getAllMambers().subscribe((res)=>{
      this.members = res.data.map((member:any)=>({value:member.id, label:member.firstName}))
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
}

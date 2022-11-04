import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-admin-sys',
  templateUrl: './admin-sys.component.html',
  styleUrls: ['./admin-sys.component.scss']
})
export class AdminSysComponent implements OnInit {

  ngSelect = 0;
  clubMembers: User[] = [];
  members: User[] = [];
  openMemberModal: string = "";
  user: User;
  addMemberForm!: FormGroup;
  idClub: number = 0;

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private userService: UserService,
    private utilityService: UtilityService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.formInit();
    this.getClub();
  }

  formInit() {
    this.addMemberForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

  }

  onOpenAddUser(){
    this.openMemberModal = "is-active";
  }

  getClub(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.clubService.getclubById(params['id']).subscribe((res)=>{
        this.clubMembers = res.data.members
        this.idClub = res.data.id
        console.log("clubs: ", res);
      });
    })
  }

  closeMemberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.addMemberToClub(this.idClub, formValue.id);
  }

  addMemberToClub(idClub: number, idMember: number){
    this.clubService.addMemberToClub(idClub, idMember).subscribe(()=>{
      this.getClub();
      this.closeMemberModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    })
  }


}

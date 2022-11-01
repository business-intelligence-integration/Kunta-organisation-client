import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {

  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListUser: string = "";

  openMemberModal: string = "";

  addMemberForm!: FormGroup;
  isPilote: boolean = false;
  isMember: boolean = true;
  members: User[] = [];
  pilots: User[] = [];
  user: User;
  wrapdwonListUser: string ="display-block";

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private userService: UserService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.getClub();
    this.formInit();
  }

  
  formInit() {
    this.addMemberForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
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

  onDisplayUserList(){
    if(this.activeListUser == ""){
      this.activeListUser = "active" 
      this.wrapdwonListUser ="block"
    }else{
      this.activeListUser =""
      this.wrapdwonListUser ="none"
    }
  }

  getClub(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.clubService.getclubById(params['id']).subscribe((res)=>{
        this.members = res.data.members
        this.pilots = res.data.pilots
        console.log("res: ", res.data);
      });
    })
  }

  clickOnMemeber(){
    this.isPilote = false;
    this.isMember = true;
  }

  clickOnPilot(){
    this.isMember = false;
    this.isPilote = true
  }

  onOpenAddUser(){
    this.openMemberModal = "is-active";
  }

  closeMemeberModal(){
    this.openMemberModal = "";
  }

  onAddMember(){
    const formValue = this.addMemberForm.value;
    this.user.firstName = formValue.firstName;
    this.user.lastName = formValue.lastName;
    this.user.email = formValue.userName;
    this.user.phoneNumber = formValue.phoneNumber;
    this.user.userName = formValue.userName;

  }

  // addMember(member: User){
  //   this.userService.crea
  // }
}

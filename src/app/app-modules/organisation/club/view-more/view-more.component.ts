import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { User } from 'src/app/core/classes/user';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

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
  idClub: number = 0;

  openMemberModal: string = "";

  addMemberForm!: FormGroup;
  isPilote: boolean = false;
  isMember: boolean = true;
  clubMembers: User[] = [];
  members: User[] = [];
  pilots: User[] = [];
  user: User;
  wrapdwonListUser: string ="display-block";

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private userService: UserService,
    private utilityService: UtilityService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.getClub();
    this.formInit();
    this.getAllMembers();
  }

  
  formInit() {
    this.addMemberForm = this.formBuilder.group({
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
        this.clubMembers = res.data.members
        this.pilots = res.data.pilots
        this.idClub = res.data.id
        console.log("clubs: ", res);
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
    this.addMemberToClub(this.idClub, formValue.id);
  }

  addMemberToClub(idClub: number, idMember: number){
    this.clubService.addMemberToClub(idClub, idMember).subscribe(()=>{
      this.getClub();
      this.closeMemeberModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllMembers(){
    //à remplacer avec member
    this.userService.getAllUsers().subscribe((res)=>{
      this.members= res.data;
    })
  }

  // addMember(member: User){
  //   this.userService.crea
  // }
}

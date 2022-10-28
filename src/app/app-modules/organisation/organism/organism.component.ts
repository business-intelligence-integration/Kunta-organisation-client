import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.scss']
})
export class OrganismComponent implements OnInit {

  // @Input() isAdmin!: boolean
  // @Input() isMember!: boolean;
  // @Input() isOperator!: boolean;
  // @Input() isMutulist!: boolean; 

  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListUser: string = "";
  wrapdwonListUser: string ="display-block";
  isUser: boolean = true;
  isCenter: boolean = false;
  isClub: boolean = false;
  isArea: boolean = false;
  isMainOffice: boolean = false;

  isAdmin: boolean = true;
  isMember: boolean = false;
  isOperator: boolean = false;
  isMutulist: boolean = false;

  constructor() { }

  ngOnInit(): void {
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

  onShowUser(){
   
  }

  onShowCenter(){
    this.isUser = false
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isCenter = true;
  }

  onShowClub(){
    this.isCenter = false;
    this.isUser = false
    this.isArea = false;
    this.isMainOffice = false;
    this.isClub = true; 
  }

  onShowArea(){
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isMainOffice = false;
    this.isArea = true;
  }

  onShowMainOffice(){
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isArea = false;
    this.isMainOffice = true;
  }

  onDisplayUserList(){
    this.isCenter = false;
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isUser = true;
    if(this.activeListUser == ""){
      this.activeListUser = "active" 
      this.wrapdwonListUser ="block"
    }else{
      this.activeListUser =""
      this.wrapdwonListUser ="none"
    }
  }

  clickOnAdmin(){
    this.isMember = false;
    this.isOperator = false;
    this.isMutulist = false;
    this.isAdmin = true;
  }

  clickOnMember(){
    this.isOperator = false;
    this.isMutulist = false;
    this.isAdmin = false;
    this.isMember = true;
  }

  clickOnMutualist(){
    this.isOperator = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = true;
  }

  clickOnOperator(){
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
    this.isOperator = true;
  }

}

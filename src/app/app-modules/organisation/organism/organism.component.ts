import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.scss']
})
export class OrganismComponent implements OnInit {

  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListUser: string = "";
  title: string = "";
  wrapdwonListUser: string ="display-block";
  isUser: boolean = true;
  isCenter: boolean = false;
  isClub: boolean = false;
  isArea: boolean = false;
  isMainOffice: boolean = false;
  dynamicTitle: string = "Utilisateurs";

  isAdmin: boolean = true;
  isMember: boolean = false;
  isOperator: boolean = false;
  isMutulist: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.areNotUsers();
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
    this.areNotUsers();
    this.isUser = false
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isCenter = true;
    this.dynamicTitle = "Centres";
  }

  onShowClub(){
    this.areNotUsers();
    this.isCenter = false;
    this.isUser = false
    this.isArea = false;
    this.isMainOffice = false;
    this.isClub = true; 
    this.dynamicTitle = "Clubs";
  }

  onShowArea(){
    this.areNotUsers();
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isMainOffice = false;
    this.isArea = true;
    this.dynamicTitle = "Zones";
  }

  onShowMainOffice(){
    this.areNotUsers();
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isArea = false;
    this.isMainOffice = true;
    this.dynamicTitle = "Bureau principale";
  }

  onDisplayUserList(){
    this.areNotUsers();
    this.isCenter = false;
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isUser = true;
    this.dynamicTitle = "Utilisateurs";
    if(this.activeListUser == ""){
      this.activeListUser = "active" 
      this.wrapdwonListUser ="block"
    }else{
      this.activeListUser =""
      this.wrapdwonListUser ="none"
    }
  }

  clickOnAdmin(){
    this.areNotOrganisations()
    this.isUser = false;
    this.isMember = false;
    this.isOperator = false;
    this.isMutulist = false;
    this.isAdmin = true;
    this.dynamicTitle = "Admins";
  }

  clickOnMember(){
    this.areNotOrganisations()
    this.isUser = false;
    this.isOperator = false;
    this.isMutulist = false;
    this.isAdmin = false;
    this.isMember = true;
    this.dynamicTitle = "Membres";
  }

  clickOnMutualist(){
    this.areNotOrganisations()
    this.isUser = false;
    this.isOperator = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = true;
    this.dynamicTitle = "Mutulistes";
  }


  clickOnOperator(){
    this.areNotOrganisations()
    this.isUser = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
    this.isOperator = true;
    this.dynamicTitle = "Operateurs";
  }

  areNotOrganisations(){
    this.isUser = false
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isCenter = false;
  }

  areNotUsers(){
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
    this.isOperator = false;
  }

}

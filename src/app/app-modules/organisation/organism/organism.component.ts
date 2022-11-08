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
  activeListCenter: string = "";
  activateMainOfficeDetails: string = ""
  title: string = "";
  wrapdwonListUser: string ="display-block";
  wrapdwonCenter: string ="display-block";
  wrapdwonDetaiilsMainOffice: string ="display-block";
  marginBut: string = "0px"
  isUser: boolean = true;
  isCenter: boolean = false;
  isClub: boolean = false;
  isArea: boolean = false;
  isMainOffice: boolean = false;
  isMainCenters: boolean = false;
  dynamicTitle: string = "Utilisateurs";

  isExecutiveBoard: boolean = false;
  isGeneralAssembly: boolean = false;
  isCompensationCommittee: boolean = false;
  isMonitoringCommittee: boolean = false;
  isDevelopmentCommittee: boolean = false;


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
    this.areMainOffice();
    // this.areAboutCenter()
    this.isUser = false
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isCenter = true;
    this.dynamicTitle = "Centres";
  }

  onShowClub(){
    this.areNotUsers();
     this.areMainOffice();
    //  this.areAboutCenter()
    this.isMainCenters = false;
    this.isCenter = false;
    this.isUser = false
    this.isArea = false;
    this.isMainOffice = false;
    this.isClub = true; 
    this.dynamicTitle = "Clubs";
  }

  onShowArea(){
    this.areNotUsers();
    this.areMainOffice();
    //  this.areAboutCenter()
    this.isMainCenters = false;
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isMainOffice = false;
    this.isArea = true;
    this.dynamicTitle = "Zones";
  }

  onShowMainOffice(){
    this.areNotUsers();
     this.areMainOffice();
    //  this.areAboutCenter()
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isArea = false;
    this.isMainOffice = true;
    this.dynamicTitle = "Bureau principale";
  }



  onDisplayUserList(){
    this.dynamicTitle = "Utilisateurs";
    if(this.activeListUser == ""){
      this.activeListUser = "active" 
      this.wrapdwonListUser ="block"
    }else{
      this.activeListUser =""
      this.wrapdwonListUser ="none"
    }
  }
  onShowListCenter(){
    this.dynamicTitle = "Liste des Centres";
    if(this.activeListCenter == ""){
      this.activeListCenter = "active" 
      this.wrapdwonCenter ="block"
      this.marginBut = "margin-but-on"
    }else{
      this.marginBut = "margin-but-in"
      this.activeListCenter =""
      this.wrapdwonCenter ="none"
    }
  }

  onShowAll(){
    this.areNotUsers();
    this.areMainOffice();
    // this.areAboutCenter()
    this.isMainCenters = false;
    this.isCenter = false;
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isUser = true;
    this.dynamicTitle = "Utilisateurs";
  }

  onDisplayMainOffice(){
    // this.areNotUsers();
    // this.isCenter = false;
    // this.isClub = false;
    // this.isArea = false;
    // this.isMainOffice = true;
    // this.isUser = false;
    // this.dynamicTitle = "Utilisateurs";
    if(this.activateMainOfficeDetails == ""){
      this.activateMainOfficeDetails = "active" 
      this.activeListCenter =""
      this.wrapdwonDetaiilsMainOffice ="block"
    }else{
      this.activateMainOfficeDetails =""
      this.wrapdwonDetaiilsMainOffice ="none"
    }
  }

  clickOnAdmin(){
    this.areNotOrganisations()
    this.areMainOffice();
    // this.areAboutCenter()
    this.isMainCenters = false;
    this.isUser = false;
    this.isMember = false;
    this.isOperator = false;
    this.isMutulist = false;
    this.isAdmin = true;
    this.dynamicTitle = "Admins";
  }

  clickOnMember(){
    this.areNotOrganisations()
    this.areMainOffice();
    // this.areAboutCenter()
    this.isMainCenters = false;
    this.isUser = false;
    this.isOperator = false;
    this.isMutulist = false;
    this.isAdmin = false;
    this.isMember = true;
    this.dynamicTitle = "Membres";
  }

  clickOnMutualist(){
    this.areNotOrganisations()
    this.areMainOffice();
    // this.areAboutCenter()
    this.isMainCenters = false;
    this.isUser = false;
    this.isOperator = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = true;
    this.dynamicTitle = "Mutulistes";
  }


  clickOnOperator(){
    this.areNotOrganisations()
    this.areMainOffice();
    // this.areAboutCenter()
    this.isMainCenters = false;
    this.isUser = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
    this.isOperator = true;
    this.dynamicTitle = "Operateurs";
  }

  onMainCenters(){
    this.areNotOrganisations()
    this.areMainOffice();
    // this.areAboutCenter()
    this.isUser = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
    this.isOperator = false;
    this.isMainCenters = true;
    this.dynamicTitle = "Liste des centres";
  }


  areNotOrganisations(){
    this.isUser = false
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isCenter = false;
  }

  areNotMainOffice(){
    this.areNotOrganisations();
    // this.areAboutCenter()
    this.isMainCenters = false;
    this.isOperator = false;
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
  }

  areMainOffice(){
    this.isGeneralAssembly = false;
    this.isCompensationCommittee = false;
    this.isMonitoringCommittee = false;
    this.isDevelopmentCommittee = false;
    this.isExecutiveBoard = false;
  }

  areNotUsers(){
    this.isAdmin = false;
    this.isMember = false;
    this.isMutulist = false;
    this.isOperator = false;
  }

  onExecutiveBoard(){
    this.areNotMainOffice()
    // this.areAboutCenter()
    this.isGeneralAssembly = false;
    this.isCompensationCommittee = false;
    this.isMonitoringCommittee = false;
    this.isDevelopmentCommittee = false;
    this.isExecutiveBoard = true;
    this.dynamicTitle = "Membres du comité exécutif";
  }

  onGeneralAssembly(){
    this.areNotMainOffice()
    // this.areAboutCenter()
    this.isCompensationCommittee = false;
    this.isMonitoringCommittee = false;
    this.isDevelopmentCommittee = false;
    this.isExecutiveBoard = false;
    this.isGeneralAssembly = true;
    this.dynamicTitle = "Membres de l'assemblée générale";
  }

  onCompensationCommittee(){
    this.areNotMainOffice()
    // this.areAboutCenter()
    this.isMonitoringCommittee = false;
    this.isDevelopmentCommittee = false;
    this.isExecutiveBoard = false;
    this.isGeneralAssembly = false;
    this.isCompensationCommittee = true;
    this.dynamicTitle = "Membres du comité de gouvernance et de rémunération";
  }

  onMonitoringCommittee(){
    this.areNotMainOffice()
    // this.areAboutCenter()
    this.isDevelopmentCommittee = false;
    this.isExecutiveBoard = false;
    this.isGeneralAssembly = false;
    this.isCompensationCommittee = false;
    this.isMonitoringCommittee = true;
    this.dynamicTitle = "Membres du comité de production et de surveillance";
  }
  onDevelopmentCommittee(){
    this.areNotMainOffice()
    // this.areAboutCenter()
    this.isExecutiveBoard = false;
    this.isGeneralAssembly = false;
    this.isCompensationCommittee = false;
    this.isMonitoringCommittee = false;
    this.isDevelopmentCommittee = true;
    this.dynamicTitle = "Membres du comité de développement stratégique";
  }


}

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
  isClub: boolean = false;
  isArea: boolean = false;
  isMainOffice: boolean = false;
  isMainCenters: boolean = false;
  isAccount: boolean = false; 
  dynamicTitle: string = "Organisation";

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
    //this.areNotUsers();
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

  onDisplayMainOffice(){
    // if(this.activateMainOfficeDetails == ""){
    //   this.activateMainOfficeDetails = "active" 
    //   this.activeListCenter =""
    //   this.wrapdwonDetaiilsMainOffice ="block"
    // }else{
    //   this.activateMainOfficeDetails =""
    //   this.wrapdwonDetaiilsMainOffice ="none"
    // }
    this.dynamicTitle = "Bureau principale";
  }

  onShowClub(){
    this.dynamicTitle = "Clubs";
  }

  onShowUsers(){
    this.dynamicTitle = "Utilisateurs";
  }

  onShowZone(){
    this.dynamicTitle = "Zones";
  }

  onShowCentre(){
    this.dynamicTitle = "Centres";
  }

  onShowExecutifBoard(){
    this.dynamicTitle = "Comité exécutif";
  }

  onShowGeneralAssembly(){
    this.dynamicTitle = "Assemblée générale";
  }

  onShowGovernanceCompensation(){
    this.dynamicTitle = "Comité de gouvernance et de rémunération";
  }

  onShowProductionMonitoringCommittee(){
    this.dynamicTitle = "Comité de production et de surveillance";
  }

  onShowStrategicDevelopmentCommittee(){
    this.dynamicTitle = "Comité de développement stratégique";
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

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
  dynamicTitle: any;

  isExecutiveBoard: boolean = false;
  isGeneralAssembly: boolean = false;
  isCompensationCommittee: boolean = false;
  isMonitoringCommittee: boolean = false;
  isDevelopmentCommittee: boolean = false;


  isAdmin: boolean = true;
  isMember: boolean = false;
  isOperator: boolean = false;
  isMutulist: boolean = false;

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    // sessionStorage.clear();
    this.setTitle();
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

  setTitle() {
    // if(!sessionStorage.getItem('titleKey') || sessionStorage.getItem('titleKey') == null){
    //   this.dynamicTitle = "Utilisateurs";
    //   this.utilityService.saveTitle(this.dynamicTitle);
    // } else {
    //   this.dynamicTitle = sessionStorage.getItem('titleKey');
    // }
    this.dynamicTitle = sessionStorage.getItem('titleKey');
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
    sessionStorage.clear();
    this.dynamicTitle = "Bureau principale";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowClub(){
    sessionStorage.clear();
    this.dynamicTitle = "Clubs";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowUsers(){
    sessionStorage.clear();
    this.dynamicTitle = "Utilisateurs";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowZone(){
    sessionStorage.clear();
    this.dynamicTitle = "Zones";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowCentre(){
    sessionStorage.clear();
    this.dynamicTitle = "Centres";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowExecutifBoard(){
    sessionStorage.clear();
    this.dynamicTitle = "Comité exécutif";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowGeneralAssembly(){
    sessionStorage.clear();
    this.dynamicTitle = "Assemblée générale";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowGovernanceCompensation(){
    sessionStorage.clear();
    this.dynamicTitle = "Comité de gouvernance et de rémunération";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowProductionMonitoringCommittee(){
    sessionStorage.clear();
    this.dynamicTitle = "Comité de production et de surveillance";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowStrategicDevelopmentCommittee(){
    sessionStorage.clear();
    this.dynamicTitle = "Comité de développement stratégique";
    this.utilityService.saveTitle(this.dynamicTitle);
  }
}

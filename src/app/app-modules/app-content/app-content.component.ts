import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {

  activeBurger: string = "";
  activeMainSidebar: string = "";

  activeSidebarDashboard: string = "is-active";
  activeSidebarOrganism: string = "";
  activeSidebarOperation: string = "";
  activeSidebarParameter: string = "";

  activeSubSidebarOfOrganism: string = "";
  activeSubSidebarOfOperation: string = "";
  activeSubSidebarOfParameter: string = "";
  imageUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/t%C3%A9l%C3%A9chargement_vojsxd.png";
  user: User;
  activeProfil: string = "";
  isActive: string = "";
  activeListCenter: string = "";
  activateMainOfficeDetails: string = ""
  title: string = "";
  wrapdwonListUser: string ="display-block";
  wrapdwonCenter: string ="display-block";
  wrapdwonDetaiilsMainOffice: string ="display-block";

  activeListTontine: string = "";
  activeOganisation: string = "";
  activeMutualInvestment: string = "";
  dynamicTitle: any;
  wrapdwonDetailTontine: string ="display-block";
  wrapdwonDetailOganisation: string ="display-block";
  wrapdwonDetailMutualInvestment: string  = "display-block";
  isFrequency: boolean = true;
  isGain: boolean = false;
  isSession: boolean = false;
  isCycle: boolean = false;
  isStatus: boolean = false;
  isTransversality: boolean = false;
  isPenaltyType: boolean = false;
  isPenalty: boolean = false;
  isPaymentStatus: boolean = false;
  isPoste: boolean = false;
  isPieceType: boolean = false;
  isFamilySituation: boolean = false;
  isCivility: boolean = false;
  isDraweeForm: boolean = false;
  isProfitabilityType: boolean = false;
  isRefundType: boolean = false;

  constructor( private utilityService: UtilityService,
    private router: Router,
    private userService: UserService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.getConnectedUser();
    // sessionStorage.clear();
    this.setTitle();
  }

  onCloseAllMobileMenu() {
    this.activeBurger = "";
    this.activeMainSidebar = "";
    this.activeSubSidebarOfOrganism = "";
    this.activeSubSidebarOfOperation = "";
    this.activeSubSidebarOfParameter = "";
  }

  activeMobileSider() {
    if (this.activeBurger == "") {
      this.activeBurger = "is-active";
      this.activeMainSidebar = "is-active";
    } else {
      this.activeBurger = "";
      this.activeMainSidebar = "";
      this.activeSubSidebarOfOrganism = "";
      this.activeSubSidebarOfOperation = "";
      this.activeSubSidebarOfParameter = "";
    }
  }

  setTitle() {
    if(!sessionStorage.getItem('titleKey') || sessionStorage.getItem('titleKey') == null){
      this.dynamicTitle = "Utilisateurs";
      this.utilityService.saveTitle(this.dynamicTitle);
    } else {
      this.dynamicTitle = sessionStorage.getItem('titleKey');
    }
  }

  onActive() {
    if (this.activeProfil == "") {
      this.activeProfil = "is-active";
    } else if (this.activeProfil == "is-active") {
      this.activeProfil = "";
    }
  }

  logout() {
    this.utilityService.deleteToken();
    this.router.navigateByUrl("login");
  }

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      this.user = res.data;
    })
  }
  // onDisplayMainOffice(){
  //   if(this.activateMainOfficeDetails == ""){
  //     this.activateMainOfficeDetails = "active" 
  //     this.activeListCenter =""
  //     this.wrapdwonDetaiilsMainOffice ="block"
  //   }else{
  //     this.activateMainOfficeDetails =""
  //     this.wrapdwonDetaiilsMainOffice ="none"
  //   }
  // }

  onShowDashboardSubBar() {
    this.activeSubSidebarOfOrganism = "";
    this.activeSubSidebarOfOperation = "";
    this.activeSubSidebarOfParameter = "";

    this.activeSidebarDashboard = "is-active";
    this.activeSidebarOrganism = "";
    this.activeSidebarOperation = "";
    this.activeSidebarParameter = "";
  }

  onShowOrganismSubBar(){
    this.dynamicTitle = "Utilisateurs";
    this.utilityService.saveTitle(this.dynamicTitle);
    //location.reload(); 
    //or location.replace('/organization/users/')
    if(this.activeSubSidebarOfOrganism == ""){
      this.activeSubSidebarOfOrganism = "is-active";
      this.activeSubSidebarOfOperation = "";
      this.activeSubSidebarOfParameter = "";

      this.activeSidebarDashboard = "";
      this.activeSidebarOrganism = "is-active";
      this.activeSidebarOperation = "";
      this.activeSidebarParameter = "";
    }else{
      this.activeSubSidebarOfOrganism = "";
    }
  }

  onShowOperationSubBar(){
    this.dynamicTitle = "Tontines";
    this.utilityService.saveTitle(this.dynamicTitle);
    if(this.activeSubSidebarOfOperation == ""){
      this.activeSubSidebarOfOperation = "is-active";
      this.activeSubSidebarOfOrganism = "";
      this.activeSubSidebarOfParameter = "";

      this.activeSidebarDashboard = "";
      this.activeSidebarOrganism = "";
      this.activeSidebarOperation = "is-active";
      this.activeSidebarParameter = "";
    }else{
      this.activeSubSidebarOfOperation = "";
    }
  }

  onShowParameterSubBar(){
    this.dynamicTitle = "Postes";
    this.utilityService.saveTitle(this.dynamicTitle);
    if(this.activeSubSidebarOfParameter == ""){
      this.activeSubSidebarOfParameter = "is-active";
      this.activeSubSidebarOfOrganism = "";
      this.activeSubSidebarOfOperation = "";

      this.activeSidebarDashboard = "";
      this.activeSidebarOrganism = "";
      this.activeSidebarOperation = "";
      this.activeSidebarParameter = "is-active";
    }else{
      this.activeSubSidebarOfParameter = "";
    }
  }

  ////////////////////////////////////////////////////// Parameters Functions
  
  onDisplayTontineDetail(){
    if(this.activeListTontine == ""){
      this.activeListTontine = "active" 
      this.wrapdwonDetailTontine ="block"
    }else{
      this.activeListTontine =""
      this.wrapdwonDetailTontine ="none"
    }
  }

  onDisplayOrganisationDetail(){
    if(this.activeOganisation == ""){
      this.activeOganisation = "active" 
      this.wrapdwonDetailOganisation ="block"
    }else{
      this.activeOganisation =""
      this.wrapdwonDetailOganisation ="none"
    }
  }

  onDisplayMutualInvestment(){
    if(this.activeMutualInvestment == ""){
      this.activeMutualInvestment = "active" 
      this.wrapdwonDetailMutualInvestment ="block"
    }else{
      this.activeMutualInvestment =""
      this.wrapdwonDetailMutualInvestment ="none"
    }
  }

  onUser(){
    this.dynamicTitle = "Utilisateurs";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onClub(){
    this.dynamicTitle = "Clubs";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onArea(){
    this.dynamicTitle = "Zones";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onCenter(){
    this.dynamicTitle = "Centres";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onOffice(){
    this.dynamicTitle = "Bureau principal";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onTontine(){
    this.dynamicTitle = "Tontines";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onMutualInvestment(){
    this.dynamicTitle = "Placements Mutualisés";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onAssistance(){
    this.dynamicTitle = "Assistances";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onPoste(){
    this.dynamicTitle = "Postes";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onPieceType(){
    this.dynamicTitle = "Types de pièces";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onCivility(){
    this.dynamicTitle = "Civilités";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onFrequency(){
    this.dynamicTitle = "Fréquences";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onTransversality(){
    this.dynamicTitle = "Niveaux de transversalité";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }
  onGain(){
    this.dynamicTitle = "Gains";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onCycle(){
    this.dynamicTitle = "Cycles";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onSession(){
    this.dynamicTitle = "Séances";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onStatus(){
    this.dynamicTitle = "Statuts";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onPenalyType(){
    this.dynamicTitle = "Types Penalité";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onPenaly(){
    this.dynamicTitle = "Penalités";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onPaymentStatus(){
    this.dynamicTitle = "Statuts Paiement";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }
  
  onDraweeForm(){
    this.dynamicTitle = "Formulaires de tirage";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onProfitabilityType(){
    this.dynamicTitle = "Types de rentabilité";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onRefundType(){
    this.dynamicTitle = "Types de remboursement";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  onFamilySituation(){
    this.dynamicTitle = "Situation familiale";
    this.utilityService.saveTitle(this.dynamicTitle);
    this.onCloseAllMobileMenu();
  }

  /////////////////////////////////////////////////////////////////// END Parameters Functions

}

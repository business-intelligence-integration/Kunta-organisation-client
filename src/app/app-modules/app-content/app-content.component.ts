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
  dynamicTitle: string = "Poste Mobile";
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
    console.log("activeBurger::", this.activeBurger);
    console.log("activeMainSidebar::", this.activeMainSidebar);
    // console.log("activeSubSidebar::", this.activeSubSidebar);
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
  onDisplayMainOffice(){
    if(this.activateMainOfficeDetails == ""){
      this.activateMainOfficeDetails = "active" 
      this.activeListCenter =""
      this.wrapdwonDetaiilsMainOffice ="block"
    }else{
      this.activateMainOfficeDetails =""
      this.wrapdwonDetaiilsMainOffice ="none"
    }
  }

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
    // console.log(";;;;;", this.activeSubSidebarOfOrganism);
  }

  onShowOperationSubBar(){
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

  onPoste(){
    this.dynamicTitle = "Postes"
  }

  onPieceType(){
    this.dynamicTitle = "Types de pièces"
  }

  onCivility(){
    this.dynamicTitle = "Civilités"
  }

  onFrequency(){
    this.dynamicTitle = "Frequences"
  }

  onTransversality(){
    this.dynamicTitle = "Niveaux de transversalité"
  }
  onGain(){
    this.dynamicTitle = "Gains"
  }

  onCycle(){
    this.dynamicTitle = "Cycles"
  }

  onSession(){
    this.dynamicTitle = "Séances"
  }

  onStatus(){
    this.dynamicTitle = "Statuts"
  }

  onPenalyType(){
    this.dynamicTitle = "Types Penalité"
  }

  onPenaly(){
    this.dynamicTitle = "Penalités"
  }

  onPaymentStatus(){
    this.dynamicTitle = "Statuts Paiement"
  }
  
  onDraweeForm(){
    this.dynamicTitle = "Formulaires de tirage"
  }

  onProfitabilityType(){
    this.dynamicTitle = "Types de rentabilité"
  }

  onRefundType(){
    this.dynamicTitle = "Types de remboursement"
  }

  onFamilySituation(){
    this.dynamicTitle = "Situation familiale"
  }
  /////////////////////////////////////////////////////////////////// END Parameters Functions

}

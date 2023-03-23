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
  dynamicTitle: string = "Liste de Fréquences"
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
    console.log("activeSubSidebar::", this.activeSubSidebar);
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
  }

  onShowOrganismSubBar(){
    if(this.activeSubSidebarOfOrganism == ""){
      this.activeSubSidebarOfOrganism = "is-active";
      this.activeSubSidebarOfOperation = "";
      this.activeSubSidebarOfParameter = "";
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
    }else{
      this.activeSubSidebarOfOperation = "";
    }
  }

  onShowParameterSubBar(){
    if(this.activeSubSidebarOfParameter == ""){
      this.activeSubSidebarOfParameter = "is-active";
      this.activeSubSidebarOfOrganism = "";
      this.activeSubSidebarOfOperation = "";
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


  onTransversality(){
    this.isNotAboutOrganisation();
    this.isNotAboutMutualInsvestMent();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isStatus = false;
    this.isSession = false;
    this.isCycle = false;
    this.isGain = false;
    this.isFrequency = false;
    this.isTransversality = true;
    this.dynamicTitle = "Liste des niveaux de transversalité"
  }

  onFrequency(){
    this.isNotAboutOrganisation();
    this.isNotAboutMutualInsvestMent();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isStatus = false;
    this.isCycle = false;
    this.isSession = false;
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = true;
    this.dynamicTitle = "Liste de Fréquences"
  }

  onGain(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isStatus = false;
    this.isSession = false;
    this.isCycle = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isGain = true;
    this.dynamicTitle = "Liste de Gains"
  }

  onCycle(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isStatus = false;
    this.isSession = false;
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = true;
    this.dynamicTitle = "Liste des cycles"
  }

  onSession(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isStatus = false;
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = false;
    this.isSession = true;
    this.dynamicTitle = "Liste des séances"
  }

  onStatus(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = false;
    this.isSession = false;
    this.isStatus = true;
    this.dynamicTitle = "Liste des status"
  }

  onPenalyType(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPaymentStatus = false;
    this.isPenalty = false;
    this.isPenaltyType = false
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = false;
    this.isSession = false;
    this.isStatus = false;
    this.isPenaltyType = true
    this.dynamicTitle = "Liste des types de penalité"
  }

  onPenaly(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPaymentStatus = false;
    this.isPenaltyType = false
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = false;
    this.isSession = false;
    this.isStatus = false;
    this.isPenaltyType = false;
    this.isPenalty = true;
    this.dynamicTitle = "Liste des pénalités"
  }

  onPaymentStatus(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutOrganisation();
    this.isPenaltyType = false
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = false;
    this.isSession = false;
    this.isStatus = false;
    this.isPenaltyType = false;
    this.isPenalty = false;
    this.isPaymentStatus = true;
    this.dynamicTitle = "Liste des status de paiement"
  }


  isNotAboutTontine(){
    this.isPenaltyType = false
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = false;
    this.isCycle = false;
    this.isSession = false;
    this.isStatus = false;
    this.isPenaltyType = false;
    this.isPenalty = false;
    this.isPaymentStatus = false;
  }
  isNotAboutOrganisation(){
    this.isPoste = false;
    this.isPieceType = false;
    this.isFamilySituation = false;
    this.isCivility = false;
  }
  isNotAboutMutualInsvestMent(){
   this.isDraweeForm = false;
  }

  onPoste(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutTontine();
    this.isPoste = true;
    this.isPieceType = false;
    this.isFamilySituation = false;
    this.isCivility = false;
    this.dynamicTitle = "Liste des postes de l'organisation"
  }

  onPieceType(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutTontine();
    this.isPoste = false;
    this.isPieceType = true;
    this.isFamilySituation = false;
    this.isCivility = false;
    this.dynamicTitle = "Liste les types de pièce"
  }

  onFamilySituation(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutTontine();
    this.isPoste = false;
    this.isPieceType = false;
    this.isFamilySituation = true;
    this.isCivility = false;
    this.dynamicTitle = "Liste des situations familiales"
  }

  onCivility(){
    this.isNotAboutMutualInsvestMent();
    this.isNotAboutTontine();
    this.isPoste = false;
    this.isPieceType = false;
    this.isFamilySituation = false;
    this.isCivility = true;
    this.dynamicTitle = "Liste des civilités"
  }

  onDraweeForm(){
    this.isNotAboutOrganisation();
    this.isNotAboutTontine();
    this.isProfitabilityType= false;
    this.isRefundType = false;
    this.isDraweeForm = true;
    this.dynamicTitle = "Liste des formulaires de tirage au sort";
  }

  onProfitabilityType(){
    this.isNotAboutOrganisation();
    this.isNotAboutTontine();
    this.isRefundType = false;
    this.isDraweeForm = false;
    this.isProfitabilityType= true;
    this.dynamicTitle = "Liste des types de rentabilités";
  }

  onRefundType(){
    this.isNotAboutOrganisation();
    this.isNotAboutTontine();
    this.isDraweeForm = false;
    this.isProfitabilityType= false;
    this.isRefundType = true;
    this.dynamicTitle = "Liste des types de remboursement";
  }
  /////////////////////////////////////////////////////////////////// END Parameters Functions

}

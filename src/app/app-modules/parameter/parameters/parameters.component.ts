import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListTontine: string = "";
  activeOganisation: string = "";
  activeMutualInvestment: string = "";
  dynamicTitle: any;
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
  isRiskProfile: boolean = false;
  wrapdwonDetailTontine: string ="display-block";
  wrapdwonDetailOganisation: string ="display-block";
  wrapdwonDetailMutualInvestment: string  = "display-block";

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
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
    if(!localStorage.getItem('titleKey') || localStorage.getItem('titleKey') == null){
      this.dynamicTitle = "Postes";
      this.utilityService.saveTitle(this.dynamicTitle);
    } else {
      this.dynamicTitle = localStorage.getItem('titleKey');
    }
  }

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
    this.dynamicTitle = "Postes";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onPieceType(){
    this.dynamicTitle = "Types de pièces";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onCivility(){
    this.dynamicTitle = "Civilités";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onUserType(){
    this.dynamicTitle = "Type d'utilisateur";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onUserCategory(){
    this.dynamicTitle = "Catégorie d'utilisateur";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onFrequency(){
    this.dynamicTitle = "Frequences";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onTransversality(){
    this.dynamicTitle = "Niveaux de transversalité";
    this.utilityService.saveTitle(this.dynamicTitle);

  }
  onGain(){
    this.dynamicTitle = "Gains";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onCycle(){
    this.dynamicTitle = "Cycles";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onSession(){
    this.dynamicTitle = "Séances";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onStatus(){
    this.dynamicTitle = "Statuts";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onPenalyType(){
    this.dynamicTitle = "Types Penalité";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onPenaly(){
    this.dynamicTitle = "Penalités";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onPaymentStatus(){
    this.dynamicTitle = "Statuts Paiement";
    this.utilityService.saveTitle(this.dynamicTitle);
  }
  
  onDraweeForm(){
    this.dynamicTitle = "Formulaires de tirage";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onProfitabilityType(){
    this.dynamicTitle = "Types de rentabilité";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onRefundType(){
    this.dynamicTitle = "Types de remboursement";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onRiskProfile(){
    this.dynamicTitle = "Profil des risques";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onSecurityDeposit(){
    this.dynamicTitle = "Cautions";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onSubscriptionOffer(){
    this.dynamicTitle = "Offres de souscription";
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onFamilySituation(){
    this.dynamicTitle = "Situation familiale";
    this.utilityService.saveTitle(this.dynamicTitle);
  }
}

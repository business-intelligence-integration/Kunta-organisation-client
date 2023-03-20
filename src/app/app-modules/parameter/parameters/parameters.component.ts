import { Component, OnInit } from '@angular/core';

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
  dynamicTitle: string = "Liste de Fréquences"
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
  wrapdwonDetailTontine: string ="display-block";
  wrapdwonDetailOganisation: string ="display-block";
  wrapdwonDetailMutualInvestment: string  = "display-block";
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


  // onTransversality(){
  //   this.isNotAboutOrganisation();
  //   this.isNotAboutMutualInsvestMent();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isStatus = false;
  //   this.isSession = false;
  //   this.isCycle = false;
  //   this.isGain = false;
  //   this.isFrequency = false;
  //   this.isTransversality = true;
  //   this.dynamicTitle = "Liste des niveaux de transversalité"
  // }

  // onFrequency(){
  //   this.isNotAboutOrganisation();
  //   this.isNotAboutMutualInsvestMent();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isStatus = false;
  //   this.isCycle = false;
  //   this.isSession = false;
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = true;
  //   this.dynamicTitle = "Liste de Fréquences"
  // }

  // onGain(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isStatus = false;
  //   this.isSession = false;
  //   this.isCycle = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isGain = true;
  //   this.dynamicTitle = "Liste de Gains"
  // }

  // onCycle(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isStatus = false;
  //   this.isSession = false;
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = true;
  //   this.dynamicTitle = "Liste des cycles"
  // }

  // onSession(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isStatus = false;
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = false;
  //   this.isSession = true;
  //   this.dynamicTitle = "Liste des séances"
  // }

  // onStatus(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = false;
  //   this.isSession = false;
  //   this.isStatus = true;
  //   this.dynamicTitle = "Liste des status"
  // }

  // onPenalyType(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPaymentStatus = false;
  //   this.isPenalty = false;
  //   this.isPenaltyType = false
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = false;
  //   this.isSession = false;
  //   this.isStatus = false;
  //   this.isPenaltyType = true
  //   this.dynamicTitle = "Liste des types de penalité"
  // }

  // onPenaly(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPaymentStatus = false;
  //   this.isPenaltyType = false
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = false;
  //   this.isSession = false;
  //   this.isStatus = false;
  //   this.isPenaltyType = false;
  //   this.isPenalty = true;
  //   this.dynamicTitle = "Liste des pénalités"
  // }

  // onPaymentStatus(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutOrganisation();
  //   this.isPenaltyType = false
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = false;
  //   this.isSession = false;
  //   this.isStatus = false;
  //   this.isPenaltyType = false;
  //   this.isPenalty = false;
  //   this.isPaymentStatus = true;
  //   this.dynamicTitle = "Liste des status de paiement"
  // }


  // isNotAboutTontine(){
  //   this.isPenaltyType = false
  //   this.isGain = false;
  //   this.isTransversality = false;
  //   this.isFrequency = false;
  //   this.isCycle = false;
  //   this.isSession = false;
  //   this.isStatus = false;
  //   this.isPenaltyType = false;
  //   this.isPenalty = false;
  //   this.isPaymentStatus = false;
  // }
  // isNotAboutOrganisation(){
  //   this.isPoste = false;
  //   this.isPieceType = false;
  //   this.isFamilySituation = false;
  //   this.isCivility = false;
  // }
  // isNotAboutMutualInsvestMent(){
  //  this.isDraweeForm = false;
  // }

  // onPoste(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutTontine();
  //   this.isPoste = true;
  //   this.isPieceType = false;
  //   this.isFamilySituation = false;
  //   this.isCivility = false;
  //   this.dynamicTitle = "Liste des postes de l'organisation"
  // }

  // onPieceType(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutTontine();
  //   this.isPoste = false;
  //   this.isPieceType = true;
  //   this.isFamilySituation = false;
  //   this.isCivility = false;
  //   this.dynamicTitle = "Liste les types de pièce"
  // }

  // onFamilySituation(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutTontine();
  //   this.isPoste = false;
  //   this.isPieceType = false;
  //   this.isFamilySituation = true;
  //   this.isCivility = false;
  //   this.dynamicTitle = "Liste des situations familiales"
  // }

  // onCivility(){
  //   this.isNotAboutMutualInsvestMent();
  //   this.isNotAboutTontine();
  //   this.isPoste = false;
  //   this.isPieceType = false;
  //   this.isFamilySituation = false;
  //   this.isCivility = true;
  //   this.dynamicTitle = "Liste des civilités"
  // }

  // onDraweeForm(){
  //   this.isNotAboutOrganisation();
  //   this.isNotAboutTontine();
  //   this.isProfitabilityType= false;
  //   this.isRefundType = false;
  //   this.isDraweeForm = true;
  //   this.dynamicTitle = "Liste des formulaires de tirage au sort";
  // }

  // onProfitabilityType(){
  //   this.isNotAboutOrganisation();
  //   this.isNotAboutTontine();
  //   this.isRefundType = false;
  //   this.isDraweeForm = false;
  //   this.isProfitabilityType= true;
  //   this.dynamicTitle = "Liste des types de rentabilités";
  // }

  // onRefundType(){
  //   this.isNotAboutOrganisation();
  //   this.isNotAboutTontine();
  //   this.isDraweeForm = false;
  //   this.isProfitabilityType= false;
  //   this.isRefundType = true;
  //   this.dynamicTitle = "Liste des types de remboursement";
  // }
}

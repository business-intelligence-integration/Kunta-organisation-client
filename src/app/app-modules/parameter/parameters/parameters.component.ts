import { Component, Input, OnInit } from '@angular/core';

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
  dynamicTitle: string = "Postes"
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
}

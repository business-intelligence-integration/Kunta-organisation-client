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
  wrapdwonDetailTontine: string ="display-block";
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


  onTransversality(){
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
}

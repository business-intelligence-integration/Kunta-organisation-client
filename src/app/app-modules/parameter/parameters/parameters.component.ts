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
  isTransversality: boolean = false;
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
    this.isGain = false;
    this.isFrequency = false;
    this.isTransversality = true;
    this.dynamicTitle = "Liste des niveaux de transversalité"
  }

  onFrequency(){
    this.isGain = false;
    this.isTransversality = false;
    this.isFrequency = true;
    this.dynamicTitle = "Liste de Fréquences"
  }

  onGain(){
    this.isTransversality = false;
    this.isFrequency = false;
    this.isGain = true;
    this.dynamicTitle = "Liste de Gains"
  }
}

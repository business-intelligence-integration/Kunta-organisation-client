import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/core/classes/operation';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  activeListTontine: string = "";
  isTontine: boolean = true;
  dynamicTitle: string = "Liste des tontines"
  isTransversality: boolean = false;
  isFrequency: boolean = false;

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

  onShowAllTontine(){
    this.isTransversality = false;
    this.isFrequency = false;
    this.isTontine = true;
    this.dynamicTitle = "Liste des tontines"
  }

  onTransversality(){
    this.isTontine = false;
    this.isFrequency = false;
    this.isTransversality = true;
    this.dynamicTitle = "Liste des niveaux de transversalité"
  }

  onFrequency(){
    this.isTransversality = false;
    this.isTontine = false;
    this.isFrequency = true;
    this.dynamicTitle = "Liste Fréquences"
  }
}

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
  dynamicTitle: string = "Tontines"
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

  }

  onFrequency(){

  }
}

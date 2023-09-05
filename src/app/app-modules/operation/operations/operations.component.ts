import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  // activeListTontine: string = "";
  dynamicTitle: any;
  // wrapdwonDetailTontine: string ="display-block";

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    // sessionStorage.clear();
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
    // if(!sessionStorage.getItem('titleKey') || sessionStorage.getItem('titleKey') == null){
    //   this.dynamicTitle = "Tontines";
    //   this.utilityService.saveTitle(this.dynamicTitle);
    // } else {
    //   this.dynamicTitle = sessionStorage.getItem('titleKey');
    // }
    this.dynamicTitle = sessionStorage.getItem('titleKey');
  }

  // onDisplayTontineDetail(){
  //   if(this.activeListTontine == ""){
  //     this.activeListTontine = "active";
  //     this.wrapdwonDetailTontine ="block";
  //   }else{
  //     this.activeListTontine ="";
  //     this.wrapdwonDetailTontine ="none";
  //   }
  // }

  onShowAllTontine(){
    this.dynamicTitle = 'Tontines';
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowAllMutualInvestment(){
    this.dynamicTitle = 'Placements mutualisés';
    this.utilityService.saveTitle(this.dynamicTitle);
  }

  onShowAllAssistance(){
    this.dynamicTitle = 'Assistances';
    this.utilityService.saveTitle(this.dynamicTitle);
  }

}

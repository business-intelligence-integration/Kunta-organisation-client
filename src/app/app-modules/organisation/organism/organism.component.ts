import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.scss']
})
export class OrganismComponent implements OnInit {

  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  isUser: boolean = true;
  isCenter: boolean = false;
  isClub: boolean = false;
  isArea: boolean = false;
  isMainOffice: boolean = false;

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

  onShowUser(){
    this.isCenter = false;
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isUser = true;
  }

  onShowCenter(){
    this.isUser = false
    this.isClub = false;
    this.isArea = false;
    this.isMainOffice = false;
    this.isCenter = true;
  }

  onShowClub(){
    this.isCenter = false;
    this.isUser = false
    this.isArea = false;
    this.isMainOffice = false;
    this.isClub = true; 
  }

  onShowArea(){
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isMainOffice = false;
    this.isArea = true;
  }

  onShowMainOffice(){
    this.isCenter = false;
    this.isUser = false
    this.isClub = false; 
    this.isArea = false;
    this.isMainOffice = true;
  }

}

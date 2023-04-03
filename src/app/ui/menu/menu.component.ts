import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  activeProfil: string = "";
  isActive: string = "";
  naver: string = "naver";
  naverStyle: string = "margin-top: 150px;";
  activeDashboard: string = "is-selected is-active";
  activeOrganism: string = "";
  activeOperation: string = "";
  activeParameter: string = "";
  imageUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/t%C3%A9l%C3%A9chargement_vojsxd.png";
  user: User;
  constructor( private utilityService: UtilityService,
    private router: Router,
    private userService: UserService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.getConnectedUser();
    // this.getRole();
    console.log("imageUrl::", this.imageUrl);
    
  }

  onActive() {
    if (this.activeProfil == "") {
      this.activeProfil = "is-active";
      this.naverStyle = "margin-bottom: 64px;";
      this.naver = "naver from-bottom";
    } else if (this.activeProfil == "is-active") {
      this.activeProfil = "";
    }
  }

  onActiveDashboard() {
    if (this.activeDashboard == "") {
      this.activeDashboard = "is-selected is-active";
      this.activeOrganism = "";
      this.activeOperation = "";
      this.activeParameter = "";
      this.naverStyle = "margin-top: 150px;";
      this.naver = "naver";
    }
  }

  onActiveOrganism() {
    if (this.activeOrganism == "") {
      this.activeDashboard = "";
      this.activeOrganism = "is-selected is-active";
      this.activeOperation = "";
      this.activeParameter = "";
      this.naverStyle = "margin-top: 214px;";
      this.naver = "naver";
    }
  }
  
  onActiveOperation() {
    if (this.activeOperation == "") {
      this.activeDashboard = "";
      this.activeOrganism = "";
      this.activeOperation = "is-selected is-active";
      this.activeParameter = "";
      this.naverStyle = "margin-top: 278px;";
      this.naver = "naver";
    }
  }

  onActiveParameter() {
    if (this.activeParameter == "") {
      this.activeDashboard = "";
      this.activeOrganism = "";
      this.activeOperation = "";
      this.activeParameter = "is-selected is-active";
      this.naverStyle = "margin-bottom: 128px;";
      this.naver = "naver from-bottom";
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

  // getRole(){
  //   this.utilityService.getUserRole(this.utilityService.loadToken()).forEach((role :any)=>{
  //     console.log("Role::", role);
      
  // })
  // }

}

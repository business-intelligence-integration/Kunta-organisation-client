import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {

  activeBurger: string = "";
  activeMainSidebar: string = "";
  activeSubSidebar: string = "";
  imageUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/t%C3%A9l%C3%A9chargement_vojsxd.png";
  user: User;
  activeProfil: string = "";
  isActive: string = "";

  constructor( private utilityService: UtilityService,
    private router: Router,
    private userService: UserService) {
      this.user = new User();
     }

  ngOnInit(): void {
    this.getConnectedUser();
  }

  activeMobileSider() {
    if (this.activeBurger == "") {
      this.activeBurger = "is-active";
      this.activeMainSidebar = "is-active";
      this.activeSubSidebar = "is-active";
    } else {
      this.activeBurger = "";
      this.activeMainSidebar = "";
      this.activeSubSidebar = "";
    }
    console.log("activeBurger::", this.activeBurger);
    console.log("activeMainSidebar::", this.activeMainSidebar);
    console.log("activeSubSidebar::", this.activeSubSidebar);
  }

  onActive() {
    if (this.activeProfil == "") {
      this.activeProfil = "is-active";
    } else if (this.activeProfil == "is-active") {
      this.activeProfil = "";
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

}

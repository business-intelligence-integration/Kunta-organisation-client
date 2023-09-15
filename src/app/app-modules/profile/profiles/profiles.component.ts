import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  activeToggle: string = "";
  activeGeneral: string = "is-active";
  activeSetting: string = "";
  homeSider: string = "";
  isPushed: string = "";
  dynamicTitle: any;
  imageUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/t%C3%A9l%C3%A9chargement_vojsxd.png";
  user: User;

  constructor( private utilityService: UtilityService,
    private router: Router,
    private userService: UserService) {
      this.user = new User();
    }

  ngOnInit(): void {
    this.setTitle();
    this.getConnectedUser();
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

  activeProfilMenu() {
    if (this.activeGeneral == "") {
      this.activeGeneral = "is-active";
      this.activeSetting = "";
    } else {
      this.activeGeneral = "";
      this.activeSetting = "is-active";
    }
  }

  setTitle() {
    this.dynamicTitle = sessionStorage.getItem('titleKey');
  }

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      this.user = res.data;
    })
  }

}

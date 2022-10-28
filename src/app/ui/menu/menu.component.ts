import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  activeProfil: string = "";
  isActive: string = "";
  constructor( private utilityService: UtilityService,
    private router: Router) { }

  ngOnInit(): void {
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

}

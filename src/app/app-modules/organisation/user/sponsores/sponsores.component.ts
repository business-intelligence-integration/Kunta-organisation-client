import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Beneficiary } from 'src/app/core/classes/beneficiary';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-sponsores',
  templateUrl: './sponsores.component.html',
  styleUrls: ['./sponsores.component.scss']
})
export class SponsoresComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  user: User = new User();
  sponsores: User[] = [];
  beneficiary: Beneficiary = new Beneficiary();

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
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

  getUser(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userService.getMemberById(params['id']).subscribe((res)=>{
        this.user = res.data;
        this.sponsores = res.data.sponsoredUsers;
        this.beneficiary = this.user.beneficiaries[0];
        console.log("sponsore::", this.user);
      });
    })
  }
}

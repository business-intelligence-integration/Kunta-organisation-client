import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  // getAllAmin(){
  //   this.userService.
  // }

}

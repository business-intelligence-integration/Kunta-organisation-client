import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Penality } from 'src/app/core/classes/penality';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-all-penality-of-session',
  templateUrl: './all-penality-of-session.component.html',
  styleUrls: ['./all-penality-of-session.component.scss']
})
export class AllPenalityOfSessionComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  penalities: Penality[] = [];

  constructor(private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAllPanalities();
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

  onShowAllPenality(){

  }


  onShowAllUsers(){

  }

  getAllPanalities(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionService.findPenaltiesOfASession(params['id']).subscribe((res)=>{
        console.log("AllPenalities::", res);
        
        this.penalities = res.data;
      })
    })
   
  }
}

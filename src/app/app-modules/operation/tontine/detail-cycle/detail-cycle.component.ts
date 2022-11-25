import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from 'src/app/core/classes/cycle';
import { Session } from 'src/app/core/classes/session';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-cycle',
  templateUrl: './detail-cycle.component.html',
  styleUrls: ['./detail-cycle.component.scss']
})
export class DetailCycleComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  sessions: Session[] = [];
  idSession: number = 0;
  cycles: Cycle[] = [];

  constructor(private cycleService: CycleService, 
    private activatedRoute: ActivatedRoute,
    private tontineService: TontineService) { }

  ngOnInit(): void {
    // this.getAllSessionsOfCycle();
    this.getTontineById();
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


  getTontineById(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.findTontineById(params['id']).subscribe((res)=>{
        this.cycles = res.data.tontine.cycles;
      });
    })
    
  }

  onDelate(id: number){
    
  }



  // getAllSessionsOfCycle(){
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //     this.cycleService.findAllSessionsOfCycle(params['id']).subscribe((res)=>{
  //       this.sessions = res.data;
  //     });
  //   })
  // }

}

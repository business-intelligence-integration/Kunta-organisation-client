import { Component, OnInit } from '@angular/core';
import { Cycle } from 'src/app/core/classes/cycle';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.scss']
})
export class CycleComponent implements OnInit {

  show: boolean = false;
  cycle: Cycle = new Cycle()
  cycles: Cycle[]=[];

  constructor(private cycleService: CycleService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllCycles();
  }

  getAllCycles(){
    this.cycleService.findAllCycles().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.cycles = res.data;
        if( this.cycles.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Cycle } from 'src/app/core/classes/cycle';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.scss']
})
export class CycleComponent implements OnInit {

  cycle: Cycle = new Cycle()
  cycles: Cycle[]=[];

  constructor(private cycleService: CycleService) { }

  ngOnInit(): void {
    this.getAllCycles();
  }

  getAllCycles(){
    this.cycleService.findAllCycles().subscribe((res)=>{
      this.cycles = res.data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  searchForm!: FormGroup;

  constructor(private cycleService: CycleService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.formInit();
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

  formInit() {
    this.searchForm = this.formBuilder.group({
      name: new FormControl(null),
    })
  }

  searchCycles(){
    this.findCycleByName(this.searchForm.value.name);
  }

  findCycleByName(name: string){
    this.cycleService.findCycleByName(name).subscribe((res)=>{
      this.cycles = [];
      this.cycles = res?.data;
    })
  }
}

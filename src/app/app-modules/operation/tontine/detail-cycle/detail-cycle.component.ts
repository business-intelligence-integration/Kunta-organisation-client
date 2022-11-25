import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from 'src/app/core/classes/cycle';
import { Session } from 'src/app/core/classes/session';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
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
  openCycleModal: string = "";
  cycle: Cycle = new Cycle();
  updateCycleForm!: FormGroup;
  startDate: any;
  constructor(private cycleService: CycleService, 
    private activatedRoute: ActivatedRoute,
    private tontineService: TontineService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    // this.getAllSessionsOfCycle();
    this.getTontineById();
    this.formInit();
  }

  formInit() {
    this.updateCycleForm = this.formBuilder.group({
      idCycle: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      // startDate: new FormControl(null, Validators.required),
      // durationInMonths: new FormControl(null, Validators.required),
    })
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

  onUpdateCycle(id: number){
    console.log('id::', id);
    this.cycleService.findCycleById(id).subscribe((res)=>{
      this.cycle = res.data
      this.openCycleModal = "is-active";
    })
  }

  closeCycleModal(){
    this.openCycleModal = "";
  }

  onSelectCreateDate(event: any){

  }

  onSubmitUpdateCycle(){
    const formValue = this.updateCycleForm.value;
      // let startDate = new Date(formValue.startDate);
      // let startDateFormated = new DatePipe('en-US').transform(startDate,'yyyy-MM-dd');
      // this.cycle.durationInMonths = formValue.durationInMonths;
      this.cycle.name = formValue.name;
      // this.cycle.startDate = startDateFormated;
    this.updateCycle(formValue.idCycle, this.cycle);
  }

  updateCycle(id: number, cycle: Cycle){
    this.cycleService.updateCycle(id, cycle).subscribe(()=>{
      this.getTontineById();
      this.closeCycleModal()
      this.utilityService.showMessage(
        'success',
        'Cycle successfully updated',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }
  // getAllSessionsOfCycle(){
  //   this.activatedRoute.queryParams.subscribe((params) => {
  //     this.cycleService.findAllSessionsOfCycle(params['id']).subscribe((res)=>{
  //       this.sessions = res.data;
  //     });
  //   })
  // }

}

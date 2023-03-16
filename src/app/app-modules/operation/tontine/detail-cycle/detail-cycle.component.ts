import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from 'src/app/core/classes/cycle';
import { Session } from 'src/app/core/classes/session';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";
import { Penality } from 'src/app/core/classes/penality';

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
  idTontine: number = 0;
  isSaving: boolean = false;
  isClosing: boolean = true;
  constructor(private cycleService: CycleService, 
    private activatedRoute: ActivatedRoute,
    private tontineService: TontineService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private location: Location) { }

  ngOnInit(): void {
    this.findAllCyclesOfTontine();
    this.formInit();
  }

  formInit() {
    this.updateCycleForm = this.formBuilder.group({
      idCycle: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

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

  findAllCyclesOfTontine(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.findAllCyclesOfTontine(params['id']).subscribe((res)=>{
        this.idTontine = params['id']
        this.cycles = res.data;
      })
    })
    
  }

  onUpdateCycle(id: number){
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
      this.cycle.name = formValue.name;
    this.updateCycle(formValue.idCycle, this.cycle);
  }

  updateCycle(id: number, cycle: Cycle){
    this.isSaving = true;
    this.cycleService.updateCycle(id, cycle).subscribe(()=>{
      this.isSaving = false;
      this.findAllCyclesOfTontine();
      this.closeCycleModal()
      this.utilityService.showMessage(
        'success',
        'Cycle successfully updated',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onChangeCycleStatus(idCycle: number){
    this.cycleService.findCycleById(idCycle).subscribe((res)=>{
      // let penalityIsOkay: boolean = true;
      let paymentIsOkay: boolean = true;
      res.data.sessions.map((session:any)=>{
        // if(session.penalties.length > 0){
        //   session.penalties.forEach((penalty:any) => {
        //     if(penalty.paid === false){
        //       penalityIsOkay = false;
        //     }
        //   });
        // }
        if(session.totalToBePaid != session.totalPaid){
             paymentIsOkay = false;
        }
      })

     if(!paymentIsOkay){
      this.utilityService.showMessage(
        'warning',
        'Désolé vous ne pouvez pas fermer ce cycle car il y a encore des séances en cours !',
        '#e62965',
        'white'
      );
     }else{
      this.cycleService.closeCycleById(idCycle).subscribe(()=>{
        this.findAllCyclesOfTontine();
        this.utilityService.showMessage(
          'success',
          'Le cycle a bien été fermé et ne poura plus être ouvert !',
          '#06d6a0',
          'white'
        );
      })
     }
      
    })
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from 'src/app/core/classes/cycle';
import { Payment } from 'src/app/core/classes/payment';
import { Penality } from 'src/app/core/classes/penality';
import { PenalityType } from 'src/app/core/classes/penalityType';
import { Session } from 'src/app/core/classes/session';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-session-of-tontine',
  templateUrl: './detail-session-of-tontine.component.html',
  styleUrls: ['./detail-session-of-tontine.component.scss']
})
export class DetailSessionOfTontineComponent implements OnInit {
  ngSelect3 = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  sessions: Session[] = [];
  membersArray: any[] = [];
  payment: Payment = new Payment();
  idCycle: number = 0;
  idSession: number = 0;
  cycle: Cycle = new Cycle();
  geUrl: string = "assets/images/money.png";
  geUrl_penality: string = "assets/images/penalty-card.png";
  openPaymntModal: string = "";
  openPenalityModal: string = "";
  openupdateContributionDeadlineModal: string = "";
  paymentForm!: FormGroup;
  penalityForm!: FormGroup;
  updateContributionDeadlineForm!: FormGroup;
  startDateMin: any
  date: any;
  penalityTypes: PenalityType[] = [];
  penality: Penality = new Penality();

  constructor(private cycleService: CycleService,  
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private tontineService: TontineService,
    private sessionService: SessionService,
    private utilityService: UtilityService,
    private penalityTypeService: PenaltyTypeService) { }

  ngOnInit(): void {
    this.getAllSessionsOfCycle();
    this.getCycle();
    this.getTontine();
    this.formInit();
    this.initDatesPicker();
    this.getAllPenalityTypes();
  }

  formInit() {
    this.paymentForm = this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      idMember: new FormControl(null, Validators.required),
    })

    this.penalityForm = this.formBuilder.group({
      date: new FormControl(null, Validators.required),
      idPenaltyType: new FormControl(null, Validators.required),
      idMember: new FormControl(null, Validators.required),
    })

    this.updateContributionDeadlineForm = this.formBuilder.group({
      contributionDeadline: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })
  }

  initDatesPicker() {
    this.startDateMin = new DatePipe('en-US').transform(
      new Date(Date.now()),
      'yyyy-MM-dd'
    );
  }

  onSelectDate(event: any){
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

  getCycle(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.cycleService.findCycleById(params['id']).subscribe((res)=>{
        this.cycle = res.data;
      });
    })
  }

  getTontine(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.findTontineById(params['tontine']).subscribe((res)=>{
        this.membersArray = res.data.registeredMembers.map((member:any)=>({value:member.id, label:member.firstName }))
      });
    })
  }
    getAllSessionsOfCycle(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCycle = params['id'];
      this.cycleService.findAllSessionsOfCycle(params['id']).subscribe((res)=>{
        this.sessions = res.data;
        console.log("resSéances::", res);
        
      });
    })
  }

  onDelate(id: number){
    this.deleteMessage(this.idCycle, id)
  }


  deleteMessage(idCycle: number, idSession: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.cycleService.deleteSessionOfACycle(idCycle, idSession).subscribe(
            () => {
              this.getAllSessionsOfCycle();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Session has been deleted.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'An error has occurred',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'you have cancelled the deletion',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  onOpenPaymentModal(idSession: number){
    this.idSession = idSession;
    this.openPaymntModal = "is-active";
  }

  onOpenPanalityModal(idSession: number){
    this.idSession = idSession;
    this.openPenalityModal = "is-active";
  }

  closePaymentModal(){
    this.openPaymntModal = "";
  }

  closePenalityModal(){
    this.openPenalityModal = "";
  }

  onSubmitPayment(){
    const formValue = this.paymentForm.value;
    this.payment.paid = formValue.amount;
    this.payment.proof = formValue.proof;
    let date = new Date(formValue.date);
    let dateFormated = new DatePipe('en-US').transform(date,'yyyy-MM-dd');
    this.payment.date = dateFormated;
    this.createPaymentForSession(this.payment, this.idSession, formValue.idMember);
  }

  createPaymentForSession(payment: Payment, idSession: number, idMember: number){
    this.sessionService.createPaymentForSession(payment, idSession, idMember).subscribe(()=>{
      this.getAllSessionsOfCycle();
      this.closePaymentModal();
      this.utilityService.showMessage(
        'success',
        'Payment made successffully !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onSubmitPenality(){
    const formValue = this.penalityForm.value;
    let date = new Date(formValue.date);
    let dateFormated = new DatePipe('en-US').transform(date,'yyyy-MM-dd');
    this.penality.date = dateFormated;
    this.makePenality(this.penality, this.idSession, formValue.idPenaltyType, formValue.idMember);
  }

  makePenality(penalityType: Penality, idSession: number, idPenalityType: number, idUser: number ){
    this.sessionService.createPenaltyForSession(penalityType, idSession, idPenalityType, idUser).subscribe(()=>{
      this.getAllSessionsOfCycle();
      this.closePenalityModal()
      this.utilityService.showMessage(
        'success',
        'Pénalité appliquée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  getAllPenalityTypes(){
    this.penalityTypeService.findAllPenaltyTypes().subscribe((res)=>{
      this.penalityTypes = res.data;
    })
  }
  onUpdateContributionDeadline(id: number){
    this.idSession = id;
    this.openupdateContributionDeadlineModal = "is-active"
  }

  closeUpdateContributionDeadlineModalModal(){
    this.openupdateContributionDeadlineModal = ""
  }
}

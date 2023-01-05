import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from 'src/app/core/classes/cycle';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { Penality } from 'src/app/core/classes/penality';
import { PenalityType } from 'src/app/core/classes/penalityType';
import { Session } from 'src/app/core/classes/session';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-session-of-tontine',
  templateUrl: './detail-session-of-tontine.component.html',
  styleUrls: ['./detail-session-of-tontine.component.scss']
})
export class DetailSessionOfTontineComponent implements OnInit {
  ngSelect3 = 0;
  ngSelectStatus= 0;
  ngSelectPaymentMethod = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  sessions: Session[] = [];
  membersArray: any;
  payment: Payment = new Payment();
  idCycle: number = 0;
  idSession: number = 0;
  cycle: Cycle = new Cycle();
  geUrl: string = "assets/images/money.png";
  geUrl_aleatoire: string = "assets/images/fleches-aleatoires.png";
  geUrl_penality: string = "assets/images/penalty-card.png";
  openPaymntModal: string = "";
  openPenalityModal: string = "";
  openupdateContributionDeadlineModal: string = "";
  paymentForm!: FormGroup;
  penalityForm!: FormGroup;
  updateContributionDeadlineForm!: FormGroup;
  startDateMin: any
  dateDeadline: any;
  date: any;
  isSaving: boolean = false
  penalityTypes: PenalityType[] = [];
  paymentMethods: PaymentMethod[] = [];
  penality: Penality = new Penality();

  constructor(private cycleService: CycleService,  
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private tontineService: TontineService,
    private sessionService: SessionService,
    private utilityService: UtilityService,
    private penalityTypeService: PenaltyTypeService,
    private paymentMethodService: PaymentMethodService,
    private location: Location) { }

  ngOnInit(): void {
    this.getAllSessionsOfCycle();
    this.getCycle();
    this.getTontine();
    this.formInit();
    this.initDatesPicker();
    this.getAllPenalityTypes();
    this.getPaymentMethod();
  }

  formInit() {
    this.paymentForm = this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      idMember: new FormControl(null, Validators.required),
      idPaymentMethod: new FormControl(null, Validators.required),
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
  
  backBack(){this.location.back()}

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
        this.membersArray = res.data.tontineMembers.map((tontineMember:any)=>({value:tontineMember.participant.id, label:tontineMember.participant.firstName }))
      });
    })
  }
    getAllSessionsOfCycle(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCycle = params['id'];
      this.cycleService.findAllSessionsOfCycle(params['id']).subscribe((res)=>{
        console.log("sessions::", res);
        
        this.sessions = res.data;
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
    this.isSaving = true
    const formValue = this.paymentForm.value;
    this.payment.paid = formValue.amount;
    this.payment.proof = formValue.proof;
    let date = new Date(formValue.date);
    let dateFormated = new DatePipe('en-US').transform(date,'yyyy-MM-dd');
    this.payment.date = dateFormated;
    this.createPaymentForSession(this.payment, this.idSession, formValue.idMember, formValue.idPaymentMethod);
  }

  createPaymentForSession(payment: Payment, idSession: number, idMember: number, idPaymentMethod: number){
    this.sessionService.createPaymentForSession(payment, idSession, idMember, idPaymentMethod).subscribe(()=>{
      this.isSaving = false;
      this.getAllSessionsOfCycle();
      this.closePaymentModal();
      this.utilityService.showMessage(
        'success',
        'Payment made successffully !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onSubmitPenality(){
    this.isSaving = true;
    const formValue = this.penalityForm.value;
    let date = new Date(formValue.date);
    let dateFormated = new DatePipe('en-US').transform(date,'yyyy-MM-dd');
    this.penality.date = dateFormated;
    this.makePenality(this.penality, this.idSession, formValue.idPenaltyType, formValue.idMember);
  }

  makePenality(penalityType: Penality, idSession: number, idPenalityType: number, idUser: number ){
    this.sessionService.createPenaltyForSession(penalityType, idSession, idPenalityType, idUser).subscribe(()=>{
      this.isSaving = false;
      this.getAllSessionsOfCycle();
      this.closePenalityModal()
      this.utilityService.showMessage(
        'success',
        'Pénalité appliquée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
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

  onSubmitContributionDeadline(){
    const formValue = this.updateContributionDeadlineForm.value;
    let contributionDeadline = new Date(formValue.contributionDeadline);

    // let startDateFormated = new DatePipe('en-US').transform(startDate,'yyyy-MM-dd');
  }

  getPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data
    })
  }

  onUpdateSessionStatus(id: number, status: string){
    this.idSession = id;
    if(status == "OUVERT"){
      this.sessionService.findSessionById(id).subscribe((res)=>{
        let penalities = [];
        let penalityIsOkay: boolean = true;
        if(res.data.penalties.length > 0){
          penalities =  res.data.penalties
          penalities.forEach((penalty:any) => {
            if(penalty.paid == false){
              penalityIsOkay = false;
            }
          });
        }
        if(res.data.totalToBePaid != res.data.totalPaid || !penalityIsOkay){
          this.utilityService.showMessage(
            'warning',
            'Désolé vous ne pouvez pas fermer cette séance car tous les paiments n\'ont pas encore été effectué !',
            '#e62965',
            'white'
          );
        }
        if(res.data.totalToBePaid == res.data.totalPaid
          && penalityIsOkay){
          this.sessionService.closeSessionById(id).subscribe(()=>{
          this.getAllSessionsOfCycle();
          this.utilityService.showMessage(
            'success',
            'La séance a bien été fermé !',
            '#06d6a0',
            'white'
          );
          })
        }
    })
    }else if(status == "FERMÉ"){
      this.sessionService.findSessionById(id).subscribe((res)=>{
        
        if(res.data.winner != null){
          this.utilityService.showMessage(
            'warning',
            'Désolé vous ne pouvez plus ouvrir cette séance car tous les paiments ont été effectué et le gagnant a été généré !',
            '#e62965',
            'white'
          );
        }else{
          this.sessionService.openSessionById(id).subscribe((res)=>{  
            this.getAllSessionsOfCycle()
            this.utilityService.showMessage(
              'success',
              'La séance a bien été ouvert !',
              '#06d6a0',
              'white'
            );
          })
        }
      })
    
    }
  
  }

  onGenerateWinner(idSession: number){
    this.generate(idSession);
  }


  generate(idSession: number) {
    let penalityIsNoOkay: boolean = false;
    let paymentIsNoOkay: boolean = false;
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
        title: 'êtes-vous sûr de vouloir génrer le gagant maintenant ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, générer !',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.sessionService.findSessionById(idSession).subscribe((res)=>{
            if(res.data.winner != null){
              this.utilityService.showMessage(
                'warning',
                'Désolé le gagant de cette tontine a déjà été généré, vous ne pouvez plus en générer un autre !',
                '#e62965',
                'white'
              );
            }else{
              res.data.penalties.map((penalty:any)=>{
                if(penalty.paid == false){
                  penalityIsNoOkay = true;
                }
              })
              if(res.data.totalToBePaid != res.data.totalPaid){
                paymentIsNoOkay = true
              }
        
              if(paymentIsNoOkay || penalityIsNoOkay){
                this.utilityService.showMessage(
                  'warning',
                  'Désolé vous ne pouvez pas encore générer le gagnant de cette séance car tous les paiements n\'ont pas encore été effectué !',
                  '#e62965',
                  'white'
                );
              }else{
                this.sessionService.generateWinnerOfASession(idSession).subscribe(
                  () => {
                    this.getAllSessionsOfCycle();
                    swalWithBootstrapButtons.fire({
                      title: 'Généré !',
                      text: 'le gagant a bien été généré.',
                      confirmButtonColor: '#198AE3',
                    });
                  },
                  () => {
                    swalWithBootstrapButtons.fire({
                      title: 'Annulé !',
                      text: 'Une erreur s\'est produite',
                      confirmButtonColor: '#d33',
                    });
                  }
                );
              }
            }

          })
         
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'Vous avez annulé la génération du gagnant de cette séance',
            confirmButtonColor: '#d33',
          });
        }
      });
  }


}

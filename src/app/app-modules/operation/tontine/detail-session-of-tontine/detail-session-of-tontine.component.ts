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
import { AreaService } from 'src/app/core/services/areas/area.service';
import { Organism } from 'src/app/core/classes/organism';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { Picture } from 'src/app/core/classes/picture';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentService } from 'src/app/core/services/payment/payment.service';

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
  idSession: number = 0;
  session: Session = new Session();
  idCycle: number = 0;
  cycle: Cycle = new Cycle();
  geUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/money_f3bgzk.png";
  geUrl_aleatoire: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/fleches-aleatoires_jtbstk.png";
  geUrl_penality: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/penalty-card_ddp7wo.png";
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
  area: Organism = new Organism();
  penality: Penality = new Penality();
  isEntryAgent: boolean = false;
  isTontine: number = 0;
  picture = new Picture();

  constructor(private cycleService: CycleService,  
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private tontineService: TontineService,
    private sessionService: SessionService,
    private utilityService: UtilityService,
    private penalityTypeService: PenaltyTypeService,
    private paymentMethodService: PaymentMethodService,
    private paymentService: PaymentService,
    private areaService: AreaService,
    private postService: PostService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
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
      // date: new FormControl(null, Validators.required),
      date: new FormControl(null),
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
        this.isTontine = params['tontine'];
        this.getAreaByIdClub(res.data.clubOwner.id)
        this.membersArray = res.data.tontineMembers.map((tontineMember:any)=>({value:tontineMember.participant.id, label:tontineMember.participant.firstName + " " + tontineMember.participant.lastName }))
      });
    })
  }
  
  getAllSessionsOfCycle(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCycle = params['id'];
      this.cycleService.findAllSessionsOfCycle(params['id']).subscribe((res)=>{
        this.sessions = res.data;
        console.log("sessions:: ", res);
        
      });
    })
  }

  getSessionById(id: number){
    this.sessionService.findSessionById(id).subscribe((res)=>{
      // this.idSession = id;
      console.log("Response from idSession:: ", res.data);
      this.session = res.data;
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
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
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
                title: 'Supprimé !',
                text: 'Session supprimée avec succès.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'La suppression a été annulé.',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  onOpenPaymentModal(idSession: number){
    this.idSession = idSession;
    this.openPaymntModal = "is-active";
  }

  onOpenPenalityModal(idSession: number){
    this.idSession = idSession;
    this.getSessionById(idSession);
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
    this.sessionService.createPaymentForSession(payment, idSession, idMember, idPaymentMethod).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllSessionsOfCycle();
          this.closePaymentModal();
          this.utilityService.showMessage(
            'success',
            'Paiement effectué avec succès !',
            '#06d6a0',
            'white'
          );
          this.onSavePicture(res.data.id)
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
      
    },()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onSubmitPenality(){
    this.isSaving = true;
    const formValue = this.penalityForm.value;
    // let date = new Date(formValue.date);
    let date = new Date(this.session.date);
    let dateFormated = new DatePipe('en-US').transform(date,'yyyy-MM-dd');
    this.penality.date = dateFormated;
    this.makePenality(this.penality, this.idSession, formValue.idPenaltyType, formValue.idMember);
  }

  makePenality(penalityType: Penality, idSession: number, idPenalityType: number, idUser: number ){
    this.sessionService.createPenaltyForSession(penalityType, idSession, idPenalityType, idUser).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllSessionsOfCycle();
          this.closePenalityModal()
          this.utilityService.showMessage(
            'success',
            'Pénalité appliquée avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
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
        if(res.data.totalToBePaid != res.data.totalPaid){
          this.utilityService.showMessage(
            'warning',
            'Désolé vous ne pouvez pas fermer cette séance car tous les paiments n\'ont pas encore été effectué !',
            '#e62965',
            'white'
          );
        }
        if(res.data.totalToBePaid == res.data.totalPaid){
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

  onTransferContributionsToTheSolidarityFund(idSession: number){
    this.transferContributionsToTheSolidarityFund(idSession);
  }

  transferContributionsToTheSolidarityFund(idSession: number){
    // let penalityIsNoOkay: boolean = false;
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
        title: 'Êtes-vous sûre de vouloir transférer les cotisation dans les fonds de solidarité ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, transférer !',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.sessionService.findSessionById(idSession).subscribe((res)=>{
            // this.session = res.data
            console.log("res:: ",res);
            // console.log("this.session:: ", this.session);
            
            if(this.session.contributionsIsTransferToTheSolidarityFund == true){
              this.utilityService.showMessage(
                'warning',
                'Désolé les cotisation ont déjà été transféré dans les fonds de solidarité !',
                '#e62965',
                'white'
              );
            }else{
              // res.data.penalties.map((penalty:any)=>{
              //   if(penalty.paid == false){
              //     penalityIsNoOkay = true;
              //   }
              // })
              if(res.data.totalToBePaid != res.data.totalPaid){
                paymentIsNoOkay = true
              }
        
              if(paymentIsNoOkay){
                this.utilityService.showMessage(
                  'warning',
                  'Désolé vous ne pouvez pas encore transférer les cotisations dans les fonds de solidarité car tous les paiements n\'ont pas encore été effectué !',
                  '#e62965',
                  'white'
                );
              }else{
                this.sessionService.transferContributionsToTheSolidarityFund(idSession).subscribe(
                  () => {
                    this.getAllSessionsOfCycle();
                    swalWithBootstrapButtons.fire({
                      title: 'Transféré !',
                      text: 'le tranfert a été effectué avec succès.',
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
            text: 'Vous avez annulé le transfert des cotisations dans le fonds de solidarité',
            confirmButtonColor: '#d33',
          });
        }
      });
  }


  generate(idSession: number) {
    // let penalityIsNoOkay: boolean = false;
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
        title: 'Êtes-vous sûre de vouloir générer le gagnant maintenant ?',
        text: "Cette action est irreversible!",
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
              // res.data.penalties.map((penalty:any)=>{
              //   if(penalty.paid == false){
              //     penalityIsNoOkay = true;
              //   }
              // })
              if(res.data.totalToBePaid != res.data.totalPaid){
                paymentIsNoOkay = true
              }
        
              if(paymentIsNoOkay){
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

  getAreaByIdClub(idClub: number){
    this.areaService.findAreaByIdClub(idClub).subscribe((res)=>{
      this.area = res.data;
      this.getPostsByIdArea(res.data.id);
    })
  }

  getPostsByIdArea(idArea: number){
    this.postService.finAllPostByIdArea(idArea).subscribe((connectedRes)=>{
      this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
        if(connectedRes.data[1].operators[0].id == res.data.id){
          this.isEntryAgent = true;
        }
      })
    })
  }

  //////////////////// Upload Picture
  onSelectPicture(event: any){
   
    if(!event.target.files[0] || event.target.files.length == 0){
      return;
    }

    let mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) == null){
      return;
    }

    if(event.target.files.length){
      const picture: Picture = {
        file: event.target.files[0],
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(event.target.files[0])
        ),
      };
      this.picture = picture;
    }
  }

  onSavePicture(idPayment: number){
    const photoFormData = this.prepareFormData(this.picture);
    this.paymentService.uploadPicture(photoFormData, idPayment).subscribe((res: any)=>{
      console.log("res:: ", res);
    })
  }

  prepareFormData(picture: Picture): FormData {
    const formData = new FormData();
    formData.append('file', picture.file, picture.file.name);
    return formData;
  }
}

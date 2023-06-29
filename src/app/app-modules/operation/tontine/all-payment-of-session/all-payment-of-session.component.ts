import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OperationSession } from 'src/app/core/classes/operationSession';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentStatus } from 'src/app/core/classes/PaymentStatus';
import { Session } from 'src/app/core/classes/session';
import { SessionOfPayment } from 'src/app/core/classes/sessionOfPayment';
import { User } from 'src/app/core/classes/user';
import { PaymentStatusService } from 'src/app/core/services/payment-status/payment-status.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";
import Swal from 'sweetalert2';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-all-payment-of-session',
  templateUrl: './all-payment-of-session.component.html',
  styleUrls: ['./all-payment-of-session.component.scss']
})
export class AllPaymentOfSessionComponent implements OnInit {
  show: boolean = false;
  ngSelect = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  openUpdatePaymntModal: string = "";
  openUpdatePaymntStatusModal: string = "";
  payments: Payment[] = [];
  paymentStatus: PaymentStatus[] = [];
  payment: Payment = new Payment();
  session: Session = new Session();
  operationSession: OperationSession = new OperationSession();
  sessionOfPayment: SessionOfPayment = new SessionOfPayment();
  paymentUpdateForm!: FormGroup;
  paymentUpdateStatusForm!: FormGroup;
  date: any;
  isCotisation: boolean = true;
  isMember: boolean = false;
  isCenterOfficer: boolean = false;
  isSaving: boolean = false;
  isController: boolean = false;
  idPayment: number = 0;
  users: User[] = [];
  

  constructor(private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private penalityTypeService: PenaltyTypeService,
    private paymentStatusService: PaymentStatusService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private tontineService: TontineService,
    private areaService: AreaService,
    private postService: PostService,
    private userService: UserService,
    private centerService:CenterService,
    private mainService: MainOfficeService,
    private loaderService: LoaderService,
    private location: Location) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.findAllPaymentsOfASession();
    this.formInit();
    this.getAllPaymentStaus();
    this.getAllUserPaymentStateBySession();
    this.getTontine();
    this.getMainOfficeById();
  }

  formInit() {
    this.paymentUpdateForm = this.formBuilder.group({
      // amount: new FormControl(null, Validators.required),
      // date: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
    })

    this.paymentUpdateStatusForm = this.formBuilder.group({
      status: new FormControl(null, Validators.required),
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

  findAllPaymentsOfASession(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionService.findAllPaymentsOfASession(params['id']).subscribe((res)=>{   
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.payments = res.data;
        if( this.payments.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
      })

      this.sessionService.findSessionById(params['id']).subscribe((res)=>{
        this.session = res.data;
      })
    })
  }

  onUpdatePayment(id: number){
    this.paymentService.findPaymentById(id).subscribe((res)=>{
      this.sessionOfPayment = res.data;
      this.openUpdatePaymntModal = "is-active"
    })
  }

  
  closeUpdatePaymentModal(){
    this.openUpdatePaymntModal = "";
  }

  onSelectDate(event: any){

  }

  onSubmitUpdatePayment(idPayment: number){
    const formValue = this.paymentUpdateForm.value;
    this.payment.proof = formValue.proof;
    this.updatePayment(this.payment, idPayment);
  }

  updatePayment(payment: Payment, idPayment: number){
    this.paymentService.updatePayment(payment, idPayment).subscribe(()=>{
      this.findAllPaymentsOfASession();
      this.closeUpdatePaymentModal();
      this.utilityService.showMessage(
        'success',
        'Cotisation modifiée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.utilityService.showMessage(
        'warning',
        'une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onDelate(id: number){
    this.deleteMessage(id);
  }

  deleteMessage(id: number) {
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
        text: "Cette action est irreversible!",
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
          this.paymentService.deletePayment(id).subscribe(
            () => {
              this.findAllPaymentsOfASession();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Paiement a été supprimé.',
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
            text: 'Vous avez annulé la suppression',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  closeUpdatePaymentStatusModal(){
    this.openUpdatePaymntStatusModal = "";
  }

  onUpdatePaymentSatatus(id: number){
    this.idPayment = id;
    this.openUpdatePaymntStatusModal = "is-active";
  }

  getAllPaymentStaus(){
    this.paymentStatusService.findAllPaymentStatus().subscribe((res)=>{
      this.paymentStatus = res.data
    })
  }

  onSubmitUpdatePaymentStatus(){
    const formValue = this.paymentUpdateStatusForm.value;
     if(formValue.status == "CONTROLE"){
      this.checkPayment(this.idPayment);
     }else if(formValue.status == "VALIDE"){
      this.validatePayment(this.idPayment);
     }
  }

  checkPayment(idPayment: number){
    this.isSaving = true;
    this.paymentService.checkPayment(idPayment).subscribe((res)=>{
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
          this.closeUpdatePaymentStatusModal();
          this.findAllPaymentsOfASession();
          this.utilityService.showMessage(
            'success',
            'Le paiement a bien été vérifié !',
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
        'une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  validatePayment(idPayment: number){
    this.isSaving = true;
    this.paymentService.validatePayment(idPayment).subscribe((res)=>{
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
          this.closeUpdatePaymentStatusModal();
          this.findAllPaymentsOfASession();
          this.utilityService.showMessage(
            'success',
            'Le paiement a bien été validé !',
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
        'une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  getAllUserPaymentStateBySession(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.sessionService.findAllUserPaymentStateBySession(params['id']).subscribe((res)=>{
       this.users = res.data
      })
    })
  }

  onShowAllPayments(){
    this.isMember = false;
    this.isCotisation = true;
  }

  onShowAllUsers(){
    this.isCotisation = false;
    this.isMember = true;
    this.getAllUserPaymentStateBySession()
  }

  getTontine(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.findTontineById(params['tontine']).subscribe((res)=>{
        this.areaService.findAreaByIdClub(res.data.clubOwner.id).subscribe((res)=>{
          this.centerService.findCenterByIdArea(res.data.id).subscribe((res)=>{
            this.postService.finAllPostByIdCenter(res.data.id).subscribe((res)=>{
                this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((connectedRes) => {
                  if(res.data[7].operators[0].id == connectedRes.data.id){       
                    this.isCenterOfficer = true;
                  }
                })
            })
           
          })          
          // this.postService.finAllPostByIdArea(res.data.id).subscribe((connectedRes)=>{
          //   this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
          //     if(connectedRes.data[1].operators[0].id == res.data.id){
          //       this.isEntryAgent = true;
          //     }
          //   })
          // })
        })
      });
    })
  }

  getMainOfficeById(){
    this.mainService.getById(1).subscribe((mainOffice)=>{
      this.postService.finAllPostByIdMainOffice(1).subscribe((posts)=>{
        this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((connectedRes) => {
          if(posts.data[3].operators[0].id == connectedRes.data.id){       
            this.isController = true;
          }
        })
      })
    })
  }
}

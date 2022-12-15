import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/core/classes/payment';
import { PaymentStatus } from 'src/app/core/classes/PaymentStatus';
import { PenalityType } from 'src/app/core/classes/penalityType';
import { Session } from 'src/app/core/classes/session';
import { SessionOfPayment } from 'src/app/core/classes/sessionOfPayment';
import { User } from 'src/app/core/classes/user';
import { PaymentStatusService } from 'src/app/core/services/payment-status/payment-status.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-payment-of-session',
  templateUrl: './all-payment-of-session.component.html',
  styleUrls: ['./all-payment-of-session.component.scss']
})
export class AllPaymentOfSessionComponent implements OnInit {
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
  sessionOfPayments: SessionOfPayment[] = [];
  sessionOfPayment: SessionOfPayment = new SessionOfPayment();
  paymentUpdateForm!: FormGroup;
  paymentUpdateStatusForm!: FormGroup;
  date: any;
  isCotisation: boolean = true;
  isMember: boolean = false;
  idPayment: number = 0;
  users: User[] = [];

  constructor(private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private penalityTypeService: PenaltyTypeService,
    private paymentStatusService: PaymentStatusService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.findAllPaymentsOfASession();
    this.formInit();
    this.getAllPaymentStaus();
    this.getAllUserPaymentStateBySession();
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
      this.sessionOfPayments = res.data;
      console.log("sessionOfPayments::", res);
      
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
          this.paymentService.deletePayment(id).subscribe(
            () => {
              this.findAllPaymentsOfASession();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Payment has been deleted.',
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
      console.log("payment res:::", res);
      
    })
  }

  onSubmitUpdatePaymentStatus(){
    const formValue = this.paymentUpdateStatusForm.value;
     if(formValue.status == "VERIFIE"){
      this.checkPayment(this.idPayment);
     }else if(formValue.status == "VALIDE"){
      this.validatePayment(this.idPayment);
     }
  }

  checkPayment(idPayment: number){
    this.paymentService.checkPayment(idPayment).subscribe(()=>{
      this.closeUpdatePaymentStatusModal();
      this.getAllPaymentStaus()
      this.utilityService.showMessage(
        'success',
        'Le paiement a bien été vérifié !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  validatePayment(idPayment: number){
    this.paymentService.validatePayment(idPayment).subscribe(()=>{
      this.closeUpdatePaymentStatusModal();
      this.getAllPaymentStaus()
      this.utilityService.showMessage(
        'success',
        'Le paiement a bien été validé !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
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
        console.log("users::",  this.users);
        
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
  }
}

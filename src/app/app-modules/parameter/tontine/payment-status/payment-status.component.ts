import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentStatus } from 'src/app/core/classes/PaymentStatus';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PaymentStatusService } from 'src/app/core/services/payment-status/payment-status.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  show: boolean = false;
  paymentStatus: PaymentStatus[] = [];
  openStatusModal: string = "";
  openUpdateStatusModal: string = "";
  paymentStatusForm!: FormGroup;
  updatePaymentStatusForm!: FormGroup;
  pStatus: PaymentStatus = new PaymentStatus();

  constructor(private paymentStatusService: PaymentStatusService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllPaymentStaus();
    this.formInit();
  }

  formInit() {
    this.paymentStatusForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })

    this.updatePaymentStatusForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })
  }
  getAllPaymentStaus(){
    this.paymentStatusService.findAllPaymentStatus().subscribe((res)=>{
      this.paymentStatus = res.data;
      if ( this.paymentStatus.length <= 0 ) {
        this.show = true;
      }
      this.loaderService.hideLoader();
    })
  }

  onOpenStatusModal(){
    this.openStatusModal = "is-active"
  }

  closePaymentStatuspeModal(){
    this.openStatusModal = ""
  }


  onSubmitPaymentStatus(){
    const formValue = this.paymentStatusForm.value;
    this.pStatus.label =formValue.label;
    this.createPaymentStatus(this.pStatus);
  }

  createPaymentStatus(paymentStatus: PaymentStatus){
    console.log("paymentStatus", paymentStatus);
    this.paymentStatusService.createPaymentStatus(paymentStatus).subscribe(()=>{
      this.getAllPaymentStaus()
      this.closePaymentStatuspeModal()
      this.utilityService.showMessage(
        'success',
        'Le status a été crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onOpenUpdateStatus(id: number){
    this.paymentStatusService.findPaymentStatusById(id).subscribe((res)=>{
      this.pStatus = res.data;
      this.openUpdateStatusModal = "is-active"
    })
   
  }

  closeUpdatePaymentStatuspeModal(){
    this.openUpdateStatusModal = ""
  }

  onSubmitUpdatePaymentStatus(id: number){
    const formValue = this.updatePaymentStatusForm.value;
    this.pStatus.label =formValue.label;
    this.updatePaymentStatus(this.pStatus, id);
  }

  updatePaymentStatus(paymentStatus: PaymentStatus, id: number){
    this.paymentStatusService.updatePaymentStatus(paymentStatus, id).subscribe(()=>{
      this.closeUpdatePaymentStatuspeModal();
      this.getAllPaymentStaus();
      this.utilityService.showMessage(
        'success',
        'Le status a été modifié avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onDelete(id: number){
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
          this.paymentStatusService.deletePaymentStatus(id).subscribe(
            () => {
              this.getAllPaymentStaus();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Le statut a été supprimé.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite !',
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
}

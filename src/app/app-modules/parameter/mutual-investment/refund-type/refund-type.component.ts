import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RefundType } from 'src/app/core/classes/refundType';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { RefundTypeService } from 'src/app/core/services/mutual-investment/refund-type/refund-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refund-type',
  templateUrl: './refund-type.component.html',
  styleUrls: ['./refund-type.component.scss']
})
export class RefundTypeComponent implements OnInit {

  show: boolean = false;
  refundType: RefundType = new RefundType();
  refundTypes: RefundType[] = [];
  openCreateModal: string = "";
  openUpdateModal: string = "";
  createRefundTypeForm!: FormGroup;
  updateRefundTypeForm!: FormGroup;
  isSaving: boolean = false;
  constructor(private refundTypeService: RefundTypeService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllRefundTypes();
    this.formInit();
  }

  formInit() {
    this.createRefundTypeForm = this.formBuilder.group({
      type: new FormControl(null, Validators.required),
    })
    this.updateRefundTypeForm = this.formBuilder.group({
      type: new FormControl(null, Validators.required),
    })
  }

  getAllRefundTypes(){
    this.refundTypeService.findAllRefundTypes().subscribe((res)=>{
      this.refundTypes = res.data;
      if ( this.refundTypes.length <= 0 ) {
        this.show = true;
      }
      this.loaderService.hideLoader();
    })
  }

  closeRefundTypeFormModal(){
    this.openCreateModal = "";
  }

  closeUpdateRefundTypeFormModal(){
    this.openUpdateModal = "";
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }


  onSubmitCreateRefundTypeForm(){
    this.isSaving = true;
    const formValue = this.createRefundTypeForm.value;
    this.refundType.type =formValue.type;
    this.refundTypeService.createRefundType(this.refundType).subscribe((res)=>{
      this.isSaving = false;
      this.getAllRefundTypes();
      this.closeRefundTypeFormModal();
      this.utilityService.showMessage(
        'success',
        'Type de remboussement crée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.closeRefundTypeFormModal();
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onOpenUpdateModal(id: number){
    this.refundTypeService.findRefundTypeById(id).subscribe((res)=>{
      this.refundType = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateRefundTypeForm(id: number){
    this.isSaving = true;
    const formValue = this.updateRefundTypeForm.value;
    this.refundType.type =formValue.type;
    this.refundTypeService.updateRefundType(this.refundType, id).subscribe((res)=>{
      this.getAllRefundTypes();
      this.closeUpdateRefundTypeFormModal()
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Type de remboussement modifié avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.closeUpdateRefundTypeFormModal()
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
          this.refundTypeService.deleteRefundType(id).subscribe(
            () => {
              this.getAllRefundTypes();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Type de remboussement supprimé avec succès !',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\est produite',
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DroweeForm } from 'src/app/core/classes/droweeForm';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';
import { ProfitabilityType } from 'src/app/core/classes/profitabilityType';
import { RefundType } from 'src/app/core/classes/refundType';
import { DraweeFormService } from 'src/app/core/services/mutual-investment/drawee-form/drawee-form.service';
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { ProfitabilityTypeService } from 'src/app/core/services/mutual-investment/profitability-type/profitability-type.service';
import { RefundTypeService } from 'src/app/core/services/mutual-investment/refund-type/refund-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mutual-investment',
  templateUrl: './mutual-investment.component.html',
  styleUrls: ['./mutual-investment.component.scss']
})
export class MutualInvestmentComponent implements OnInit {
  ngSelect1 = 0;
  ngSelect2 = 0;
  ngSelect3 = 0;
  openCreateModal: string = ""
  createMutualInvestmentForm!: FormGroup
  endDate: any;
  startDate: any;
  createMutualInvestment: boolean = false;
  isSaving: boolean = false;
  draweeForms: DroweeForm[] = [];
  profitabilityTypes: ProfitabilityType[] = [];
  refundTypes: RefundType[] = [];
  mutualInvestment: MutualInvestment = new MutualInvestment();
  mutualInvestments: MutualInvestment[] = [];

  openUpdateModal: string = "";
  updateMutualInvestmentForm!: FormGroup;

  constructor(private mutualInvestmentService: MutualInvestmentService,
    private draweeFormService: DraweeFormService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private profitabilityTypeService: ProfitabilityTypeService,
    private refundTypeService: RefundTypeService,) { }

  ngOnInit(): void {
    this.getAllMutualInvestments();
    this.getAllDroweeForm();
    this.getAllProfitabilityType();
    this.getAllRefundTypes();
    this.formInit();
  }

  formInit() {
    this.createMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organism: new FormControl(null, Validators.required),
      minimumAmount: new FormControl(null, Validators.required),
      idDraweeForm: new FormControl(null, Validators.required),
      idProfitabilityType: new FormControl(null, Validators.required),
      idRefundType: new FormControl(null, Validators.required),
      profitabilityRate: new FormControl(null, Validators.required),
      echeanceDurationInMonths: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })

    this.updateMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organism: new FormControl(null, Validators.required),
      minimumAmount: new FormControl(null, Validators.required),
      profitabilityRate: new FormControl(null, Validators.required),
    })
  }

  getAllMutualInvestments(){
    this.mutualInvestmentService.findAllMutualInvestments().subscribe((res)=>{
      this.mutualInvestments = res.data;
    })
  }

  getAllDroweeForm(){
    this.draweeFormService.findAllDraweeForm().subscribe((res)=>{
      this.draweeForms = res.data;
    })
  }

  getAllProfitabilityType(){
    this.profitabilityTypeService.findAllProfitabilityTypes().subscribe((res)=>{
      this.profitabilityTypes = res.data;
    })
  }

  getAllRefundTypes(){
    this.refundTypeService.findAllRefundTypes().subscribe((res)=>{
      this.refundTypes = res.data;
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  onCloseCreateModal(){
    this.openCreateModal = "";
  }

  onSubmitMutualInvestment(){
    this.isSaving = true;
    const formValue = this.createMutualInvestmentForm.value;
    this.mutualInvestment.echeanceDurationInMonths = formValue.echeanceDurationInMonths;
    this.mutualInvestment.minimumAmount = formValue.minimumAmount;
    this.mutualInvestment.name = formValue.name;
    this.mutualInvestment.endDate = formValue.endDate;
    this.mutualInvestment.startDate = formValue.startDate;
    this.mutualInvestment.organism = formValue.organism;
    this.mutualInvestment.profitabilityRate = formValue.profitabilityRate;
    this.mutualInvestment.rating = formValue.rating;
    this.createAMutualInvestment(this.mutualInvestment, formValue.idDraweeForm, formValue.idRefundType, formValue.idProfitabilityType);
    
  }

  createAMutualInvestment(mutualInvestment: MutualInvestment, idDraweeForm: number, idRefundType: number, idProfitabilityType: number){
    this.mutualInvestmentService.createMutualInvestment(mutualInvestment, idDraweeForm, idRefundType, idProfitabilityType).subscribe(()=>{
      this.isSaving = false;
      this.getAllMutualInvestments();
      this.createMutualInvestmentForm.reset();
      this.utilityService.showMessage(
        'success',
        'Placement créé avec succès',
        '#06d6a0',
        'white'
      );
    },(error)=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onCreate(){
    this.onSubmitMutualInvestment();
  }

  cancelCreatingMutualInvestment(){
    this.createMutualInvestment = false;
  }

  onSelectIsstartDate(event: any){

  }

  onSelectIsendDate(event: any){

  }

  onOpenCreateMutualInvestment(){
    this.createMutualInvestment = true;
  }

  ////////////////// Update Option
  onUpdateMutualInvestment(id: number) {
    this.mutualInvestmentService.findMutualInvestmentById(id).subscribe((res) => {
      this.openUpdateModal = "is-active"
      this.mutualInvestment = res.data
    }, (error)=>{
      console.log(error);
    })
  }

  onCloseUpdateModal() {
    this.openUpdateModal = ""
  }

  onSubmitUpdateMutualInvestment() {
    this.isSaving = true;
    const formValue = this.updateMutualInvestmentForm.value;
    this.mutualInvestment.name = formValue.name;
    this.mutualInvestment.organism = formValue.organism;
    this.mutualInvestment.minimumAmount = formValue.minimumAmount;
    this.mutualInvestment.profitabilityRate = formValue.profitabilityRate;
    this.mutualInvestmentService.updateMutualInvestment(this.mutualInvestment, formValue.id).subscribe(() => {
      this.isSaving = false;
      this.getAllMutualInvestments();
      this.onCloseUpdateModal();
      this.utilityService.showMessage(
        'success',
        'Club mis a jour avec succès',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
    })
  }

  ////////////////// Delete Option
  onDeleteMutualInvestment(id: number) {
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
        title: 'Etes-vous sure ?',
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
          this.mutualInvestmentService.deleteMutualInvestment(id).subscribe(
            () => {
              this.getAllMutualInvestments();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Placement mutualisé a été supprimé.',
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
            text: 'La supprission a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

}

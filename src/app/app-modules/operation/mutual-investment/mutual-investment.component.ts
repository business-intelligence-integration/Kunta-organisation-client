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
import { UserService } from 'src/app/core/services/users/user.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/core/classes/user';
import { FrequencyService } from 'src/app/core/services/frequencies/frequency.service';
import { Frequency } from 'src/app/core/classes/frequency';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { SubscriptionOffer } from 'src/app/core/classes/subscriptionOffer';
import { RiskProfileService } from 'src/app/core/services/mutual-investment/risk-profile/risk-profile.service';
import { RiskProfile } from 'src/app/core/classes/riskProfile';
import { Center } from 'src/app/core/classes/center';
import { CenterService } from 'src/app/core/services/centers/center.service';

@Component({
  selector: 'app-mutual-investment',
  templateUrl: './mutual-investment.component.html',
  styleUrls: ['./mutual-investment.component.scss']
})
export class MutualInvestmentComponent implements OnInit {
  ngSelect1 = 0;
  ngSelect2 = 0;
  ngSelect3 = 0;
  ngSelect4 = 0;
  ngSelect5 = 0;
  ngSelect6 = 0;
  ngSelect7 = 0;
  ngSelect8 = 0;
  ngSelect9 = 0;
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
  minEndDate: any;
  date: any;
  showErroMessage: boolean = false;

  isPhysical: boolean = false;
  isOthers: boolean = false;
  isCertain: boolean = false;
  isPeriod: boolean = false;
  mutualists: User[] =[];
  centerUsers: User[] =[];
  frequencies: Frequency[] = [];
  openUpdateModal: string = "";
  updateMutualInvestmentForm!: FormGroup;
  idInvestment: number = 0;
  openDepositModal: string = "";
  openOfferModal: string = "";
  addSecurityDepositForm!: FormGroup;
  addSubscriptionOfferForm!: FormGroup;
  securityDeposit: SecurityDeposit = new SecurityDeposit();
  subscriptionOffer: SubscriptionOffer = new SubscriptionOffer();
  riskProfiles: RiskProfile[] = [];
  disabledInput: boolean = true;
  isOfferCertain: boolean = false;
  centers: Center[] = [];

  constructor(private mutualInvestmentService: MutualInvestmentService,
    private centerService: CenterService,
    private userService: UserService,
    private draweeFormService: DraweeFormService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private profitabilityTypeService: ProfitabilityTypeService,
    private riskProfileService: RiskProfileService,
    private refundTypeService: RefundTypeService,
    private frequencyService: FrequencyService,) { }

  ngOnInit(): void {
    this.getAllMutualInvestments();
    this.getAllMutualists();
    this.getAllCenters();
    this.getAllDroweeForm();
    this.getAllProfitabilityTypes();
    this.getAllRiskProfiles();
    this.getAllRefundTypes();
    this.getAllFrequency();
    this.formInit();
  }

  formInit() {
    this.createMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organism: new FormControl(null),
      minimumAmount: new FormControl(null, Validators.required),
      idCenter: new FormControl(null, Validators.required),
      idDraweeForm: new FormControl(null, Validators.required),
      idMutualist: new FormControl(null),
      idProfitabilityType: new FormControl(null, Validators.required),
      idRefundType: new FormControl(null, Validators.required),
      idFrequency: new FormControl(null),
      profitabilityRate: new FormControl(null),
      echeanceDurationInMonths: new FormControl(null),
      rating: new FormControl(null),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })

    this.updateMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organism: new FormControl(null),
      minimumAmount: new FormControl(null, Validators.required),
      profitabilityRate: new FormControl(null),
    })

    this.addSubscriptionOfferForm = this.formBuilder.group({
      idProfile: new FormControl(null, Validators.required),
      idProfitabilityType: new FormControl(null, Validators.required),
      profitabilityRate: new FormControl(null),
    })

    this.addSecurityDepositForm = this.formBuilder.group({
      idUser: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  getAllMutualInvestments(){
    this.mutualInvestmentService.findAllMutualInvestments().subscribe((res)=>{
      this.mutualInvestments = res.data;
      console.log("mutualInvestments:: ", res.data);
      
    })
  }

  getAllMutualists(){
    this.userService.getAllMutualists().subscribe((res)=>{
      this.mutualists = res.data;
    })
  }

  getAllCenters(){
    this.centerService.findAllCenters().subscribe((res)=>{
      this.centers = res.data;
    })
  }

  getAllDroweeForm(){
    this.draweeFormService.findAllDraweeForm().subscribe((res)=>{
      this.draweeForms = res.data;
    })
  }

  getAllProfitabilityTypes(){
    this.profitabilityTypeService.findAllProfitabilityTypes().subscribe((res)=>{
      this.profitabilityTypes = res.data;
    })
  }

  getAllRiskProfiles(){
    this.riskProfileService.findAllRiskProfiles().subscribe((res)=>{
      this.riskProfiles = res.data;
    })
  }

  getAllRefundTypes(){
    this.refundTypeService.findAllRefundTypes().subscribe((res)=>{
      this.refundTypes = res.data;
    })
  }

  getAllFrequency(){
    this.frequencyService.findAllFrequencies().subscribe((res)=>{
      this.frequencies = res.data;
    })
  }

  onDraweeSelected(val: any) {
    if(val == 2) {
      this.isPhysical = true;
      this.isOthers = false;
    } else if (val != 2 && val != 0) {
      this.isPhysical = false;
      this.isOthers = true;
    }
  }
  
  onProfitabilitySelected(val: any) {
    if(val == 1) {
      this.isCertain = true;
    } else {
      this.isCertain = false;
    }
  }

  onRefundSelected(val: any) {
    if (val == 2) {
      this.isPeriod = true;
    } else {
      this.isPeriod = false;
    }
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  onCloseCreateModal(){
    this.openCreateModal = "";
  }

  onSubmitMutualInvestment(){
    let idFrequency: number = 0;
    let idMutualist: number = 0;
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
    if(formValue.idFrequency != null){
       idFrequency = formValue.idFrequency
    }if(formValue.idMutualist != null){
      idMutualist = formValue.idMutualist
    }

    this.createAMutualInvestment(this.mutualInvestment, formValue.idDraweeForm, formValue.idRefundType, formValue.idProfitabilityType, formValue.idCenter, idFrequency, idMutualist);
  }

  createAMutualInvestment(mutualInvestment: MutualInvestment, idDraweeForm: number, idRefundType: number, idProfitabilityType: number, idCenter:number, idFrequency: number, idMutualist: number){
    this.mutualInvestmentService.createMutualInvestment(mutualInvestment, idDraweeForm, idRefundType, idProfitabilityType, idCenter, idFrequency, idMutualist).subscribe((res)=>{
      this.isSaving = false;
      this.getAllMutualInvestments();
      this.createMutualInvestmentForm.reset();
      this.cancelCreatingMutualInvestment();
      this.utilityService.showMessage(
        'success',
        'Placement mutualisé crée avec succès !',
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
    this.minEndDate = this.startDate;
    this.endDate = null;
  }

  onSelectIsendDate(event: any){
    if(this.startDate == undefined || this.startDate == null){
      this.showErroMessage = true;
      this.endDate = null;
    }else{
      this.showErroMessage = false;
    }
  }

  onOpenCreateMutualInvestment(){
    this.createMutualInvestment = true;
  }

  ///////////////// Add Subscription Offer
  onOpenAddSubscriptionOffer(idInvestment: number){
    this.openOfferModal = "is-active";
    this.idInvestment = idInvestment;
  }

  closeSubscriptionOfferModal() {
    this.openOfferModal = "";
  }

  onAddSubscriptionOffer() {
    let profitabilityRate: number = 0;
    const formValue = this.addSubscriptionOfferForm.value;
    if(formValue.profitabilityRate != null){
      profitabilityRate = formValue.profitabilityRate;
    }
    this.addSubscriptionOffer(this.idInvestment, formValue.idProfile, formValue.idProfitabilityType, profitabilityRate)
  }

  addSubscriptionOffer(idInvestment: number, idProfile: number, idProfitabilityType: number, profitabilityRate: number) {
    this.isSaving = true;
    this.mutualInvestmentService.createSubscriptionOffer(idInvestment, idProfile, idProfitabilityType, profitabilityRate).subscribe((res) => {
      this.isSaving = false;
      this.getAllMutualInvestments();
      this.addSubscriptionOfferForm.reset();
      this.closeSubscriptionOfferModal();
      this.utilityService.showMessage(
        'success',
        'Offre ajoutée avec succès',
        '#06d6a0',
        'white'
      );
    }, (error) => {
      console.log("error: ", error);
      this.isSaving = false;
      this.closeSubscriptionOfferModal();
      this.addSubscriptionOfferForm.reset();
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onOfferProfitabilitySelected(val: any) {
    if(val == 1) {
      this.isOfferCertain = true;
    } else {
      this.isOfferCertain = false;
    }
  }

  ///////////////// Add Security Deposit
  onOpenAddSecurityDeposit(idInvestment: number){
    this.openDepositModal = "is-active";
    this.idInvestment = idInvestment;
    this.getMutualInvestmentById(idInvestment);
  }

  getMutualInvestmentById(idInvestment: number){
    this.mutualInvestmentService.findMutualInvestmentById(idInvestment).subscribe((res)=>{
      this.getAllUsersByIdCenter(res.data.mutualCenter.id);
    });
  }

  getAllUsersByIdCenter(idMutualCenter: number){
    this.centerService.findUsersByIdCenter(idMutualCenter).subscribe((res)=>{
      this.centerUsers = res.data;
    })
  }

  closeSecurityDepositModal() {
    this.openDepositModal = "";
  }

  onAddSecurtiyDeposit() {
    const formValue = this.addSecurityDepositForm.value;
    this.securityDeposit.amount = formValue.amount;
    this.addSecurityDeposit(this.idInvestment, formValue.idUser, this.securityDeposit)
  }

  addSecurityDeposit(idInvestment: number, idUser: number, securityDeposit: SecurityDeposit) {
    this.isSaving = true;
    this.mutualInvestmentService.addSecurityDeposit(idInvestment, idUser, securityDeposit).subscribe((res) => {
      this.isSaving = false;
      this.getAllMutualInvestments();
      // this.addSecurityDepositForm.reset();
      this.closeSecurityDepositModal();
      this.utilityService.showMessage(
        'success',
        'Caution ajoutée avec succès',
        '#06d6a0',
        'white'
      );
    }, (error) => {
      console.log("error: ", error);
      this.isSaving = false;
      this.closeSecurityDepositModal();
      this.addSecurityDepositForm.reset();
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  ////////////////// Update Mutual Investment
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
        'Placement mis a jour avec succès',
        '#06d6a0',
        'white'
      );
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

  ////////////////// Delete Mutual Investment
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
                text: 'Le placement mutualisé a été supprimé avec succès !.',
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

  //////////////////////// Deblocage Placement
  onUnlock(id: number){
    this.unlockMessage(id);
  }

  unlockMessage(id: number) {
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
        confirmButtonText: 'Oui, debloquer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mutualInvestmentService.releaseOperation(id).subscribe(
            () => {
              this.getAllMutualInvestments();
              swalWithBootstrapButtons.fire({
                title: 'Debloqué !',
                text: 'Le placement mutualisé a été debloqué avec succès !.',
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

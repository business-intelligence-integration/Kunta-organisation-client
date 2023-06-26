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
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { Payment } from 'src/app/core/classes/payment';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { FirstRefundDate } from 'src/app/core/classes/firstRefundDate';
import { Refund } from 'src/app/core/classes/refund';
import { DistributionPercentage } from 'src/app/core/classes/distributionPercentage';
import { ClosingDate } from 'src/app/core/classes/closingDate';
import { MutOrganism } from 'src/app/core/classes/mutOrganism';



@Component({
  selector: 'app-mutual-investment',
  templateUrl: './mutual-investment.component.html',
  styleUrls: ['./mutual-investment.component.scss']
})
export class MutualInvestmentComponent implements OnInit {
  show: boolean = false;
  ngSelect1 = 0;
  ngSelect2 = 0;
  ngSelect3 = 0;
  ngSelect4 = 0;
  ngSelect5 = 0;
  ngSelect6 = 0;
  ngSelect7 = 0;
  ngSelect8 = 0;
  ngSelect9 = 0;
  ngSelect10 = 0;
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
  refund: Refund = new Refund();
  minEndDate: any;
  date: any;
  showErroMessage: boolean = false;

  isPhysical: boolean = false;
  isMutualist: boolean = false;
  isOthers: boolean = false;
  isCertain: boolean = false;
  isPeriod: boolean = false;
  mutualists: User[] =[];
  mutualistOfSelect: any;
  centerUserOfSelect: any;
  centerUsers: User[] =[];
  frequencies: Frequency[] = [];
  openUpdateModal: string = "";
  openRefundModal: string = "";
  openGenerateModal: string = "";
  openClosingDateModal: string = "";
  openViewRefundsModal: string = "";
  openPercentageModal: string = "";
  openDistributionModal: string = "";
  updateMutualInvestmentForm!: FormGroup;
  idInvestment: number = 0;
  openDepositModal: string = "";
  openOfferModal: string = "";
  addSecurityDepositForm!: FormGroup;
  addSubscriptionOfferForm!: FormGroup;
  refundForm!: FormGroup;
  generateForm!: FormGroup;
  closingDateForm!: FormGroup;
  securityDeposit: SecurityDeposit = new SecurityDeposit();
  subscriptionOffer: SubscriptionOffer = new SubscriptionOffer();
  riskProfiles: RiskProfile[] = [];
  disabledInput: boolean = true;
  isOfferCertain: boolean = false;
  centers: Center[] = [];
  paymentMethods: PaymentMethod[] = [];
  payment: Payment = new Payment();
  dateNow: any;
  amountCollecteds: Payment[] = [];
  mutOrganism: MutOrganism = new MutOrganism();
  physicalPerson: User = new User();
  refundType: string = "";
  // firstRefundDate: any;
  isReleased: boolean = true;
  firstRefundDate: FirstRefundDate = new FirstRefundDate();
  closingDate: ClosingDate = new ClosingDate();
  percentageMutual: number = 0;
  percentageOfFunders: number = 0;
  percentageOfGuarantees: number = 0;
  percentageOfPassiveIncomeFund: number = 0;
  percentageCompleted: boolean = false;
  profitabilityRate: number = 0;
  percentageOkay: boolean = false;
  amountToBeRefunded: number = 0;
  totalRefunded: number = 0;
  addPercentageForm!: FormGroup;
  distributionPercentage: DistributionPercentage = new DistributionPercentage();

  constructor(private mutualInvestmentService: MutualInvestmentService,
    private centerService: CenterService,
    private userService: UserService,
    private draweeFormService: DraweeFormService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private profitabilityTypeService: ProfitabilityTypeService,
    private riskProfileService: RiskProfileService,
    private paymentMethodService: PaymentMethodService,
    private refundTypeService: RefundTypeService,
    private frequencyService: FrequencyService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllMutualInvestments();
    this.getAllMutualists();
    this.getAllCenters();
    this.getAllDroweeForm();
    this.getAllProfitabilityTypes();
    this.getAllRiskProfiles();
    this.getAllPaymentMethod();
    this.getAllRefundTypes();
    this.getAllFrequency();
    this.initDates();
    this.formInit();
  }

  formInit() {
    this.createMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      organismName: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      city: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
      minimumAmount: new FormControl(null, Validators.required),
      idCenter: new FormControl(null, Validators.required),
      idDraweeForm: new FormControl(null, Validators.required),
      idMutualist: new FormControl(null),
      idProfitabilityType: new FormControl(null, Validators.required),
      idRefundType: new FormControl(null, Validators.required),
      idFrequency: new FormControl(null),
      profitabilityRate: new FormControl(null),
      echeanceDurationInMonths: new FormControl(null),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })

    this.updateMutualInvestmentForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      // organismName: new FormControl(null),
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

    this.refundForm = this.formBuilder.group({
      paid: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      idPaymentMethod: new FormControl(null, Validators.required),
    })

    this.generateForm = this.formBuilder.group({
      firstRefundDate: new FormControl(null),
      amountToBeRefunded: new FormControl(null),
      refundDate: new FormControl(null),
    })

    this.addPercentageForm = this.formBuilder.group({
      percentageMutual: new FormControl(null, Validators.required),
      percentageOfFunders: new FormControl(null, Validators.required),
      percentageOfGuarantees: new FormControl(null, Validators.required),
      percentageOfPassiveIncomeFund: new FormControl(null, Validators.required),
    })

    this.closingDateForm = this.formBuilder.group({
      closingDate: new FormControl(null, Validators.required),
    })
  }

  getAllMutualInvestments(){
    this.mutualInvestmentService.findAllMutualInvestments().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.mutualInvestments = res.data;
        this.mutualInvestments.forEach((element) => {
          element.offers.forEach((element) => {
            element.subscriptions.forEach((element) => {
              if (element.status != 'RELEASED') {
                this.isReleased = false;
              }
            })
          })
        })
        if( this.mutualInvestments.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  getAllMutualists(){
    let users: User[] = [];
    // this.userService.getAllMutualists().subscribe({
    //   next: (res)=> res.data.map((user: any)=>{
    //     this.mutualistOfSelect = {value: user.id, label: user.firstName + " " + user.lastName}
    //   })
    // })
    this.userService.getAllMutualists().subscribe((res)=>{
      this.mutualistOfSelect = res.data.map((user:any)=>({value: user.id, label: user.firstName + " " + user.lastName}))
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

  getAllPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data;
    })
  }

  onPercentageMutualSelected(val: any) {
    this.percentageMutual = val;
    if(this.percentageMutual + this.percentageOfFunders + this.percentageOfGuarantees + this.percentageOfPassiveIncomeFund == 100){
      this.percentageCompleted = true;
    }else {
      this.percentageCompleted = false;
    }
  }

  onPercentageFundersSelected(val: any) {
    this.percentageOfFunders = val;
    if(this.percentageMutual + this.percentageOfFunders + this.percentageOfGuarantees + this.percentageOfPassiveIncomeFund == 100){
      this.percentageCompleted = true;
    }else {
      this.percentageCompleted = false;
    }
  }

  onPercentageGuaranteesSelected(val: any) {
    this.percentageOfGuarantees = val;
    if(this.percentageMutual + this.percentageOfFunders + this.percentageOfGuarantees + this.percentageOfPassiveIncomeFund == 100){
      this.percentageCompleted = true;
    }else {
      this.percentageCompleted = false;
    }
  }

  onPercentageIncomeSelected(val: any) {
    this.percentageOfPassiveIncomeFund = val;
    if(this.percentageMutual + this.percentageOfFunders + this.percentageOfGuarantees + this.percentageOfPassiveIncomeFund == 100){
      this.percentageCompleted = true;
    }else {
      this.percentageCompleted = false;
    }
  }

  onDraweeSelected(val: any) {
    if(val == 2) {
      this.isPhysical = true;
      this.isOthers = false;
      this.isMutualist = false;
    } else if (val == 5) {
      this.isPhysical = false;
      this.isOthers = false;
      this.isMutualist = true;
    } else if (val != 2 && val != 0 && val != 5) {
      this.isPhysical = false;
      this.isOthers = true;
      this.isMutualist = false;
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
    // this.mutualInvestment.organism = formValue.organism;
    this.mutualInvestment.profitabilityRate = formValue.profitabilityRate;
    if(formValue.idFrequency != null){
       idFrequency = formValue.idFrequency
    }if(formValue.idMutualist != null){
      idMutualist = formValue.idMutualist
    }if(this.isOthers == true){
      this.mutOrganism.email = formValue.email;
      this.mutOrganism.city = formValue.city;
      this.mutOrganism.organismName = formValue.organismName;
      this.mutOrganism.firstName = formValue.firstName;
      this.mutOrganism.lastName = formValue.lastName;
      this.mutOrganism.userName = formValue.userName;
      this.mutOrganism.phoneNumber = formValue.phoneNumber;
      this.mutualInvestment.mutOrganism = this.mutOrganism;
    }if(this.isPhysical == true){
      this.physicalPerson.email = formValue.email;
      this.physicalPerson.city = formValue.city;
      this.physicalPerson.firstName = formValue.firstName;
      this.physicalPerson.lastName = formValue.lastName;
      this.physicalPerson.userName = formValue.userName;
      this.physicalPerson.phoneNumber = formValue.phoneNumber;
      this.mutualInvestment.physicalPerson = this.physicalPerson;
    }

    if(formValue.idProfitabilityType == 1 && !formValue.profitabilityRate){
      this.utilityService.showMessage(
        'warning',
        'Veuillez entrer un taux de rentabilité',
        '#e62965',
        'white'
      );
      this.isSaving = false;
    // }else if(formValue.idProfitabilityType == 2){
    //   this.mutualInvestment.profitabilityRate = 0;
    }else if(formValue.idRefundType == 2 && !formValue.idFrequency ){
      this.utilityService.showMessage(
        'warning',
        'Entrer la fréquence',
        '#e62965',
        'white'
      );
      this.isSaving = false;
    }else if(formValue.idRefundType == 2 && !formValue.echeanceDurationInMonths ){
      this.utilityService.showMessage(
        'warning',
        'Entrer la durée de l\'échéance ',
        '#e62965',
        'white'
      );
      this.isSaving = false;
    } else {
      this.createAMutualInvestment(this.mutualInvestment, formValue.idDraweeForm, formValue.idRefundType, formValue.idProfitabilityType, formValue.idCenter, idFrequency, idMutualist);
    }
  }

  createAMutualInvestment(mutualInvestment: MutualInvestment, idDraweeForm: number, idRefundType: number, idProfitabilityType: number, idCenter:number, idFrequency: number, idMutualist: number){
    this.mutualInvestmentService.createMutualInvestment(mutualInvestment, idDraweeForm, idRefundType, idProfitabilityType, idCenter, idFrequency, idMutualist).subscribe((res)=>{
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
          this.getAllMutualInvestments();
          this.createMutualInvestmentForm.reset();
          this.cancelCreatingMutualInvestment();
          this.utilityService.showMessage(
            'success',
            'Placement mutualisé créé avec succès !',
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
    this.getMutualInvestmentById(idInvestment);
  }

  onProfitabilityRateSelected(val: any){
    if(val > this.mutualInvestment.percentageOfFunders ){
      this.percentageOkay = true;
    } else {
      this.percentageOkay = false;
    }
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
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            'Souci de création de l\'offre, rassurez-vous d\'avoir créer les pourcentages de distribution au préalable.',
            '#e62965',
            'white'
          );
        } else {
          this.getAllMutualInvestments();
          this.addSubscriptionOfferForm.reset();
          this.closeSubscriptionOfferModal();
          this.utilityService.showMessage(
            'success',
            'Offre ajoutée avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.closeSubscriptionOfferModal();
        this.addSubscriptionOfferForm.reset();
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite, verifier votre saisis',
          '#e62965',
          'white'
        );
      }
    }, () => {
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
      this.refundType = res.data.refundType.type;
      this.profitabilityRate = res.data.profitabilityRate;
      this.amountToBeRefunded = res.data.amountToBeRefunded;
      this.mutualInvestment = res.data;
      // this.percentageOfFunders = res.data.percentageOfFunders;
      res.data.refunds.forEach((element: any) => {
        this.totalRefunded = this.totalRefunded + element.amountToBeRefunded;
      })
      this.getAllUsersByIdCenter(res.data.mutualCenter.id);
      // this.amountCollecteds = res.data.amountCollecteds;
    });
  }

  getAllUsersByIdCenter(idMutualCenter: number){
    this.centerService.findMutualistsByIdCenter(idMutualCenter).subscribe((res)=>{
      // this.centerUsers = res.data;
      this.centerUserOfSelect = res.data.map((user:any)=>({value: user.id, label: user.firstName + " " + user.lastName}));
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
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllMutualInvestments();
          this.closeSecurityDepositModal();
          this.addSecurityDepositForm.reset();
          this.utilityService.showMessage(
            'success',
            'Caution ajoutée avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.closeSecurityDepositModal();
        this.addSecurityDepositForm.reset();
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite, verifier votre saisis',
          '#e62965',
          'white'
        );
      }
    }, () => {
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

  onSubmitUpdateMutualInvestment(id: number) {
    this.isSaving = true;
    const formValue = this.updateMutualInvestmentForm.value;
    this.mutualInvestment.name = formValue.name;
    // this.mutualInvestment.organism = formValue.organism;
    this.mutualInvestment.minimumAmount = formValue.minimumAmount;
    this.mutualInvestment.profitabilityRate = formValue.profitabilityRate;
    this.mutualInvestmentService.updateMutualInvestment(this.mutualInvestment, id).subscribe((res) => {
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
          this.getAllMutualInvestments();
          this.onCloseUpdateModal();
          this.utilityService.showMessage(
            'success',
            'Placement mis à jour avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite, verifiez votre saisis',
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
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, débloquer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mutualInvestmentService.releaseOperation(id).subscribe(
            (res) => {
              if( res == null ) {
                swalWithBootstrapButtons.fire({
                  title: 'Annulé',
                  text: 'Une erreur s\'est produite. Rassurez-vous que les cautions aient été crées et que la somme des montants des cautions soit équivalent au montant à rembourser pour le placement ou alors que tous les souscription aient été payé',
                  confirmButtonColor: '#d33',
                });
              } else {
                this.getAllMutualInvestments();
                swalWithBootstrapButtons.fire({
                  title: 'Débloqué !',
                  text: 'Le placement mutualisé a été debloqué avec succès !.',
                  confirmButtonColor: '#198AE3',
                });
              }
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

  //////////////////////////////// onRefund User
  onSelectDate(event: any){

  }

  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  onRefund(idInvestment: number){
    this.openRefundModal = "is-active";
    this.idInvestment = idInvestment;
  }

  onCloseRefundModal(){
    this.openRefundModal = "";
  }

  onSubmitRefund(){
    // let idPaymentMethod: number = 0;
    this.isSaving = true;
    const formValue = this.refundForm.value;
    this.payment.paid = formValue.paid;
    this.payment.proof = formValue.proof;
    this.payment.date = formValue.date;
    this.mutualInvestmentService.refundOfAmountsCollected(this.idInvestment, formValue.idPaymentMethod, this.payment).subscribe((res)=>{
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
          this.getAllMutualInvestments();
          this.refundForm.reset();
          this.onCloseRefundModal();
          this.utilityService.showMessage(
            'success',
            'Placement remboursé avec succès',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite, verifier votre saisis',
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

  ////////////////////////////// View Collected Refunds
  onViewRefunds(idInvestment: number){
    this.openViewRefundsModal = "is-active";
    this.idInvestment = idInvestment;
    this.getMutualInvestmentById(idInvestment);
  }

  closeViewRefundsModal(){
    this.openViewRefundsModal = "";
  }

  //////////////////////////////////////Generate Dates
  onGenerate(idInvestment: number){
    this.openGenerateModal = "is-active";
    this.idInvestment = idInvestment;
    this.getMutualInvestmentById(idInvestment);
  }

  onCloseGenerateModal(){
    this.openGenerateModal = "";
  }

  onSubmitGenerate(){
    this.isSaving = true;
    const formValue = this.generateForm.value;
    if ( this.refundType == "PÉRIODIQUEMENT" ) {
      // this.firstRefundDate = formValue.firstRefundDate;
      let firstRefundDate : any = new DatePipe('en-US').transform(new Date(formValue.firstRefundDate),'yyyy-MM-dd');
      this.firstRefundDate.date = firstRefundDate
      if(!firstRefundDate){
        this.utilityService.showMessage(
          'warning',
          'Entrer la 1ere date de remboursement',
          '#e62965',
          'white'
        );
      } else {
        this.mutualInvestmentService.generateRefundDates(this.idInvestment, this.firstRefundDate).subscribe((res)=>{
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
              this.getAllMutualInvestments();
              this.generateForm.reset();
              this.onCloseGenerateModal();
              this.utilityService.showMessage(
                'success',
                'Date(s) generée(s) avec succès',
                '#06d6a0',
                'white'
              );
            }
          } else {
            this.utilityService.showMessage(
              'warning',
              'Une erreur s\'est produite, verifier votre saisis',
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
      
    } else if ( this.refundType == 'A L\'ÉCHÉANCE' ) {
      let firstRefundDate : any = new DatePipe('en-US').transform(new Date(formValue.firstRefundDate),'yyyy-MM-dd');
      this.firstRefundDate.date = firstRefundDate
      this.mutualInvestmentService.generateRefundDates(this.idInvestment, this.firstRefundDate).subscribe((res)=>{
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
            this.getAllMutualInvestments();
            this.generateForm.reset();
            this.onCloseGenerateModal();
            this.utilityService.showMessage(
              'success',
              'Date(s) générée(s) avec succès',
              '#06d6a0',
              'white'
            );
          }
        } else {
          this.utilityService.showMessage(
            'warning',
            'Une erreur s\'est produite, verifier votre saisis',
            '#e62965',
            'white'
          );
        }
      })
    } else if ( this.refundType == 'AVEC DIFFÉRÉ' ) {
      this.refund.amountToBeRefunded = formValue.amountToBeRefunded;
      this.refund.refundDate = formValue.refundDate;
      if(!formValue.amountToBeRefunded) {
        this.utilityService.showMessage(
          'warning',
          'Entrer le montant à rembourser',
          '#e62965',
          'white'
        );
      } else if (!formValue.refundDate){
        this.utilityService.showMessage(
          'warning',
          'Entrer la date de remboursement',
          '#e62965',
          'white'
        );
      } else {
        this.mutualInvestmentService.setRefundDatesManually(this.refund, this.idInvestment).subscribe((res)=>{
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
              this.getAllMutualInvestments();
              this.generateForm.reset();
              this.onCloseGenerateModal();
              this.utilityService.showMessage(
                'success',
                'Date(s) generée(s) avec succès',
                '#06d6a0',
                'white'
              );
            }
          } else {
            this.utilityService.showMessage(
              'warning',
              'Une erreur s\'est produite, verifier votre saisis',
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
      
    }
  }

  //////////////////////// Make Distribution
  onMakeDistribution(idInvestment: number) {
    this.openDistributionModal = "is-active";
    this.getMutualInvestmentById(idInvestment);
  }

  closeDistributionModal(){
    this.openDistributionModal = "";
  }

  onSubmitDistribution(idInvestment: number){
    this.mutualInvestmentService.makeDistribution(idInvestment).subscribe((res)=>{
      
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.closeDistributionModal();
          this.getAllMutualInvestments();
          this.utilityService.showMessage(
            'success',
            'La distribution a été effectué avec succès !',
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

  //////////////////////////////// Create Percentages 
  onOpenPercentage(idInvestment: number) {
    this.openPercentageModal = "is-active";
    this.idInvestment = idInvestment;
    this.getMutualInvestmentById(idInvestment);
  }

  onClosePercentage() {
    this.openPercentageModal = "";
  }

  onSubmitPercentages() {
    this.isSaving = true;
    const formValue = this.addPercentageForm.value;
    this.distributionPercentage.percentageMutual = formValue.percentageMutual;
    this.distributionPercentage.percentageOfFunders = formValue.percentageOfFunders;
    this.distributionPercentage.percentageOfGuarantees = formValue.percentageOfGuarantees;
    this.distributionPercentage.percentageOfPassiveIncomeFund = formValue.percentageOfPassiveIncomeFund;
    this.createPercentages(this.distributionPercentage, this.idInvestment)
  }

  createPercentages(distributionPercentage: DistributionPercentage, idMutualInvestment: number){
    this.mutualInvestmentService.getDistributionPercentage(distributionPercentage, idMutualInvestment).subscribe((res)=>{
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
          this.getAllMutualInvestments();
          this.addPercentageForm.reset();
          this.onClosePercentage();
          this.utilityService.showMessage(
            'success',
            'Pourcentages créés avec succès !',
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

  ////////////////////////////////////////Create Closing Date
  onClosingDate(idInvestment: number) {
    this.idInvestment = idInvestment;
    this.openClosingDateModal = "is-active";
  }

  onCloseClosingDate() {
    this.openClosingDateModal = "";
  }

  onSubmitClosingDate(){
    this.isSaving = true;
    const formValue = this.closingDateForm.value;
    this.closingDate.date = formValue.closingDate;
    this.mutualInvestmentService.createAClosingDate(this.idInvestment, this.closingDate).subscribe((res)=>{
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
          this.getAllMutualInvestments();
          this.closingDateForm.reset();
          this.onCloseClosingDate();
          this.utilityService.showMessage(
            'success',
            'Date de fermeture créé avec succès !',
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

  /////////////////////////////////////// Close Mutual Investment
  onCloseInvestment(idInvestment: number){
    this.closeInvestmentMessage(idInvestment);
  }

  closeInvestmentMessage(idInvestment: number) {
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
        confirmButtonText: 'Oui, fermer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mutualInvestmentService.closeMutualInvestment(idInvestment).subscribe(
            (res) => {
              if( res == null ) {
                swalWithBootstrapButtons.fire({
                  title: 'Annulé',
                  text: 'Une erreur s\'est produite, veuillez verifier que le placement est pret pour la fermeture',
                  confirmButtonColor: '#d33',
                });
              } else {
                this.getAllMutualInvestments();
                swalWithBootstrapButtons.fire({
                  title: 'Fermé !',
                  text: 'La fermeture a été effectué avec succès !.',
                  confirmButtonColor: '#198AE3',
                });
              }
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
            text: 'La fermeture a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }
}

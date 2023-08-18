import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Assistance } from 'src/app/core/classes/assistance';
import { AssistanceService } from 'src/app/core/services/assistance/assistance.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Club } from 'src/app/core/classes/club';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { ProfitabilityTypeService } from 'src/app/core/services/mutual-investment/profitability-type/profitability-type.service';
import { ProfitabilityType } from 'src/app/core/classes/profitabilityType';
import { RefundType } from 'src/app/core/classes/refundType';
import { RefundTypeService } from 'src/app/core/services/mutual-investment/refund-type/refund-type.service';
import { Frequency } from 'src/app/core/classes/frequency';
import { FrequencyService } from 'src/app/core/services/frequencies/frequency.service';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import { Tontine } from 'src/app/core/classes/tontine';
import { User } from 'src/app/core/classes/user';
import { DistributionPercentage } from 'src/app/core/classes/distributionPercentage';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { FirstRefundDate } from 'src/app/core/classes/firstRefundDate';
import { Refund } from 'src/app/core/classes/refund';
import { ClosingDate } from 'src/app/core/classes/closingDate';


@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss']
})
export class AssistanceComponent implements OnInit {

  show: boolean = false;
  isSaving: boolean = false;
  ngSelectClub = 0;
  ngSelectApplicant = 0;
  ngSelectProfitability = 0;
  ngSelectRefund = 0;
  ngSelectFrequency = 0;
  createAssistanceForm!: FormGroup;
  updateAssistanceForm!: FormGroup;
  addPercentageForm!: FormGroup;
  addSecurityDepositForm!: FormGroup;
  generateForm!: FormGroup;
  closingDateForm!: FormGroup;
  isCertain: boolean = false;
  isPeriod: boolean = false;
  endDate: any;
  startDate: any;
  minEndDate: any;
  date: any;
  dateNow: any;
  createAssistance: boolean = false;
  showErroMessage: boolean = false;
  assistance: Assistance = new Assistance();
  assistances: Assistance[] = [];
  clubs: Club[] = [];
  profitabilityTypes: ProfitabilityType[] = [];
  refundTypes: RefundType[] = [];
  frequencies: Frequency[] = [];
  tontines: Tontine[] = [];
  clubUsers: User[] = [];
  tontineUsers: User[] = [];
  clubUserOfSelect: any;
  clubUserTontine: any;
  idClub: number = 0;
  idAssistance: number = 0;
  tontineMembers: any;
  isAware: boolean = false;
  isClubSelected: boolean = false;
  isDecisionSelected: boolean = false;
  openPercentageModal: string = "";
  distributionPercentage: DistributionPercentage = new DistributionPercentage();
  percentageMutual: number = 0;
  percentageOfFunders: number = 0;
  percentageOfGuarantees: number = 0;
  percentageOfPassiveIncomeFund: number = 0;
  percentageCompleted: boolean = false;
  profitabilityRate: number = 0;
  openDepositModal: string = "";
  securityDeposit: SecurityDeposit = new SecurityDeposit();
  openGenerateModal: string = "";
  refundType: string = "";
  firstRefundDate: FirstRefundDate = new FirstRefundDate();
  refund: Refund = new Refund();
  amountToBeRefunded: number = 0;
  totalRefunded: number = 0;
  openDistributionModal: string = "";
  closingDate: ClosingDate = new ClosingDate();
  openClosingDateModal: string = "";

  constructor(private assistanceService: AssistanceService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private clubService: ClubService,
    private profitabilityTypeService: ProfitabilityTypeService,
    private refundTypeService: RefundTypeService,
    private frequencyService: FrequencyService,
    private tontineService: TontineService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllAssistances();
    this.getAllClubs();
    this.getAllProfitabilityTypes();
    this.getAllRefundTypes();
    this.getAllFrequencies();
    this.getAllTontines();
    this.initDates();
    this.formInit();
  }

  formInit() {
    this.createAssistanceForm = this.formBuilder.group({
      assistanceAmount: new FormControl(null, Validators.required),
      idClub: new FormControl(null, Validators.required),
      idApplicant: new FormControl(null, Validators.required),
      idFrequency: new FormControl(null),
      idProfitabilityType: new FormControl(null, Validators.required),
      idRefundType: new FormControl(null, Validators.required),
      profitabilityRate: new FormControl(null),
      echeanceDurationInMonths: new FormControl(null),
      isAware: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    })
    
    this.addPercentageForm = this.formBuilder.group({
      percentageMutual: new FormControl(null, Validators.required),
      percentageOfFunders: new FormControl(null, Validators.required),
      percentageOfGuarantees: new FormControl(null, Validators.required),
      percentageOfPassiveIncomeFund: new FormControl(null, Validators.required),
    })
    
    this.addSecurityDepositForm = this.formBuilder.group({
      idUser: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
    
    this.generateForm = this.formBuilder.group({
      firstRefundDate: new FormControl(null),
      amountToBeRefunded: new FormControl(null),
      refundDate: new FormControl(null),
    })

    this.closingDateForm = this.formBuilder.group({
      closingDate: new FormControl(null, Validators.required),
    })
  }

  getAllAssistances(){
    this.assistanceService.findAllAssistances().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.assistances = res.data;
        console.log("Detail Assit:: ", res.data)
        if( this.assistances.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data;
    })
  }

  getAllProfitabilityTypes(){
    this.profitabilityTypeService.findAllProfitabilityTypes().subscribe((res)=>{
      this.profitabilityTypes = res.data;
    })
  }

  getAllRefundTypes(){
    this.refundTypeService.findAllRefundTypes().subscribe((res)=>{
      this.refundTypes = res.data;
    })
  }

  getAllFrequencies(){
    this.frequencyService.findAllFrequencies().subscribe((res)=>{
      this.frequencies = res.data;
    })
  }

  getAllTontines(){
    this.tontineService.findAllTontines().subscribe((res)=>{
      this.tontines = res.data;
      this.tontines.forEach((element) => {
        element.tontineMembers.forEach((member)=> {
          this.tontineUsers.push(member.participant);
        })
        // this.tontineMembers = element.tontineMembers.map((element)=> ({value: element.participant.id, label: element.participant.firstName + " " + element.participant.lastName}))
        // console.log("Usable member list:: ", this.tontineMembers);
        
      })
    })
  }

  onSelectDate(event: any){

  }

  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  findAssistanceById(idAssistance: number) {
    this.assistanceService.findAssistanceById(idAssistance).subscribe((res)=>{
      this.assistance = res.data;
      this.refundType = res.data.refundType.type;
      this.profitabilityRate = res.data.profitabilityRate;
      this.amountToBeRefunded = res.data.amountToBeRefunded;
      res.data.refunds.forEach((element: any) => {
        this.totalRefunded = this.totalRefunded + element.amountToBeRefunded;
      })
      this.getAllUsersByIdClub(res.data.assistanceClub.id);
    })
  }

  //////////////////////////////// Create Assistance
  onOpenCreateAssistance(){
    this.createAssistance = true;
  }

  cancelCreatingAssistance(){
    this.createAssistance = false;
  }

  onClubSelected(val: any) {
    if ( val > 0 ) {
      this.idClub = val;  
      this.isClubSelected = true;  
      this.getAllUsersByIdClub(this.idClub);

    }
  }

  onMutualisteClub() {
    this.isAware = true;
    this.isDecisionSelected = true
  }

  onMutualisteTontine() {
    this.isAware = false;
    this.isDecisionSelected = true
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

  getAllUsersByIdClub(idClub: number){
    let clubUserTontine:User[] = [];
    this.clubService.getclubById(idClub).subscribe((res)=>{
      this.clubUserOfSelect = res.data.users.map((user:any)=>({value: user.id, label: user.firstName + " " + user.lastName}));
      console.log("clubUser:: ", res.data.users);
      console.log("tontineUser:: ", this.tontineUsers);
      res.data.users.forEach((clubUser: User)=>{
        this.tontineUsers.forEach((tontineUser: User)=>{
          if(clubUser.id == tontineUser.id){
            clubUserTontine.push(clubUser);
          }
        })
      })

      this.clubUserTontine = clubUserTontine.map((user:any)=>({value: user.id, label: user.firstName + " " + user.lastName}));
      console.log("clubUserTontine ", this.clubUserTontine);
    })
  }

  onSubmitAssistance(){
    let idFrequency: number = 0;
    this.isSaving = true;
    const formValue = this.createAssistanceForm.value;
    this.assistance.assistanceAmount = formValue.assistanceAmount;
    this.assistance.profitabilityRate = formValue.profitabilityRate;
    this.assistance.echeanceDurationInMonths = formValue.echeanceDurationInMonths;
    this.assistance.endDate = formValue.endDate;
    this.assistance.startDate = formValue.startDate;

    if(formValue.idFrequency != null){
      idFrequency = formValue.idFrequency
   }

    if(formValue.idProfitabilityType == 1 && !formValue.profitabilityRate){
      this.utilityService.showMessage(
        'warning',
        'Veuillez entrer un taux de rentabilité',
        '#e62965',
        'white'
      );
      this.isSaving = false;
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
      this.createAnAssistance(this.assistance, formValue.idApplicant, formValue.idClub, idFrequency, formValue.idProfitabilityType, formValue.idRefundType, this.isAware);
    }
  }

  createAnAssistance(assistance: Assistance, idApplicant: number, idClub: number, idFrequency: number, idProfitabilityType: number, idRefundType: number, isAware: boolean){
    this.assistanceService.createAssistance(assistance, idApplicant, idClub, idFrequency, idProfitabilityType, idRefundType, isAware).subscribe((res)=>{
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
          console.log("respoonse:: ", res);
          
          this.getAllAssistances();
          this.createAssistanceForm.reset();
          this.cancelCreatingAssistance();
          this.utilityService.showMessage(
            'success',
            'Assistance créée avec succès !',
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
    this.onSubmitAssistance();
  }

  ////////////////// Delete Assistance
  onDeleteAssistance(id: number) {
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
          this.assistanceService.deleteAssistance(id).subscribe(
            () => {
              this.getAllAssistances();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'L\'assistance a été supprimé avec succès !',
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
            text: 'La suppression a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  //////////////////////////////// Create Percentages 
  onOpenPercentage(idAssistance: number) {
    this.openPercentageModal = "is-active";
    this.idAssistance = idAssistance;
    this.findAssistanceById(idAssistance);
  }

  onClosePercentage() {
    this.openPercentageModal = "";
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

  onSubmitPercentages() {
    this.isSaving = true;
    const formValue = this.addPercentageForm.value;
    this.distributionPercentage.percentageMutual = formValue.percentageMutual;
    this.distributionPercentage.percentageOfFunders = formValue.percentageOfFunders;
    this.distributionPercentage.percentageOfGuarantees = formValue.percentageOfGuarantees;
    this.distributionPercentage.percentageOfPassiveIncomeFund = formValue.percentageOfPassiveIncomeFund;
    this.createPercentages(this.distributionPercentage, this.idAssistance)
  }

  createPercentages(distributionPercentage: DistributionPercentage, idAssistance: number){
    this.assistanceService.applyDistributionPercentage(distributionPercentage, idAssistance).subscribe((res)=>{
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
          this.getAllAssistances();
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

  //////////////////////// Deblocage Assistance
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
          this.assistanceService.unlockingOperation(id).subscribe(
            (res) => {
              if( res == null ) {
                swalWithBootstrapButtons.fire({
                  title: 'Annulé',
                  text: 'Une erreur s\'est produite. Rassurez-vous que les cautions aient été crées et que la somme des montants des cautions soit équivalent au montant à rembourser pour l\'assistance',
                  confirmButtonColor: '#d33',
                });
              } else {
                this.getAllAssistances();
                swalWithBootstrapButtons.fire({
                  title: 'Débloqué !',
                  text: 'L\'assistance a été débloqué avec succès !',
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
            text: 'Le deblocage a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }


  ///////////////// Add Security Deposit
  onOpenAddSecurityDeposit(idAssistance: number){
    this.openDepositModal = "is-active";
    this.idAssistance = idAssistance;
    this.findAssistanceById(idAssistance);
  }

  closeSecurityDepositModal() {
    this.openDepositModal = "";
  }

  onAddSecurtiyDeposit() {
    const formValue = this.addSecurityDepositForm.value;
    this.securityDeposit.amount = formValue.amount;
    this.addSecurityDeposit(this.idAssistance, formValue.idUser, this.securityDeposit)
  }

  addSecurityDeposit(idAssistance: number, idUser: number, securityDeposit: SecurityDeposit) {
    this.isSaving = true;
    this.assistanceService.addSecurityDeposit(idAssistance, idUser, securityDeposit).subscribe((res) => {
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
          this.getAllAssistances();
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
          'Une erreur s\'est produite, vérifier votre saisie',
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

  //////////////////////////////////////Generate Dates
  onGenerate(idAssistance: number){
    this.openGenerateModal = "is-active";
    this.idAssistance = idAssistance;
    this.findAssistanceById(idAssistance);
  }

  onCloseGenerateModal(){
    this.openGenerateModal = "";
  }

  onSubmitGenerate(){
    this.isSaving = true;
    const formValue = this.generateForm.value;
    // if ( this.refundType == "PÉRIODIQUEMENT" ) {
    //   let firstRefundDate : any = new DatePipe('en-US').transform(new Date(formValue.firstRefundDate),'yyyy-MM-dd');
    //   this.firstRefundDate.date = firstRefundDate
    //   if(!firstRefundDate){
    //     this.utilityService.showMessage(
    //       'warning',
    //       'Entrer la 1ère date de remboursement',
    //       '#e62965',
    //       'white'
    //     );
    //   } else {
    //     this.assistanceService.generateRefundDates(this.idAssistance, this.firstRefundDate).subscribe((res)=>{
    //       this.isSaving = false;
    //       if(res) {
    //         console.log("Res Periodiquement:: ", res);
            
    //         if (res.data == null ) {
    //           this.utilityService.showMessage(
    //             'warning',
    //             res.message,
    //             '#e62965',
    //             'white'
    //           );
    //         } else {
    //           this.getAllAssistances();
    //           this.generateForm.reset();
    //           this.onCloseGenerateModal();
    //           this.utilityService.showMessage(
    //             'success',
    //             'Date(s) generée(s) avec succès',
    //             '#06d6a0',
    //             'white'
    //           );
    //         }
    //       } else {
    //         this.utilityService.showMessage(
    //           'warning',
    //           'Une erreur s\'est produite, vérifier votre saisie',
    //           '#e62965',
    //           'white'
    //         );
    //       }
    //     },()=>{
    //       this.isSaving = false;
    //       this.utilityService.showMessage(
    //         'warning',
    //         'Une erreur s\'est produite',
    //         '#e62965',
    //         'white'
    //       );
    //     })
    //   }
      
    // } else if ( this.refundType == 'A L\'ÉCHÉANCE' ) {
    //   let firstRefundDate : any = new DatePipe('en-US').transform(new Date(formValue.firstRefundDate),'yyyy-MM-dd');
    //   this.firstRefundDate.date = firstRefundDate
    //   this.assistanceService.generateRefundDates(this.idAssistance, this.firstRefundDate).subscribe((res)=>{
    //     this.isSaving = false;
    //     if(res) {
    //       console.log("Res Echeance:: ", res);
          
    //       if (res.data == null ) {
    //         this.utilityService.showMessage(
    //           'warning',
    //           res.message,
    //           '#e62965',
    //           'white'
    //         );
    //       } else {
    //         this.getAllAssistances();
    //         this.generateForm.reset();
    //         this.onCloseGenerateModal();
    //         this.utilityService.showMessage(
    //           'success',
    //           'Date(s) générée(s) avec succès',
    //           '#06d6a0',
    //           'white'
    //         );
    //       }
    //     } else {
    //       this.utilityService.showMessage(
    //         'warning',
    //         'Une erreur s\'est produite, vérifier votre saisie',
    //         '#e62965',
    //         'white'
    //       );
    //     }
    //   })
    // } else if ( this.refundType == 'AVEC DIFFÉRÉ' ) {
    if ( this.refundType == 'AVEC DIFFÉRÉ' ) {
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
        this.assistanceService.setRefundDatesManually(this.refund, this.idAssistance).subscribe((res)=>{
          this.isSaving = false;
          if(res) {
            console.log("Res differe:: ", res);
            
            if (res.data == null ) {
              this.utilityService.showMessage(
                'warning',
                res.message,
                '#e62965',
                'white'
              );
            } else {
              this.getAllAssistances();
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
              'Une erreur s\'est produite, vérifier votre saisie',
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
  onMakeDistribution(idAssistance: number) {
    this.openDistributionModal = "is-active";
    this.findAssistanceById(idAssistance);
  }

  closeDistributionModal(){
    this.openDistributionModal = "";
  }

  onSubmitDistribution(idAssistance: number){
    this.assistanceService.makeDistribution(idAssistance).subscribe((res)=>{
      if(res) {
        console.log("Result Distribution:: ", res);
        
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.closeDistributionModal();
          this.getAllAssistances();
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

  ////////////////////////////////////////Create Closing Date
  onClosingDate(idAssistance: number) {
    this.idAssistance = idAssistance;
    this.openClosingDateModal = "is-active";
  }

  onCloseClosingDate() {
    this.openClosingDateModal = "";
  }

  onSubmitClosingDate(){
    this.isSaving = true;
    const formValue = this.closingDateForm.value;
    this.closingDate.date = formValue.closingDate;
    this.assistanceService.createAClosingDate(this.idAssistance, this.closingDate).subscribe((res)=>{
      this.isSaving = false;
      console.log("Res Fermeture:: ", res);
      
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllAssistances();
          this.closingDateForm.reset();
          this.onCloseClosingDate();
          this.utilityService.showMessage(
            'success',
            'Date de fermeture créée avec succès !',
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

  /////////////////////////////////////// Close Assistance
  onCloseAssistance(idAssistance: number){
    this.closeAssistanceMessage(idAssistance);
  }

  closeAssistanceMessage(idAssistance: number) {
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
          this.assistanceService.closeAssistance(idAssistance).subscribe(
            (res) => {
              if( res == null ) {
                swalWithBootstrapButtons.fire({
                  title: 'Annulé',
                  text: 'Une erreur s\'est produite, veuillez vérifier que l\'assistance est prête pour la fermeture',
                  confirmButtonColor: '#d33',
                });
              } else {
                this.getAllAssistances();
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

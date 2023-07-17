import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethod } from 'src/app/core/classes/paymentMethod';
import { Penality } from 'src/app/core/classes/penality';
import { Session } from 'src/app/core/classes/session';
import { User } from 'src/app/core/classes/user';
import { PaymentMethodService } from 'src/app/core/services/payment-method/payment-method.service';
import { PenaltyService } from 'src/app/core/services/penalty/penalty.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from 'src/app/core/classes/picture';

@Component({
  selector: 'app-all-penality-of-session',
  templateUrl: './all-penality-of-session.component.html',
  styleUrls: ['./all-penality-of-session.component.scss']
})
export class AllPenalityOfSessionComponent implements OnInit {
  show: boolean = false;
  ngSelectPaymentMethod = 0;
  paymentForm!: FormGroup;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  openPaymntModal: string = "";
  isPenality: boolean = true;
  isMember: boolean = false;
  penalities: Penality[] = [];
  penality: Penality = new Penality();
  members: User[] = [];
  session: Session = new Session();
  idPenality: number = 0;
  idUser: number = 0;
  isSaving: boolean = false;
  geUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/money_f3bgzk.png";
  paymentMethods: PaymentMethod[] = [];
  date: any;
  idPenalityType: number = 0;
  picture = new Picture();

  constructor(private sessionService: SessionService,
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private paymentMethodService: PaymentMethodService,
    private paymentService: PaymentService,
    private penalityService: PenaltyService,
    private utilityService: UtilityService,
    private location: Location,
    private loaderService: LoaderService,
    private sanitizer: DomSanitizer,
    private penalityTypeService: PenaltyTypeService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllPanalities();
    this.getSession();
    this.formInit();
    this.getPaymentMethod();
  }

  formInit() {
    this.paymentForm = this.formBuilder.group({
      // amount: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      proof: new FormControl(null, Validators.required),
      idPaymentMethod: new FormControl(null, Validators.required),
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

  onShowAllPenality(){
    this.isMember = false;
    this.isPenality = true;
  }


  onShowAllUsers(){
    this.isPenality = false;
    this.isMember = true;
  }

  getAllPanalities(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionService.findPenaltiesOfASession(params['id']).subscribe((res)=>{
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.penalities = res.data;
          if( this.penalities.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = false;
            this.loaderService.hideLoader();
          }
        }
      })
    })
  }

  getSession(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.sessionService.findSessionById(params['id']).subscribe((res)=>{
        this.session = res.data
      })
    })
  }

  onOpenPaymentModal(idPenality: number, idUser: number, idPenalityType: number){
     this.idPenalityType = idPenalityType;
      this.idPenality = idPenality;
      this.idUser = idUser;
      this.openPaymntModal = "is-active";
  }

  closePaymentModal(){
    this.openPaymntModal = "";
  }

  onSelectDate(event: any){

  }

  getPaymentMethod(){
    this.paymentMethodService.findAllPaymentMethods().subscribe((res)=>{
      this.paymentMethods = res.data
    })
  }

  onSubmitPayment(){
    const formValue = this.paymentForm.value;
    this.penalityTypeService.findPenaltyTypeById(this.idPenalityType).subscribe((res)=>{
      this.penality.paid = res.data.amount;
      this.penality.date = formValue.date;
      this.penality.proof = formValue.proof;
      this.makePayment(this.idPenality, this.idUser, formValue.idPaymentMethod, this.penality)
    })
  }

  makePayment(idPenality: number, idUser: number, idPaymentMethod: number, penality: Penality){
    this.isSaving = true;
    this.penalityService.payPenalty(idPenality, idUser, idPaymentMethod, penality).subscribe((res)=>{
      this.paymentForm.reset();
      this.isSaving = false;
      this.getAllPanalities();
      this.closePaymentModal();
      this.utilityService.showMessage(
        'success',
        'le paiement de la pénalité a été effectué avec succès !',
        '#06d6a0',
        'white'
      );
      this.onSavePicture(res.data.id)
    },()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

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

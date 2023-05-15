import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { User } from 'src/app/core/classes/user';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-view-more-security-deposit',
  templateUrl: './view-more-security-deposit.component.html',
  styleUrls: ['./view-more-security-deposit.component.scss']
})
export class ViewMoreSecurityDepositComponent implements OnInit {

  show: boolean = false;
  ngSelect1 = 0;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  securityDeposits: SecurityDeposit[] = [];
  idInvestment: number = 0;
  openDepositModal: string = "";
  users: User[] =[];
  addSecurityDepositForm!: FormGroup;
  isSaving: boolean = false;
  securityDeposit: SecurityDeposit = new SecurityDeposit();

  constructor( private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private centerService: CenterService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private location: Location,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getMutualSecurityDeposit();
    this.formInit();
  }

  formInit() {
    this.addSecurityDepositForm = this.formBuilder.group({
      idUser: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  backBack(){this.location.back()}

  getMutualSecurityDeposit(){
  this.activatedRoute.queryParams.subscribe((params) => {
    this.mutualInvestmentService.findMutualInvestmentById(params['id']).subscribe((res)=>{
      this.idInvestment = params['id'];
      this.securityDeposits = res.data.securityDeposits;
      if ( this.securityDeposits.length <= 0 ) {
        this.show = true;
      }
      this.loaderService.hideLoader();
    });
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

  onDeleteSecurityDeposit(id: number){
    this.deleteMessage(id);
  }

  deleteMessage(idDeposit: number) {
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
        title: 'Etes vous sure? ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, retirer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mutualInvestmentService.deleteSecurityDeposit(this.idInvestment, idDeposit).subscribe(
            () => {
              this.getMutualSecurityDeposit();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Caution a été retiré.',
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

  ///////////////// Add Security Deposit
  onOpenAddSecurityDeposit(){
    this.openDepositModal = "is-active";
    this.getMutualInvestmentById(this.idInvestment);
  }

  getMutualInvestmentById(idInvestment: number){
    this.mutualInvestmentService.findMutualInvestmentById(idInvestment).subscribe((res)=>{
      this.getAllUsersByIdCenter(res.data.mutualCenter.id);
    });
  }

  getAllUsersByIdCenter(idMutualCenter: number){
    this.centerService.findUsersByIdCenter(idMutualCenter).subscribe((res)=>{
      this.users = res.data;
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
      this.getMutualSecurityDeposit();
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

}

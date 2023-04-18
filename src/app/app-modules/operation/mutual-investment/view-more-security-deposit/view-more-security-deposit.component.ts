import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";
import { MutualInvestmentService } from 'src/app/core/services/mutual-investment/mutual-investment/mutual-investment.service';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';

@Component({
  selector: 'app-view-more-security-deposit',
  templateUrl: './view-more-security-deposit.component.html',
  styleUrls: ['./view-more-security-deposit.component.scss']
})
export class ViewMoreSecurityDepositComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  securityDeposits: SecurityDeposit[] = [];
  idInvestment: number = 0;

  constructor( private activatedRoute: ActivatedRoute, 
    private mutualInvestmentService: MutualInvestmentService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMutualSecurityDeposit();
  }

  backBack(){this.location.back()}

  getMutualSecurityDeposit(){
  this.activatedRoute.queryParams.subscribe((params) => {
    this.mutualInvestmentService.findMutualInvestmentById(params['id']).subscribe((res)=>{
      this.idInvestment = params['id'];
      this.securityDeposits = res.data.securityDeposits;
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

}

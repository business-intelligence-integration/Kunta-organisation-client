import { Component, OnInit } from '@angular/core';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { SecurityDepositService } from 'src/app/core/services/security-deposit/security-deposit.service';

@Component({
  selector: 'app-security-deposit',
  templateUrl: './security-deposit.component.html',
  styleUrls: ['./security-deposit.component.scss']
})
export class SecurityDepositComponent implements OnInit {

  show: boolean = false;
  securityDeposits: SecurityDeposit[] = [];

  constructor(private securityDepositService: SecurityDepositService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllSecurityDeposits();
  }

  getAllSecurityDeposits() {
    this.securityDepositService.findAll().subscribe((res) => {
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.securityDeposits = res.data;
        if( this.securityDeposits.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  // onDelete(id: number){
  // }

}

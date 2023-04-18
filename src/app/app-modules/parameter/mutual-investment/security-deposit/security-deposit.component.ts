import { Component, OnInit } from '@angular/core';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { SecurityDepositService } from 'src/app/core/services/security-deposit/security-deposit.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-security-deposit',
  templateUrl: './security-deposit.component.html',
  styleUrls: ['./security-deposit.component.scss']
})
export class SecurityDepositComponent implements OnInit {

  securityDeposits: SecurityDeposit[] = [];

  constructor(private securityDepositService: SecurityDepositService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllSecurityDeposits();
  }

  getAllSecurityDeposits() {
    this.securityDepositService.findAll().subscribe((res) => {
      console.log("res.. ", res);
      this.securityDeposits = res.data;
    })
  }

  // onDelete(id: number){
  // }

}

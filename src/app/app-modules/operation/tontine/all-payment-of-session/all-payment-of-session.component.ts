import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/core/classes/payment';
import { PenalityType } from 'src/app/core/classes/penalityType';
import { Session } from 'src/app/core/classes/session';
import { SessionOfPayment } from 'src/app/core/classes/sessionOfPayment';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-all-payment-of-session',
  templateUrl: './all-payment-of-session.component.html',
  styleUrls: ['./all-payment-of-session.component.scss']
})
export class AllPaymentOfSessionComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  payments: Payment[] = [];
  payment: Payment = new Payment();
  session: Session = new Session();
  sessionOfPayments: SessionOfPayment[] = [];

  constructor(private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private penalityTypeService: PenaltyTypeService) { }

  ngOnInit(): void {
    this.findAllPaymentsOfASession();
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

  findAllPaymentsOfASession(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionService.findAllPaymentsOfASession(params['id']).subscribe((res)=>{
      this.sessionOfPayments = res.data;
      })

      this.sessionService.findSessionById(params['id']).subscribe((res)=>{
        this.session = res.data;
      })
    })
  }




}

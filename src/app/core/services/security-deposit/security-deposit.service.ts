import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../utility/utility.service';
import { Payment } from '../../classes/payment';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SecurityDepositService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAll():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'security-deposits', httpOptions);
  }

  findSecurityDepositById(idDeposit: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'security-deposits/' + idDeposit, httpOptions);
  }

  refundAmountSecutityDeposit(idDeposit: number, idPaymentMethod: number, payment: Payment):Observable<any>{
    console.log("idDeposit: ", idDeposit, "idPaymentMethod: ", idPaymentMethod, "payment:: ", payment);
    
    return this.httpClient.patch<any>(this.baseUrl + 'security-deposits/refund-amount/' + idDeposit + '/idPaymentMethod/' + idPaymentMethod + '?token=' + this.utilityService.loadToken(), payment);
  }

}
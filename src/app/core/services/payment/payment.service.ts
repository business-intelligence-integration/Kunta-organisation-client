import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../../classes/payment';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllPayments():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'payments?token=' + this.utilityService.loadToken());
  }

  findPaymentById(idPayment: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'payments/' + idPayment + '?token=' + this.utilityService.loadToken());
  }

  updatePayment(payment: Payment, idPayment: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'payments/'+ idPayment + '?token=' + this.utilityService.loadToken(), payment);
  }

  deletePayment(idPayment: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'payments/'+ idPayment +'?token=' + this.utilityService.loadToken());
  }
  
  checkPayment(idPayment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `payments/${idPayment}check-payment` + "?token=" +this.utilityService.loadToken(), {});
  }

  validatePayment(idPayment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `payments/${idPayment}validate-payment` + "?token=" +this.utilityService.loadToken(), {});
  }
}

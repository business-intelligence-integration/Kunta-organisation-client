import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../../classes/paymentMethod';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllPaymentMethods():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'payment-methods', httpOptions);
  }

  createPaymentMethod(paymentMethod: PaymentMethod):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'payment-methods', paymentMethod, httpOptions);
  } 

  findPaymentMethodById(idPaymentMethod: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'payment-methods/' + idPaymentMethod, httpOptions);
  }

  updatePaymentMethod(paymentMethod: PaymentMethod, idPaymentMethod: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'payment-methods/'+ idPaymentMethod, paymentMethod, httpOptions);
  }

  deletePaymentMethod(idPaymentMethod: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'payment-methods/'+ idPaymentMethod, httpOptions);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentStatus } from '../../classes/PaymentStatus';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllPaymentStatus():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'payment-status', httpOptions);
  }

  createPaymentStatus(paymentStatus: PaymentStatus):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'payment-status', paymentStatus, httpOptions);
  } 

  findPaymentStatusById(idPaymentStatus: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'payment-status/' + idPaymentStatus, httpOptions);
  }

  updatePaymentStatus(paymentStatus: PaymentStatus, idPaymentStatus: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'payment-status/'+ idPaymentStatus, paymentStatus, httpOptions);
  }

  deletePaymentStatus(idPaymentStatus: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'payment-status/'+ idPaymentStatus, httpOptions);
  }
  
}

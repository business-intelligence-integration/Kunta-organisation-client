import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
import { Payment } from 'src/app/core/classes/payment';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class SubscriptionPaymentService {

  public baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllSubscriptionsPayments():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'subscription-payments', httpOptions);
  }

  findPaymentSubscriptionPaymentById(idPayment: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'subscription-payments/' + idPayment, httpOptions);
  }

  deletePaymentSubscriptionPayment(idPayment: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'subscription-payments/' + idPayment, httpOptions);
  }

  updateSubscriptionPayment(idSubscriptionPayment: number, payment: Payment):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'subscription-payments/' + idSubscriptionPayment, payment);
  }

  findPictureByIdSubscriptionPayment(idSubscriptionPayment: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'subscription-payments/find-subscription-payment-picture?idSubscriptionPayment=' + idSubscriptionPayment);
  }

  uploadSubscriptionPaymentPicture(picture: FormData, idSubscriptionPayment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'subscription-payments/upload-picture?idSubscriptionPayment=' + idSubscriptionPayment, picture);
  }
}

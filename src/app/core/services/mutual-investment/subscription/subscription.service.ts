import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
import { Subscription } from 'src/app/core/classes/subscription';
import { Payment } from 'src/app/core/classes/payment';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {
  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  createSubscription( subscription: Subscription, idSubscriptionOffer: number, idSubscriber: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'subscriptions/subscription-offer/' + idSubscriptionOffer + "/subscriber/" + idSubscriber + '?token=' + this.utilityService.loadToken(), subscription);
  }

  createPaymentForSubscription( idSubscription: number, idPaymentMethod: number, payment: Payment):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'subscriptions/subscription-payment/' + idSubscription + "/payment-method/" + idPaymentMethod + '?token=' + this.utilityService.loadToken(), payment);
  }

  findPaymentSubscriptionPaymentById(idSubscription: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + `subscriptions/${idSubscription}`, httpOptions);
  }

  releaseSubscription(idSubscription: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'subscriptions/release/' + idSubscription + '?token=' + this.utilityService.loadToken(), httpOptions);
  }

  findAllSubscriptionsPayments():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'subscriptions', httpOptions);
  }

  updateSubscriptionPayment(idSubscription: number, subscription: Subscription):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'subscriptions/' + idSubscription, subscription, httpOptions);
  }

  deletePaymentSubscriptionPayment(idSubscription: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'subscriptions/' + idSubscription, httpOptions);
  }

}
